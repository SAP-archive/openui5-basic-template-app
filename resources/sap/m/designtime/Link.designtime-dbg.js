/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.Link control
sap.ui.define([], function() {
	"use strict";

	return {
		name : {
			singular : "LINK_NAME",
			plural : "LINK_NAME_PLURAL"
		},
		palette : {
			group : "ACTION",
			icons : {
				svg : "sap/m/designtime/Link.icon.svg"
			}
		},
		actions : {
			remove : {
				changeType : "hideControl"
			},
			reveal : {
				changeType : "unhideControl"
			}
		},
		templates: {
			create: "sap/m/designtime/Link.create.fragment.xml"
		}
	};
}, /* bExport= */false);
