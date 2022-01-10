/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["sap/ui/Device"], function(Device) {
	"use strict";

	/**
	 * TimePickerInputsRenderer renderer.
	 * @namespace
	 */
	var TimePickerInputsRenderer = {
		apiVersion: 2
	};

	/**
	 * Renders the HTML for the given {@link sap.m.TimePickerInputs} control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRM The RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered
	 */
	TimePickerInputsRenderer.render = function(oRm, oControl) {
		var aControls = oControl.getAggregation("_inputs"),
			oSegButton = oControl.getAggregation("_buttonAmPm"),
			aSeparators = oControl._getTimeSeparators(oControl._getDisplayFormatPattern()),
			sSeparator,
			iIndex;

		if (aControls) {
			if (oSegButton) {
				aControls.push(oSegButton);
			}

			oRm.openStart("div", oControl); // outer wrapper
			oRm.class("sapMTPInputsContainer");
			oRm.attr("role", "application");
			oRm.attr("aria-roledescription", oControl._getAriaRoleDescription());
			oRm.openEnd();

			for (iIndex = 0; iIndex < aControls.length; iIndex++) {
				oRm.renderControl(aControls[iIndex]);
				if (iIndex < aControls.length - 1) {
					sSeparator = aSeparators.shift();
					if (!sSeparator) {
						sSeparator = " ";
					}
					oRm.openStart("span");
					oRm.attr("aria-hidden", "true");
					oRm.openEnd();
					oRm.text(sSeparator);
					oRm.close("span");
				}
			}

			oRm.close("div"); // outer wrapper
		}
	};

	return TimePickerInputsRenderer;
}, /* bExport= */ true);
