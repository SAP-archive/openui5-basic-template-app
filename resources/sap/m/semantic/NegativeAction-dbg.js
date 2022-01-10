/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['sap/m/semantic/SemanticButton'], function(SemanticButton) {
	"use strict";

	/**
	 * Constructor for a new NegativeAction.
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] Optional initial settings for the new control:  a map/JSON-object with initial property values, event listeners etc. for the new object
	 *
	 * @class
	 * A NegativeAction button has default semantic-specific properties and
	 * is eligible for aggregation content of a {@link sap.m.semantic.SemanticPage}.
	 *
	 * @extends sap.m.semantic.SemanticButton
	 *
	 * @author SAP SE
	 * @version 1.96.2
	 *
	 * @constructor
	 * @public
	 * @since 1.30.0
	 * @alias sap.m.semantic.NegativeAction
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */

	var NegativeAction = SemanticButton.extend("sap.m.semantic.NegativeAction", /** @lends sap.m.semantic.NegativeAction.prototype */ {
		metadata: {
			library : "sap.m",
			properties : {

				/**
				 * Button text
				 */
				text: {type: "string", group: "Misc", defaultValue: null}
			}
		}
	});

	return NegativeAction;
});
