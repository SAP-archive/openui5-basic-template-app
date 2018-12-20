/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/dt/ElementUtil"
], function (Utils) {
	"use strict";

	return {
		isVisible: function(oColumn) {
			return oColumn.getVisible();
		},
		actions: {
			remove: "hideControl",
			reveal: {
				changeType: "unhideControl",
				getLabel: function(oControl) {
					return Utils.getLabelForElement(oControl.getHeader());
				}
			}
		}
	};
}, /* bExport= */ false);
