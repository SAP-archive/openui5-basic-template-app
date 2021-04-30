/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Renderer', 'sap/m/ButtonRenderer'],
	function(Renderer, ButtonRenderer) {
	"use strict";

	/**
	 * SelectionDetails renderer.
	 * @namespace
	 */
	var SelectionDetailsRenderer = Renderer.extend(ButtonRenderer);

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the Render-Output-Buffer
	 * @param {sap.ui.core.Control} oControl The control to be rendered
	 * @public
	 */
	SelectionDetailsRenderer.render = function(oRm, oControl) {
		var oButton = oControl.getAggregation("_button");
		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.write(">");

		oRm.renderControl(oButton);

		oRm.write("</div>");
	};

	return SelectionDetailsRenderer;

}, /* bExport= */ true);
