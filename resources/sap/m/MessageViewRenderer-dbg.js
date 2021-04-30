/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["sap/ui/core/Core"], function (Core) {
	"use strict";

	var MessageViewRenderer = {
		apiVersion: 2
	};

	var CSS_CLASS = "sapMMsgView";

	MessageViewRenderer.render = function (oRm, oControl) {
		var oResourceBundle = Core.getLibraryResourceBundle("sap.m");

		oRm.openStart("div", oControl);
		oRm.class(CSS_CLASS);
		oRm.accessibilityState(oControl, {
			role: "region",
			label: oResourceBundle.getText("MESSAGE_VIEW_ARIA_LABEL")
		});
		oRm.openEnd();
		oRm.renderControl(oControl._navContainer);
		oRm.close("div");
	};

	return MessageViewRenderer;

}, /* bExport= */ true);
