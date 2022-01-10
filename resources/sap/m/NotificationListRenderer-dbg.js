/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['sap/ui/core/Renderer',
		'./ListBaseRenderer'],
	function(Renderer,
			 ListBaseRenderer) {
		"use strict";

		/**
		 * Tree renderer.
		 * @namespace
		 *
		 */
		var NotificationListRenderer = Renderer.extend(ListBaseRenderer);
		NotificationListRenderer.apiVersion = 2;

		/**
		 * Returns the ARIA accessibility role.
		 *
		 * @param {sap.ui.core.Control} oControl An object representation of the control
		 * @returns {String}
		 */
		NotificationListRenderer.getAriaRole = function(oControl) {
			return "list";
		};

		return NotificationListRenderer;

	}, /* bExport= */ true);