/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["sap/ui/core/Renderer", "./ListBaseRenderer"],
	function(Renderer, ListBaseRenderer) {
	"use strict";


	/**
	 * List renderer.
	 *
	 * ListRenderer extends the ListBaseRenderer
	 * @namespace
	 * @alias sap.m.ListRenderer
	 */
	var ListRenderer = Renderer.extend(ListBaseRenderer);

	return ListRenderer;

}, /* bExport= */ true);
