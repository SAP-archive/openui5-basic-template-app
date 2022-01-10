/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'sap/ui/model/json/JSONModel', 'sap/m/VBox', 'sap/ui/core/Control', 'sap/m/Column', 'sap/m/Text', 'sap/ui/model/Filter', "sap/m/Table", "sap/m/OverflowToolbar", "sap/m/SearchField", "sap/m/ToolbarSpacer", "sap/m/OverflowToolbarButton", "sap/m/OverflowToolbarLayoutData", "sap/base/util/merge", "sap/ui/core/dnd/DragDropInfo"
], function(JSONModel, VBox, Control, Column, Text, Filter, Table, OverflowToolbar, SearchField, ToolbarSpacer, OverflowToolbarButton, OverflowToolbarLayoutData, merge, DragDropInfo) {
	"use strict";

	/**
	 * Constructor for a new <code>BasePanel</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * This control serves as base class for personalization implementations.
	 * This base class is faceless and should be inherited to implement control specific personalization panels.
	 *
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version 1.96.2
	 *
	 * @private
	 * @ui5-restricted
	 * @experimental
	 *
	 * @since 1.96
	 * @alias sap.m.p13n.BasePanel
	 */
	var BasePanel = Control.extend("sap.m.p13n.BasePanel", {
		metadata: {
			library: "sap.m",
			associations: {},
			properties: {
				/**
				 * Determines whether the reordering of personalization items should be enabled.
				 */
				enableReorder: {
					type: "boolean",
					defaultValue: true
				}
			},
			aggregations: {
				/**
				 * Defines an optional message strip to be displayed in the content area
				 */
				 messageStrip: {
					type: "sap.m.MessageStrip",
					multiple: false
				},
				/**
				 * Content to be set for the <code>BasePanel</code>.
				 */
				_content: {
					type: "sap.ui.core.Control",
					multiple: false,
					visibility: "hidden"
				},
				/**
				 * This template is going to be set from the implementing panel using the <code>BasePanel</code> control, by setting the template
				 * for the columns of the inner <code>sap.m.Table</code>.
				 */
				_template: {
					type: "sap.ui.core.Control",
					multiple: false,
					visibility: "hidden"
				}
			},
			events: {
				/**
				 * This event is fired if there has been made any change within the <code>BasePanel</code> control.
				 */
				change: {
					/**
					 * The reason why the panel state has changed, e.g. "Add", "Remove" or "Move".
					 */
					reason: {
						type: "string"
					},
					/**
					 * An object containing information about the specific item that has been changed.
					 */
					item: {
						type: "object"
					}
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

	//inner model name
	BasePanel.prototype.P13N_MODEL = "$p13n";

	//constants for change event reasoning
	BasePanel.prototype.CHANGE_REASON_ADD = "Add";
	BasePanel.prototype.CHANGE_REASON_REMOVE = "Remove";
	BasePanel.prototype.CHANGE_REASON_MOVE = "Move";

	//defines the name of the attribute describing the presence/active state
	BasePanel.prototype.PRESENCE_ATTRIBUTE = "visible";

	BasePanel.prototype.init = function() {
		Control.prototype.init.apply(this, arguments);

		this._oP13nModel = new JSONModel({});
		this._oP13nModel.setSizeLimit(10000);
		this.setModel(this._oP13nModel, this.P13N_MODEL);

	   // list is necessary to set the template + model on
		this._oListControl = this._createInnerListControl();

		this._setInnerLayout();

		// disable 'select all'
		this._oListControl.setMultiSelectMode("ClearAll");
	};

	/**
	 * Can be overwritten in case a different wrapping Control is required for the inner content
	 */
	BasePanel.prototype._setInnerLayout = function() {
		this.setAggregation("_content", new VBox({
			items: [
				this._oListControl
			]
		}));
	};

	/**
	 * @param {Array} aP13nData An array containing the personalization state that should be represented by the <code>BasePanel</code>.
	 *
	 * @returns {sap.m.p13n.BasePanel} The BasePanel instance
	 */
	BasePanel.prototype.setP13nData = function(aP13nData) {
		this._getP13nModel().setProperty("/items", merge([], aP13nData));
		return this;
	};

	/**
	 * @returns {Array} An array containing the personalization state that is currently displayed by the <code>BasePanel</code>.
	 */
	BasePanel.prototype.getP13nData = function (bOnlyActive) {
		var aItems = merge([], this._getP13nModel().getProperty("/items"));
		if (bOnlyActive) {
			aItems = aItems.filter(function(oItem){
				return oItem[this.PRESENCE_ATTRIBUTE];
			}.bind(this));
		}
		return aItems;
	};

	/**
	 * Displays a <code>sap.m.MessageStrip</code> instance in the content area of the <code>BasePanel</code>.
	 *
	 * @param {sap.m.MessageStrip} oStrip Instance of a sap.m.MessageStrip
	 *
	 * @returns {sap.m.p13n.BasePanel} The BasePanel instance
	 */
	BasePanel.prototype.setMessageStrip = function(oStrip){
		if (!oStrip) {
			this.getAggregation("_content").removeItem(this._oMessageStrip);
			this._oMessageStrip = null;
		} else {
			oStrip.addStyleClass("sapUiSmallMargin");
			if (this._oMessageStrip) {
				this._oMessageStrip.destroy();
			}
			this._oMessageStrip = oStrip;
			this.getAggregation("_content").insertItem(oStrip, 0);
		}

		return this;
	};

	/**
	 * Getter for the <code>messageStrip</code> aggregation.
	 *
	 * @returns {sap.m.p13n.BasePanel} The BasePanel instance
	 */
	BasePanel.prototype.getMessageStrip = function(){
		return this._oMessageStrip;
	};

	/**
	 * The <code>enableReorder</code> property decides if additional move buttons should be shown on hovering over
	 * the inner list. In addition drag and drop will be enabled on the inner list control.
	 *
	 * @param {boolean} bEnableReorder Decies whether reordering should be enabled or disabled.
	 *
	 * @returns {sap.m.p13n.BasePanel} The BasePanel instance
	 */
	BasePanel.prototype.setEnableReorder = function(bEnableReorder) {
		var oTemplate = this.getAggregation("_template");
		if (bEnableReorder) {
			this._addHover(oTemplate);
		} else if (oTemplate && oTemplate.aDelegates && oTemplate.aDelegates.length > 0) {
			oTemplate.removeEventDelegate(oTemplate.aDelegates[0].oDelegate);
		}
		this._getDragDropConfig().setEnabled(bEnableReorder);
		this._setMoveButtonVisibility(bEnableReorder);
		this.setProperty("enableReorder", bEnableReorder);

		return this;
	};


	BasePanel.prototype._getDragDropConfig = function() {
		if (!this._oDragDropInfo){
			this._oDragDropInfo = new DragDropInfo({
				enabled: false,
				sourceAggregation: "items",
				targetAggregation: "items",
				dropPosition: "Between",
				drop: [this._onRearrange, this]
			});
		}
		return this._oDragDropInfo;
	};

	BasePanel.prototype._getMoveTopButton = function() {
		if (!this._oMoveTopBtn) {
			this._oMoveTopBtn = new OverflowToolbarButton(this.getId() + "-moveTopBtn",{
				type: "Transparent",
				tooltip: this._getResourceText("p13n.MOVE_TO_TOP"),
				icon: "sap-icon://collapse-group",
				press: [this._onPressButtonMoveToTop, this],
				visible: false,
				layoutData: new OverflowToolbarLayoutData({
					moveToOverflow: true,
					priority: "Low",
					group: 2
				})
			});
			this.addDependent(this._oMoveTopBtn);
		}

		return this._oMoveTopBtn;
	};

	BasePanel.prototype._getMoveUpButton = function() {
		if (!this._oMoveUpButton) {
			this._oMoveUpButton = new OverflowToolbarButton(this.getId() + "-moveUpBtn",{
				type: "Transparent",
				tooltip: this._getResourceText("p13n.MOVE_UP"),
				icon: "sap-icon://navigation-up-arrow",
				press: [this._onPressButtonMoveUp, this],
				visible: false,
				layoutData: new OverflowToolbarLayoutData({
					moveToOverflow: true,
					priority: "High",
					group: 1
				})
			});
			this.addDependent(this._oMoveUpButton);
		}

		return this._oMoveUpButton;
	};

	BasePanel.prototype._getMoveDownButton = function() {
		if (!this._oMoveDownButton) {
			this._oMoveDownButton = new OverflowToolbarButton(this.getId() + "-moveDownpBtn",{
				type: "Transparent",
				tooltip: this._getResourceText("p13n.MOVE_DOWN"),
				icon: "sap-icon://navigation-down-arrow",
				press: [this._onPressButtonMoveDown, this],
				visible: false,
				layoutData: new OverflowToolbarLayoutData({
					moveToOverflow: true,
					priority: "High",
					group: 1
				})
			});
			this.addDependent(this._oMoveDownButton);
		}

		return this._oMoveDownButton;
	};

	BasePanel.prototype._getMoveBottomButton = function() {
		if (!this._oMoveBottomButton) {
			this._oMoveBottomButton = new OverflowToolbarButton(this.getId() + "-moveBottomBtn",{
				type: "Transparent",
				tooltip: this._getResourceText("p13n.MOVE_TO_BOTTOM"),
				icon: "sap-icon://expand-group",
				press: [this._onPressButtonMoveToBottom, this],
				visible: false,
				layoutData: new OverflowToolbarLayoutData({
					moveToOverflow: true,
					priority: "Low",
					group: 2
				})
			});
			this.addDependent(this._oMoveBottomButton);
		}

		return this._oMoveBottomButton;
	};

	BasePanel.prototype._createInnerListControl = function() {
		return new Table(this.getId() + "-innerP13nList", Object.assign(this._getListControlConfig(), {
			headerToolbar: new OverflowToolbar({
				content: [
					this._getSearchField(),
					new ToolbarSpacer(),
					this._getMoveTopButton(),
					this._getMoveUpButton(),
					this._getMoveDownButton(),
					this._getMoveBottomButton()
				]
			})
		}));
	};

	BasePanel.prototype._addHover = function(oRow) {
		if (oRow && oRow.aDelegates.length < 1) {
			oRow.addEventDelegate({
				onmouseover: this._hoverHandler.bind(this),
				onfocusin: this._focusHandler.bind(this)
			});
		}
	};

	BasePanel.prototype._focusHandler = function(oEvt) {
		if (!this.getEnableReorder()){
			return;
		}

		//(new) hovered item
		var oHoveredItem = sap.ui.getCore().byId(oEvt.currentTarget.id);
		this._handleActivated(oHoveredItem);
	};

	BasePanel.prototype._hoverHandler = function(oEvt) {
		//Only use hover if no item has been selected yet
		if (this._oSelectedItem && !this._oSelectedItem.bIsDestroyed) {
			return;
		}

		if (!this.getEnableReorder()){
			return;
		}

		//(new) hovered item
		var oHoveredItem = sap.ui.getCore().byId(oEvt.currentTarget.id);

		this._handleActivated(oHoveredItem);
	};

	BasePanel.prototype._handleActivated = function(oHoveredItem) {
		this._oHoveredItem = oHoveredItem;
		//Implement custom hover handling in derivation here..
	};

	BasePanel.prototype._getListControlConfig = function() {
		return {
			mode:"MultiSelect",
			rememberSelections: true,
			itemPress: [this._onItemPressed, this],
			selectionChange: [this._onSelectionChange, this],
			sticky: ["HeaderToolbar", "ColumnHeaders", "InfoToolbar"],
			dragDropConfig: this._getDragDropConfig()
		};
	};

	BasePanel.prototype._getSearchField = function() {
		if (!this._oSearchField) {
			this._oSearchField = new SearchField(this.getId() + "-searchField",{
				liveChange: [this._onSearchFieldLiveChange, this],
				width: "100%",
				layoutData: new OverflowToolbarLayoutData({
					shrinkable: true,
					moveToOverflow: true,
					priority: "High",
					maxWidth: "16rem"
				})
			});
		}
		return this._oSearchField;
	};

	BasePanel.prototype._setTemplate = function(oTemplate) {
		oTemplate.setType("Active");
		this.setAggregation("_template", oTemplate);
		if (oTemplate) {
			if (this.getEnableReorder()){
				this._addHover(oTemplate);
			}
			this._oSelectionBindingInfo = oTemplate.getBindingInfo("selected");
			// Extract the binding info parts
			if (this._oSelectionBindingInfo && this._oSelectionBindingInfo.parts) {
				this._oSelectionBindingInfo = {
					parts: this._oSelectionBindingInfo.parts
				};
			}
		}
		this._bindListItems();
		return this;
	};

	BasePanel.prototype._setPanelColumns = function(vColumns) {
		var aColumns;
		if (vColumns instanceof Array) {
			aColumns = vColumns;
		} else {
			aColumns = [
				vColumns
			];
		}
		this._addTableColumns(aColumns);
	};

	BasePanel.prototype._getP13nModel = function() {
		return this.getModel(this.P13N_MODEL);
	};

	BasePanel.prototype._getResourceText = function(sText, vValue) {
		this.oResourceBundle = this.oResourceBundle ? this.oResourceBundle : sap.ui.getCore().getLibraryResourceBundle("sap.m");
		return sText ? this.oResourceBundle.getText(sText, vValue) : this.oResourceBundle;
	};

	BasePanel.prototype._addTableColumns = function(aColumns) {
		var aRemovedColumns = this._oListControl.removeAllColumns();
		aRemovedColumns.forEach(function(oRemovedColumn){
			oRemovedColumn.destroy();
		});
		aColumns.forEach(function(vColumn) {
			var oColumn;

			if (typeof vColumn == "string") {
				oColumn = new Column({
					header: new Text({
						text: vColumn
					})
				});
			} else {
				oColumn = vColumn;
			}

			this._oListControl.addColumn(oColumn);
		}, this);
	};

	BasePanel.prototype._bindListItems = function(mBindingInfo) {
		var oTemplate = this.getAggregation("_template");
		if (oTemplate) {
			this._oListControl.bindItems(Object.assign({
				path: this.P13N_MODEL + ">/items",
				key: "name",
				templateShareable: false,
				template: this.getAggregation("_template").clone()
			}, mBindingInfo));
		}
	};

	BasePanel.prototype._onSelectionChange = function(oEvent) {

		var aListItems = oEvent.getParameter("listItems");
		var bSelectAll = oEvent.getParameter("selectAll");
		var bDeSelectAll = !bSelectAll && aListItems.length > 1;

		aListItems.forEach(function(oTableItem) {
			this._selectTableItem(oTableItem, bSelectAll || bDeSelectAll);
		}, this);

		if (bSelectAll || bDeSelectAll) {
			this.fireChange();
		}

		// in case of 'deselect all', the move buttons for positioning are going to be disabled
		if (bDeSelectAll) {
			this._getMoveTopButton().setEnabled(false);
			this._getMoveUpButton().setEnabled(false);
			this._getMoveDownButton().setEnabled(false);
			this._getMoveBottomButton().setEnabled(false);
		}
	};

	BasePanel.prototype._onItemPressed = function(oEvent) {
		var oTableItem = oEvent.getParameter('listItem');
		this._oSelectedItem = oTableItem;

		var oContext = oTableItem.getBindingContext(this.P13N_MODEL);
		if (this.getEnableReorder() && oContext && oContext.getProperty(this.PRESENCE_ATTRIBUTE)){
			this._handleActivated(oTableItem);
			this._updateEnableOfMoveButtons(oTableItem, true);
		}
	};

	BasePanel.prototype._onSearchFieldLiveChange = function(oEvent) {
		this._oListControl.getBinding("items").filter(new Filter("label", "Contains", oEvent.getSource().getValue()));
	};

	BasePanel.prototype._onPressButtonMoveToTop = function() {
		this._moveSelectedItem(0);
	};

	BasePanel.prototype._onPressButtonMoveUp = function() {
		this._moveSelectedItem("Up");
	};

	BasePanel.prototype._onPressButtonMoveDown = function() {
		this._moveSelectedItem("Down");
	};

	BasePanel.prototype._onPressButtonMoveToBottom = function() {
		var iIndex = this._oListControl.getItems().length - 1;
		this._moveSelectedItem(iIndex);
	};

	BasePanel.prototype._setMoveButtonVisibility = function(bVisible) {
		this._getMoveTopButton().setVisible(bVisible);
		this._getMoveUpButton().setVisible(bVisible);
		this._getMoveDownButton().setVisible(bVisible);
		this._getMoveBottomButton().setVisible(bVisible);
	};

	BasePanel.prototype._filterBySelected = function(bShowSelected, oList) {
		oList.getBinding("items").filter(bShowSelected ? new Filter(this.PRESENCE_ATTRIBUTE, "EQ", true) : []);
	};

	BasePanel.prototype._selectTableItem = function(oTableItem, bSelectAll) {
		this._updateEnableOfMoveButtons(oTableItem, bSelectAll ? false : true);
		this._oSelectedItem = oTableItem;
		if (!bSelectAll) {
			var oItem = this._getP13nModel().getProperty(this._oSelectedItem.getBindingContext(this.P13N_MODEL).sPath);

			this.fireChange({
				reason: oItem[this.PRESENCE_ATTRIBUTE] ? this.CHANGE_REASON_ADD : this.CHANGE_REASON_REMOVE,
				item: oItem
			});
		}
	};

	BasePanel.prototype._moveSelectedItem = function(vNewIndex) {
		var oSelectedItem = this._oSelectedItem;
		var iSelectedIndex = this._oListControl.indexOfItem(oSelectedItem);
		if (iSelectedIndex < 0) {
			return;
		}

		// determine the new index relative to selected index when "Up" or "Down" is passed as a parameter
		var iNewIndex = (typeof vNewIndex == "number") ? vNewIndex : iSelectedIndex + (vNewIndex == "Up" ? -1 : 1);
		this._moveTableItem(oSelectedItem, iNewIndex);

	};

	BasePanel.prototype._getModelEntry = function(oItem) {
		return oItem.getBindingContext(this.P13N_MODEL).getObject();
	};

	BasePanel.prototype._moveTableItem = function(oItem, iNewIndex) {
		var aItems = this._oListControl.getItems();
		var aFields = this._getP13nModel().getProperty("/items");

		// index of the item in the model not the index in the aggregation
		var iOldIndex = aFields.indexOf(this._getModelEntry(oItem));

		// limit the minumum and maximum index
		iNewIndex = (iNewIndex <= 0) ? 0 : Math.min(iNewIndex, aItems.length - 1);

		// new index of the item in the model
		iNewIndex = aFields.indexOf(this._getModelEntry(aItems[iNewIndex]));
		if (iNewIndex == iOldIndex) {
			return;
		}

		// remove data from old position and insert it into new position
		aFields.splice(iNewIndex, 0, aFields.splice(iOldIndex, 1)[0]);
		this._getP13nModel().setProperty("/items", aFields);

		// store the moved item again due to binding
		this._oSelectedItem = this._oListControl.getItems()[iNewIndex];

		this._updateEnableOfMoveButtons(this._oSelectedItem, true);

		this._handleActivated(this._oSelectedItem);

		this.fireChange({
			reason: this.CHANGE_REASON_MOVE,
			item: undefined
		});
	};

	BasePanel.prototype._onRearrange = function(oEvent) {
		var oDraggedItem = oEvent.getParameter("draggedControl");
		var oDroppedItem = oEvent.getParameter("droppedControl");
		var sDropPosition = oEvent.getParameter("dropPosition");
		var iDraggedIndex = this._oListControl.indexOfItem(oDraggedItem);
		var iDroppedIndex = this._oListControl.indexOfItem(oDroppedItem);
		var iActualDroppedIndex = iDroppedIndex + (sDropPosition == "Before" ? 0 : 1) + (iDraggedIndex < iDroppedIndex ? -1 : 0);

		this._moveTableItem(oDraggedItem, iActualDroppedIndex);
	};

	BasePanel.prototype._updateEnableOfMoveButtons = function(oTableItem, bFocus) {
		var iTableItemPos = this._oListControl.getItems().indexOf(oTableItem);
		var bUpEnabled = true, bDownEnabled = true;
		if (iTableItemPos == 0) {
			// disable move buttons upwards, if the item is at the top
			bUpEnabled = false;
		}
		if (iTableItemPos == this._oListControl.getItems().length - 1) {
			// disable move buttons downwards, if the item is at the bottom
			bDownEnabled = false;
		}
		this._getMoveTopButton().setEnabled(bUpEnabled);
		this._getMoveUpButton().setEnabled(bUpEnabled);
		this._getMoveDownButton().setEnabled(bDownEnabled);
		this._getMoveBottomButton().setEnabled(bDownEnabled);
		if (bFocus) {
			oTableItem.focus();
		}
	};

	BasePanel.prototype.exit = function() {
		Control.prototype.exit.apply(this, arguments);
		this._oSelectionBindingInfo = null;
		this._oSelectedItem = null;
		this._oListControl = null;
		this._oMoveTopBtn = null;
		this._oMoveUpButton = null;
		this._oMoveDownButton = null;
		this._oMoveBottomButton = null;
		this._oSearchField = null;
	};

	return BasePanel;
});