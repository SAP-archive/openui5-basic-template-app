/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/m/p13n/AbstractContainer",
	"sap/m/Bar",
	"sap/m/Button",
	"sap/m/List",
	"sap/m/IconTabBar",
	"sap/m/IconTabFilter",
	"sap/m/p13n/AbstractContainerItem",
	"sap/ui/Device",
	"sap/m/library",
	"sap/m/StandardListItem"
], function (AbstractContainer, Bar, Button, List, IconTabBar, IconTabFilter, ContainerItem, Device, mLibrary, StandardListItem) {
	"use strict";

	// shortcut for sap.m.ButtonType
	var ButtonType = mLibrary.ButtonType;

	// shortcut for sap.m.ListType
	var ListItemType = mLibrary.ListType;

	/**
	 * Constructor for a new <code>Container</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * This control serves as base class for personalization implementations.
	 * This base class is faceless and should be inherited to implement control specific personalization panels.
	 * Constructor for a new Container. The Container can be used
	 * to dynamically add personalization content to a switchable
	 * layout container, by allowing to switch the content using
	 * an <code>IconTabBar</code> or a <code>List</code> control,
	 * depending on the desired layout mode.
	 *
	 * @extends sap.m.p13n.AbstractContainer
	 *
	 * @author SAP SE
	 * @version 1.96.2
	 *
	 * @private
	 * @ui5-restricted
	 * @experimental
	 *
	 * @since 1.96
	 * @alias sap.m.p13n.Container
	 */
	var Container = AbstractContainer.extend("sap.m.p13n.Container", {
		metadata: {
			library: "sap.m",
			properties: {
				listLayout: {
					type: "Boolean",
					defaultValue: false
				}
			}
		},
		renderer: {
		  apiVersion: 2
		}
	});

	Container.prototype.DEFAULT_KEY = "$default";

	Container.prototype.init = function () {
		AbstractContainer.prototype.init.apply(this, arguments);
		this.addStyleClass("sapMP13nContainer");
		this.setListLayout(Device.system.phone);
	};

	/**
	 * Determines whether a <code>List</code> control should be used
	 * as inner layout or a <code>IconTabBar</code> to display the different views.
	 *
	 * @param {boolean} bListLayout Defines which layout mode should be used.
	 * @returns {sap.ui.core.Control} The <code>Container</code> instance.
	 */
	Container.prototype.setListLayout = function (bListLayout) {
		this.setProperty("listLayout", bListLayout);

		//clear existing navigation items
		this._getTabBar().removeAllItems();
		this._getNavigationList().removeAllItems();
		var oHeaderContent;

		//update navigator control
		if (bListLayout) {
			this._getTabBar().setVisible(false);
			this._getNavigationList();
			this.switchView(this.DEFAULT_KEY);
			oHeaderContent = this._getNavBackBtn();
		} else {
			this._getTabBar().setVisible(true);
			var aViews = this.getViews();
			if (aViews.length > 1) {
				//0 is $default, use index 1 as the first "custom" added view
				this.switchView(aViews[1].getKey());
			}
			oHeaderContent = this._getTabBar();
		}

		var oHeader = this.getHeader();
		if (!oHeader) {
			var oBar = new Bar({
				contentLeft: [oHeaderContent]
			});
			this.setHeader(oBar);
		} else {
			oHeader.removeAllContentLeft();
			oHeader.addContentLeft(oHeaderContent);
		}

		//recreate the navigation items
		this.getViews().forEach(function (oView) {
			this._addToNavigator(oView);
		}.bind(this));

		return this;
	};

	/**
	 * @override
	 */
	Container.prototype.switchView = function (sKey) {
		AbstractContainer.prototype.switchView.apply(this, arguments);
		var oParent = this.getParent();
		if (oParent && oParent.isA("sap.ui.core.Control")){
			oParent.focus();
			oParent.invalidate();
		}
		this.oLayout.setShowHeader(sKey !== this.DEFAULT_KEY); //Don't show header in default view (avoid empty space),
		this._getTabBar().setSelectedKey(sKey);
		this._getNavBackBtn().setVisible(sKey !== this.DEFAULT_KEY);
		this._getNavBackBtn().setText(sKey);
	};

	/**
	 * @override
	 */
	Container.prototype.addView = function (oContainerItem) {
		AbstractContainer.prototype.addView.apply(this, arguments);
		this._addToNavigator(oContainerItem);
		return this;
	};

	Container.prototype._getTabBar = function () {
		if (!this._oTabBar) {
			this._oTabBar = new IconTabBar({
				expandable: false,
				expanded: true,
				select: function (oEvt) {
					this.switchView(oEvt.getParameter("key"));
				}.bind(this)
			});
			this.addDependent(this._oTabBar);
		}
		return this._oTabBar;
	};

	Container.prototype._getNavigationList = function () {
		if (!this._oNavigationList) {
			this._oNavigationList = new List({
				itemPress: function (oEvt) {
					var oItem = oEvt.getParameter("listItem");
					this.switchView(oItem._key);
				}.bind(this)
			}).addStyleClass("p13nContainerDefaultList");
			this.addDependent(this._oNavigationList);
		}
		if (!this.getView(this.DEFAULT_KEY)) {
			var oListContainer = new ContainerItem({
				key: this.DEFAULT_KEY,
				content: this._oNavigationList
			});
			this.addView(oListContainer);
		}

		return this._oNavigationList;
	};

	Container.prototype._getNavBackBtn = function () {
		if (!this._oNavBackBtn) {
			this._oNavBackBtn = new Button({
				type: ButtonType.Back,
				press: function (oEvt) {
					this.switchView(this.DEFAULT_KEY);
				}.bind(this)
			});
			this.addDependent(this._oNavBackBtn);
		}
		return this._oNavBackBtn;
	};

	Container.prototype._addToNavigator = function (oContainerItem) {

		var sKey = oContainerItem.getKey(), sText = oContainerItem.getText(), sIcon = oContainerItem.getIcon();

		if (sKey == this.DEFAULT_KEY) {
			return;
		}

		if (this.getListLayout()) {
			this.getView(this.DEFAULT_KEY);
			var oItem =  new StandardListItem({
				type: ListItemType.Navigation,
				icon: sIcon,
				title: sText
			});
			oItem._key = sKey;
			this._getNavigationList().addItem(oItem);
		} else {
			this._getTabBar().addItem(new IconTabFilter({
				key: sKey,
				text: sText || sKey
			}));
		}
	};

	Container.prototype.exit = function () {
		AbstractContainer.prototype.exit.apply(this, arguments);
		if (this._oTabBar) {
			this._oTabBar.destroy();
			this._oTabBar = null;
		}
		if (this._oNavigationList) {
			this._oNavigationList.destroy();
			this._oNavigationList = null;
		}
		this._oNavBackBtn = null;
	};

	return Container;

});