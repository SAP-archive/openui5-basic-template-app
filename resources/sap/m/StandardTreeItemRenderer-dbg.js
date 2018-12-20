/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['./TreeItemBaseRenderer', 'sap/ui/core/Renderer'],
	function(TreeItemBaseRenderer, Renderer) {
	"use strict";

	/**
	 * StandardTreeItemRenderer renderer.
	 * @namespace
	 */
	var StandardTreeItemRenderer = Renderer.extend(TreeItemBaseRenderer);

	StandardTreeItemRenderer.renderLIContent = function(rm, oLI) {

		// render icon control
		if (oLI.getIcon()) {
			rm.renderControl(oLI._getIconControl());
		}

		rm.writeEscaped(oLI.getTitle());

	};

	StandardTreeItemRenderer.renderLIAttributes = function(rm, oLI) {
		TreeItemBaseRenderer.renderLIAttributes.apply(this, arguments);
		rm.addClass("sapMSTI");
	};

	StandardTreeItemRenderer.getAriaLabelledBy = function(oLI) {
		return oLI.getId() + "-content";
	};

	return StandardTreeItemRenderer;

}, /* bExport= */ true);
