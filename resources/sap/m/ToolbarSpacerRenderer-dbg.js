/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([],
	function() {
	"use strict";

	/**
	 * ToolbarSpacer renderer.
	 * @namespace
	 */
	var ToolbarSpacerRenderer = {};

	/**
	 * Flexible Spacer Class Name
	 * @protected
	 */
	ToolbarSpacerRenderer.flexClass = "sapMTBSpacerFlex";

	ToolbarSpacerRenderer.render = function(rm, oControl) {
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("sapMTBSpacer");

		var sWidth = oControl.getWidth();
		if (sWidth) {
			rm.addStyle("width", sWidth);
		} else {
			rm.addClass(ToolbarSpacerRenderer.flexClass);
		}

		rm.writeStyles();
		rm.writeClasses();
		rm.write("></div>");
	};

	return ToolbarSpacerRenderer;

}, /* bExport= */ true);
