/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.m.ToolbarSeparator.
sap.ui.define(['./library', 'sap/ui/core/Control', './ToolbarSeparatorRenderer'],
	function(library, Control, ToolbarSeparatorRenderer) {
	"use strict";



	/**
	 * Constructor for a new <code>ToolbarSeparator</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * Creates a visual separator (theme dependent: padding, margin, line) between the
	 * preceding and succeeding {@link sap.m.Toolbar} item.
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version 1.64.0
	 *
	 * @constructor
	 * @public
	 * @since 1.26
	 * @alias sap.m.ToolbarSeparator
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var ToolbarSeparator = Control.extend("sap.m.ToolbarSeparator", /** @lends sap.m.ToolbarSeparator.prototype */ { metadata : {

		library : "sap.m"
	}});

	return ToolbarSeparator;

});
