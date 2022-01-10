/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Page"
], function (Control, Page) {
	"use strict";

	/**
	 * Constructor for a new <code>AbstractContainer</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * The <code>AbstractContainer</code> control can be used to define a fixed header/footer area while offering the possibility
	 * to define different controls as content, which can be dynamically added/removed and switched.
	 *
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version 1.96.2
	 *
	 * @constructor
	 * @alias sap.m.p13n.AbstractContainer
	 * @author SAP SE
	 * @version 1.96.2
	 * @since 1.96.0
	 *
	 * @private
	 * @ui5-retricted
	 * @experimental
	 */
	var AbstractContainer = Control.extend("sap.m.p13n.AbstractContainer", {
		metadata: {
			library: "sap.m",
			defaultAggregation: "views",
			properties: {
				/**
				 * Defines the default view for the <code>AbstractContainer</code> content area.
				 */
				defaultView: {
					type: "string"
				}
			},
			aggregations: {
				/**
				 * Defines the content for the <code>AbstractContainer</code> header area.
				 */
				header: {
					type: "sap.m.IBar",
					multiple: false,
					forwarding: {
						idSuffix: "-AbstractContainer",
						aggregation: "customHeader",
						forwardBinding: true
					}
				},
				/**
				 * Defines the content for the <code>AbstractContainer</code> subHeader area.
				 */
				subHeader: {
					type: "sap.m.IBar",
					multiple: false,
					forwarding: {
						idSuffix: "-AbstractContainer",
						aggregation: "subHeader",
						forwardBinding: true
					}
				},
				/**
				 * Defines the content for the <code>AbstractContainer</code> footer area.
				 */
				footer: {
					type: "sap.m.IBar",
					multiple: false,
					forwarding: {
						idSuffix: "-AbstractContainer",
						aggregation: "footer",
						forwardBinding: true
					}
				},
				/**
				 * Defines the different content views for the <code>AbstractContainer</code> content area.
				 */
				views: {
					type: "sap.m.p13n.AbstractContainerItem",
					multiple: true
				},
				/**
				 * Inner <code>sap.m.Page</code> as basic layout control.
				 */
				_content: {
					type: "sap.ui.core.Control",
					multiple: false,
					hidden: true
				}
			}
		},
		renderer: {
			apiVersion: 2,
			render: function(oRm, oControl) {
				oRm.openStart("div", oControl);
				oRm.style("height", "100%");
				oRm.openEnd();
				oRm.renderControl(oControl.getAggregation("_content"));
				oRm.close("div");
			}
		}
	});

	AbstractContainer.prototype.init = function() {
		Control.prototype.init.apply(this, arguments);
		this._initializeContent();
	};

	AbstractContainer.prototype.applySettings = function() {
		Control.prototype.applySettings.apply(this, arguments);
		this.switchView(this.getDefaultView());
		return this;
	};

	AbstractContainer.prototype._initializeContent = function() {
		this.oLayout = new Page(this.getId() + "-AbstractContainer");
		this.setAggregation("_content", this.oLayout);
	};

	/**
	 * This method can be used to remove a view from the <code>AbstractContainer</code> instance.
	 *
	 * @param {string|sap.m.p13n.AbstractContainerItem} vContainerItem View that should be removed
	 * @param {boolean} bSuppress Supress invalidate
	 *
	 * @returns {sap.m.p13n.AbstractContainer} The <code>AbstractContainer<code> instance
	 */
	AbstractContainer.prototype.removeView = function(vContainerItem, bSuppress){
		var oContainerItem = typeof vContainerItem == "string" ? this.getView(vContainerItem) : vContainerItem;
		oContainerItem = this.removeAggregation("views", oContainerItem , bSuppress);
		//In case the currently selected view has been removed, switch the view
		if (oContainerItem && oContainerItem.getKey() === this.getCurrentViewKey()){
			this.switchView();
		}
		return this;
	};

	/**
	 * This method can be used to add a view to the <code>AbstractContainer</code> instance.
	 *
	 * @param {sap.m.p13n.AbstractContainerItem} vContainerItem <code>AbstractContainerItem</code> that should be added
	 * @param {boolean} bSuppress Supress invalidate
	 *
	 * @returns {sap.m.p13n.AbstractContainer} The <code>AbstractContainer<code> instance
	 */
	AbstractContainer.prototype.addView = function(vContainerItem) {
		if (vContainerItem && vContainerItem.getContent() && !vContainerItem.getContent().hasStyleClass("sapUiMAbstractContainerContent")){
			vContainerItem.getContent().addStyleClass("sapUiMAbstractContainerContent");
		}
		this.addAggregation("views", vContainerItem);

		return this;
	};

	/**
	 * This method can be used to retrieve the key of the current view.
	 *
	 * @returns {string} The key of the currently visible view in the content area
	 */
	AbstractContainer.prototype.getCurrentViewKey = function() {
		return this._sCurrentView ? this._sCurrentView : this.getDefaultView();
	};

	/**
	 * This method can be used to retrieve the content of the current view.
	 *
	 * @returns {sap.ui.core.Control} The content of the currently visible view in the content area
	 */
	AbstractContainer.prototype.getCurrentViewContent = function() {
		return this.getView(this.getCurrentViewKey()).getContent();
	};

	/**
	 * This method can be used to switch to an existing view using the according <code>ContainerItem</code> key.
	 *
	 * @param {string} sKey The key of the ContainerItem whose content should be visible up next
	 */
	AbstractContainer.prototype.switchView = function(sKey) {

		var oNewView = this.getView(sKey);

		if (!oNewView) {
			oNewView = this.getViews()[0];
			if (!oNewView) {
				return;
			}
		}

		this._sCurrentView = oNewView.getKey();

		this.oLayout.removeAllContent();
		this.oLayout.addContent(oNewView.getContent());
	};

	/**
	 * This method can be used to retrieve the current present view by using the according <code>ContainerItem</code> key.
	 *
  	 * @param {string} sKey The key of the ContainerItem which should be retrieved
	 *
	 * @returns {sap.m.p13n.AbstractContainerItem} The matching ContainerItem
	 */
	AbstractContainer.prototype.getView = function(sKey) {
		return this.getViews().find(function(oView){
			if (oView.getKey() === sKey) {
				return oView;
			}
		});
	};

	/**
	 * Get a plain representation of the current views.
	 *
	 * @returns {object} The current view aggeregation as map
	 */
	AbstractContainer.prototype.getViewMap = function() {
		return this.getViews().map(function(o){
			return {
				key: o.getKey(),
				content: o.getContent()
			};
		});
	};

	AbstractContainer.prototype.exit = function() {
		Control.prototype.exit.apply(this, arguments);
		this._sCurrentView = null;
		this.oResourceBundle = null;
	};

	return AbstractContainer;

});