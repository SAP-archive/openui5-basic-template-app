/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	'sap/base/Log'
], function (Log) {
	"use strict";

	// TODO reset map onThemeChanged
	var mLibThemeMetadata = {};

	/**
	 *
	 * @since 1.92.0
	 * @alias sap.ui.core.theming.ThemeHelper
	 * @static
	 * @namespace
	 * @private
	 * @ui5-restricted sap.ui.core
	 */
	var ThemeHelper = {};

	ThemeHelper.reset = function () {
		mLibThemeMetadata = {};
	};

	ThemeHelper.getMetadata = function (sLibId) {
		if (!sLibId) {
			return null;
		}

		var sLibName = sLibId.replace("sap-ui-theme-", "").replace(/\./g, "-");
		if (mLibThemeMetadata[sLibName]) {
			return mLibThemeMetadata[sLibName];
		}

		var oMetadata, sMetadataJSON;

		var oBodyStyle = window.getComputedStyle(document.body || document.documentElement);
		var sVariablesMarker = oBodyStyle.getPropertyValue("--sapUiTheme-" + sLibName).trim();

		// Try first to read the metadata from the CSS variables in case CSS variables are supported
		if (sVariablesMarker) {
			// read metadata
			sMetadataJSON = oBodyStyle.getPropertyValue("--sapThemeMetaData-UI5-" + sLibName).trim();
		}
		// Fallback to inline metadata in case no CSS variables are supported or metadata is only available inline
		if (!sMetadataJSON) {
			var oMetadataElement = document.createElement("span");
			oMetadataElement.classList.add("sapThemeMetaData-UI5-" + sLibName);
			document.documentElement.appendChild(oMetadataElement);
			var sDataUri = window.getComputedStyle(oMetadataElement).getPropertyValue("background-image");
			document.documentElement.removeChild(oMetadataElement);

			var aDataUriMatch = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)/i.exec(sDataUri);
			if (!aDataUriMatch || aDataUriMatch.length < 2) {
				return null;
			}

			var sMetaData = aDataUriMatch[1];

			// The following lines of code are moved unchanged from ThemeCheck in order to not introduce any regressions but
			// neverteheless it's not fully clear if detection of URI encoding and URI decoding itself (especially manual encoding of spaces)
			// is necessary

			// Try to detect URI encoding by checking for first and last character for not encoded characters
			if (sMetaData.charAt(0) !== "{" && sMetaData.charAt(sMetaData.length - 1) !== "}") {
				try {
					sMetaData = decodeURI(sMetaData);
				} catch (ex) {
					// ignore
				}
			}

			// Remove superfluous escaping of double quotes
			sMetaData = sMetaData.replace(/\\"/g, '"');

			// Replace encoded spaces => not clear if this is really necessary and if there is any valid case where spaces are URI encoded
			//							 but we could not detect URI encoding. Keep coding in order to avoid regression.
			sMetadataJSON = sMetaData.replace(/%20/g, " ");
		}
		try {
			oMetadata = JSON.parse(sMetadataJSON);
			mLibThemeMetadata[sLibName] = oMetadata;
		} catch (ex) {
			Log.error("Could not parse theme metadata for library " + sLibName + ".");
		}
		return oMetadata;
	};

	return ThemeHelper;
});
