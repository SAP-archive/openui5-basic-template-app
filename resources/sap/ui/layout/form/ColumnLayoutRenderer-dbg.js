/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'sap/ui/core/Renderer',
	'sap/ui/Device',
	'./FormLayoutRenderer'
	], function(Renderer, Device, FormLayoutRenderer) {
	"use strict";

	/**
	 * form/ColumnLayout renderer.
	 * @namespace
	 */
	var ColumnLayoutRenderer = Renderer.extend(FormLayoutRenderer);

	ColumnLayoutRenderer.apiVersion = 2;

	ColumnLayoutRenderer.getMainClass = function(){

		return "sapUiFormCL";

	};

	ColumnLayoutRenderer.renderContainers = function(oRm, oLayout, oForm){

		var iColumnsM = oLayout.getColumnsM();
		var iColumnsL = oLayout.getColumnsL();
		var iColumnsXL = oLayout.getColumnsXL();
		var aContainers = oForm.getVisibleFormContainers();
		var iContainers = aContainers.length;

		if (iContainers > 0) {
			// if more that one container render a DIV around containers
			if (iContainers > 1 || oLayout.getLayoutDataForElement(aContainers[0], "sap.ui.layout.form.ColumnContainerData")) {
				oRm.openStart("div");
				oRm.class("sapUiFormCLContent");
				oRm.class("sapUiFormCLColumnsM" + iColumnsM);
				oRm.class("sapUiFormCLColumnsL" + iColumnsL);
				oRm.class("sapUiFormCLColumnsXL" + iColumnsXL);
				oRm.openEnd();
			}

			for (var i = 0; i < iContainers; i++) {
				var oContainer = aContainers[i];
				this.renderContainer(oRm, oLayout, oContainer);
			}

			if (iContainers > 1) {
				oRm.close("div");
			}
		}

	};

	ColumnLayoutRenderer.renderContainer = function(oRm, oLayout, oContainer){

		var bExpandable = oContainer.getExpandable();
		var oToolbar = oContainer.getToolbar();
		var oTitle = oContainer.getTitle();
		var oOptions = oLayout._getContainerSize(oContainer);

		oContainer._checkProperties();

		oRm.openStart("section", oContainer);
		oRm.class("sapUiFormCLContainer");
		oRm.class("sapUiFormCLContainerS" + oOptions.S.Size);
		oRm.class("sapUiFormCLContainerM" + oOptions.M.Size);
		oRm.class("sapUiFormCLContainerL" + oOptions.L.Size);
		oRm.class("sapUiFormCLContainerXL" + oOptions.XL.Size);
		// S-Break not needed as there is no float possible
		if (oOptions.M.Break) {
			oRm.class("sapUiFormCLContainerMBreak");
		}
		if (oOptions.L.Break) {
			oRm.class("sapUiFormCLContainerLBreak");
		}
		if (oOptions.XL.Break) {
			oRm.class("sapUiFormCLContainerXLBreak");
		}
		if (oOptions.S.FirstRow) {
			oRm.class("sapUiFormCLContainerSFirstRow");
		}
		if (oOptions.M.FirstRow) {
			oRm.class("sapUiFormCLContainerMFirstRow");
		}
		if (oOptions.L.FirstRow) {
			oRm.class("sapUiFormCLContainerLFirstRow");
		}
		if (oOptions.XL.FirstRow) {
			oRm.class("sapUiFormCLContainerXLFirstRow");
		}

		if (oToolbar) {
			oRm.class("sapUiFormContainerToolbar");
		} else if (oTitle) {
			oRm.class("sapUiFormContainerTitle");
		}

		if (!oContainer.getExpanded()) {
			oRm.class("sapUiFormCLContainerColl");
		}

		if (oContainer.getTooltip_AsString()) {
			oRm.attr('title', oContainer.getTooltip_AsString());
		}

		this.writeAccessibilityStateContainer(oRm, oContainer);

		oRm.openEnd();

		this.renderHeader(oRm, oToolbar, oTitle, oContainer._oExpandButton, bExpandable, false, oContainer.getId());

		oRm.openStart("div", oContainer.getId() + "-content")
			.class("sapUiFormCLContainerCont")
			.openEnd();

		var aElements = oContainer.getVisibleFormElements();
		for (var i = 0; i < aElements.length; i++) {
			var oElement = aElements[i];
			this.renderElement(oRm, oLayout, oElement);

			if (Device.browser.chrome && i < oOptions.XL.Size - 1 && aElements.length > 1 && aElements.length <= oOptions.XL.Size) {
				// in Chrome columns are not filled properly for less elements -> an invisible dummy DIV helps
				// with this logic the result is near to the other browsers
				// this "work around" don't work for other browsers
				oRm.openStart("div").class("sapUiFormCLElementDummy").openEnd().close("div");
			}
		}

		oRm.close("div");
		oRm.close("section");

	};

	ColumnLayoutRenderer.renderElement = function(oRm, oLayout, oElement){

		var oLabel = oElement.getLabelControl();
		var oOptions;

		oRm.openStart("div", oElement);
		oRm.class("sapUiFormCLElement");
		if (oElement.getTooltip_AsString()) {
			oRm.attr('title', oElement.getTooltip_AsString());
		}
		oRm.openEnd();

		if (oLabel) {
			oOptions = oLayout._getFieldSize(oLabel);
			oRm.openStart("div")
				.class("sapUiFormElementLbl")
				.class("sapUiFormCLCellsS" + oOptions.S.Size)
				.class("sapUiFormCLCellsL" + oOptions.L.Size)
				.openEnd();

			oRm.renderControl(oLabel);

			oRm.close("div");
		}

		var aFields = oElement.getFieldsForRendering();
		if (aFields && aFields.length > 0) {
			for (var k = 0, kl = aFields.length; k < kl; k++) {
				var oField = aFields[k];
				if (!oField.isA("sap.ui.core.IFormContent")) {
					throw new Error(oField + " is not a valid Form content! Only use valid content in " + oLayout);
				}
				oOptions = oLayout._getFieldSize(oField);
				oRm.openStart("div");
				oRm.class("sapUiFormCLCellsS" + oOptions.S.Size);
				oRm.class("sapUiFormCLCellsL" + oOptions.L.Size);
				if (oOptions.S.Break) {
					oRm.class("sapUiFormCLCellSBreak");
				}
				if (oOptions.L.Break) {
					oRm.class("sapUiFormCLCellLBreak");
				}
				if (oOptions.S.Space) {
					oRm.class("sapUiFormCLCellSSpace" + oOptions.S.Space);
				}
				if (oOptions.L.Space) {
					oRm.class("sapUiFormCLCellLSpace" + oOptions.L.Space);
				}
				oRm.openEnd();

				oRm.renderControl(oField);

				oRm.close("div");
			}
		}
		oRm.close("div");

	};

	return ColumnLayoutRenderer;

}, /* bExport= */ true);
