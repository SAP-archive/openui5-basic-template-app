/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.StandardListItem control
sap.ui.define([],
	function() {
		"use strict";

		return {
			actions: {
				rename: {
					changeType: "rename",
					domRef: function (oControl) {
						return oControl.$().find(".sapMLIBContent > .sapMSLITitleDiv > .sapMSLITitleOnly")[0] || oControl.$().find(".sapMLIBContent > .sapMSLIDiv > .sapMSLITitleDiv > .sapMSLITitle")[0];
					}
				}
			}
		};

	}, /* bExport= */ false);