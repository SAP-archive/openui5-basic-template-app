/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides element sap.m.DynamicDateValueHelpUIType.
sap.ui.define(['sap/ui/core/Element'],
	function(Element) {
		"use strict";

		/**
		 * Constructor for a new DynamicDateValueHelpUIType.
		 *
		 * @param {string} [sId] id for the new control, generated automatically if no id is given
		 * @param {object} [mSettings] initial settings for the new control
		 *
		 * @class
		 * A class that describes the predefined value help UI type of DynamicDateRange options.
		 * @extends sap.ui.core.Element
		 *
		 * @author SAP SE
		 * @version 1.96.2
		 *
		 * @public
		 * @since 1.92
		 * @alias sap.m.DynamicDateValueHelpUIType
		 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
		 * @experimental Since 1.92. This class is experimental and provides only limited functionality. Also the API might be changed in future.
		 */
		var DynamicDateValueHelpUIType = Element.extend("sap.m.DynamicDateValueHelpUIType", /** @lends sap.m.DynamicDateValueHelpUIType.prototype */ {
			metadata: {
				library: "sap.m",
				properties: {
					/**
					 * One of the predefined types - "date", "daterange", "month", "int".
					 * They determine controls - calendar or input.
					 */
					type: { type: "string" },

					/**
					 * A text for an additional label describing the interactive UI.
					 */
					text: { type: "string" },

					/**
					 * Describes the options in a radio button group.
 					 */
					options: { type: "string[]", multiple: true, defaultValue: null }
				}
			}
		});

		return DynamicDateValueHelpUIType;
	});