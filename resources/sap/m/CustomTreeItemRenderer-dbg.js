/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'./TreeItemBaseRenderer', 'sap/ui/core/Renderer'
], function(TreeItemBaseRenderer, Renderer) {
	"use strict";

	/**
	 * @namespace
	 */
	var CustomTreeItemRenderer = Renderer.extend(TreeItemBaseRenderer);
	CustomTreeItemRenderer.apiVersion = 2;

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRenderManager RenderManager object
	 * @param {sap.ui.core.Control} oControl An object representation of the control that will be rendered
	 */
	CustomTreeItemRenderer.renderLIAttributes = function(rm, oLI) {
		rm.class("sapMCTI");
		TreeItemBaseRenderer.renderLIAttributes.apply(this, arguments);
	};

	CustomTreeItemRenderer.renderLIContent = function(rm, oLI) {
		oLI.getContent().forEach(function(oContent) {
			rm.renderControl(oContent);
		});
	};

	return CustomTreeItemRenderer;

}, /* bExport= */true);
