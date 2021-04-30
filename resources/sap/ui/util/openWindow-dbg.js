/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"], function(Device) {
	"use strict";

	/**
	 * Helper that adds window features 'noopener noreferrer' when opening an
	 * address to ensure that no opener browsing context is forwarded.
	 * If forwarding of the opener browsing context is needed, the native
	 * <code>window.open</code> API should be used.
	 *
	 * @param {sap.ui.core.URI} sUrl URL of a document that should be loaded in the new window
	 * @param {string} sWindowName Name of the new window
	 * @returns {Window|null} The newly returned window object or null
	 * @private
	 * @ui5-restricted
	 * @alias module:sap/ui/util/openWindow
	 * @since 1.84
	 */
	var fnOpenWindow = function openWindow(sUrl, sWindowName) {

		var sWindowFeatures = "noopener,noreferrer";

		// ensure that, in IE11 or Edge, opener cannot be accessed by early code
		if (Device.browser.msie || Device.browser.edge) {
			var oNewWindow = window.open("about:blank", sWindowName, sWindowFeatures);

			if (oNewWindow) {
				oNewWindow.opener = null;
				oNewWindow.location.href = sUrl;
			}

			return null;
		}

		return window.open(sUrl, sWindowName, sWindowFeatures);
	};

	return fnOpenWindow;
});
