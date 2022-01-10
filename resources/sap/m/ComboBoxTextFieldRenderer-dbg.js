/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	'./InputBaseRenderer',
	'sap/ui/core/Renderer',
	'sap/ui/core/LabelEnablement',
	'sap/ui/Device'
],
	function(InputBaseRenderer, Renderer, LabelEnablement, Device) {
		"use strict";

		/**
		 * ComboBoxTextFiel renderer.
		 *
		 * @namespace
		 */
		var ComboBoxTextFieldRenderer = Renderer.extend(InputBaseRenderer);
		ComboBoxTextFieldRenderer.apiVersion = 2;
		/**
		 * CSS class to be applied to the root element of the control.
		 *
		 * @readonly
		 * @const {string}
		 */
		ComboBoxTextFieldRenderer.CSS_CLASS_COMBOBOXTEXTFIELD = "sapMComboBoxTextField";

		/**
		 * Add attributes to the input element.
		 *
		 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
		 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
		 */
		ComboBoxTextFieldRenderer.writeInnerAttributes = function(oRm, oControl) {
			oRm.attr("role", "combobox");
			oRm.attr("aria-haspopup", "listbox");
			oRm.attr("aria-autocomplete", "both");
			oRm.attr("aria-expanded", "false");
			oRm.attr("autocomplete", "off");
			oRm.attr("autocorrect", "off");
			oRm.attr("autocapitalize", "off");
			oRm.attr("type", "text");
		};

		/**
		 * Retrieves the ARIA role for the control.
		 * To be overwritten by subclasses.
		 *
		 */
		ComboBoxTextFieldRenderer.getAriaRole = function() {};

		/**
		 * Add extra styles for input container.
		 *
		 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
		 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
		 */
		ComboBoxTextFieldRenderer.addOuterStyles = function(oRm, oControl) {
			oRm.style("max-width", oControl.getMaxWidth());
		};

		return ComboBoxTextFieldRenderer;
	}, true);