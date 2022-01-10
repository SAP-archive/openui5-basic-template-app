/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Renderer', './InputBaseRenderer', 'sap/ui/core/library'],
	function(Renderer, InputBaseRenderer, coreLibrary) {
	"use strict";

	/**
	 * DatePicker renderer.
	 * @namespace
	 */
	var DatePickerRenderer = Renderer.extend(InputBaseRenderer);
	DatePickerRenderer.apiVersion = 2;

	/**
	 * Write the value of the input.
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
	 * @param {sap.m.DatePicker} oDP An object representation of the control that should be rendered.
	 */
	DatePickerRenderer.writeInnerValue = function(oRm, oDP) {
		if (oDP._bValid || oDP._bOutOfAllowedRange) {
			oRm.attr("value", oDP._formatValue(oDP.getDateValue()));
		} else {
			oRm.attr("value", oDP.getValue());
		}
	};

	/**
	 * This method is reserved for derived classes to add extra attributes for the input element.
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
	 * @param {sap.m.DatePicker} oDP An object representation of the control that should be rendered.
	 */
	DatePickerRenderer.writeInnerAttributes = function(oRm, oDP) {
		oRm.attr("type", "text");

		if (oDP._bMobile) {
			// prevent keyboard in mobile devices
			oRm.attr("readonly", "readonly");
		}
	};

	DatePickerRenderer.getAriaRole = function(oDP) {
		return "combobox";
	};

	DatePickerRenderer.getAccessibilityState = function(oDP) {
		var mAccessibilityState = InputBaseRenderer.getAccessibilityState.apply(this, arguments);

		mAccessibilityState["roledescription"] = sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATEINPUT");
		mAccessibilityState["autocomplete"] = "none";
		mAccessibilityState["haspopup"] = coreLibrary.aria.HasPopup.Grid.toLowerCase();
		mAccessibilityState["expanded"] = false;
		// aria-disabled is not necessary if we already have a native 'disabled' attribute
		mAccessibilityState["disabled"] = null;

		if (oDP._bMobile && oDP.getEnabled() && oDP.getEditable()) {
			// if on mobile device readonly property is set, but should not be announced
			mAccessibilityState["readonly"] = false;
		}

		return mAccessibilityState;
	};

	return DatePickerRenderer;

}, /* bExport= */ true);
