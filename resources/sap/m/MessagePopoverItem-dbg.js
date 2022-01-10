/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["./library", "./MessageItem"],
	function(library, MessageItem) {
		"use strict";

		/**
		 * Constructor for a new MessagePopoverItem.
		 *
		 * @param {string} [sId] id for the new control, generated automatically if no id is given
		 * @param {object} [mSettings] initial settings for the new control
		 *
		 * @class
		 * Items provide information about Error Messages in the page.
		 * @extends sap.m.MessageItem
		 *
		 * @author SAP SE
		 * @version 1.96.2
		 *
		 * @constructor
		 * @public
		 * @since 1.28
		 * @deprecated Since version 1.46, use MessageItem instead
		 * @alias sap.m.MessagePopoverItem
		 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
		 */

		var MessagePopoverItem = MessageItem.extend("sap.m.MessagePopoverItem", /** @lends sap.m.MessagePopoverItem.prototype */ {
			metadata: {
				deprecated: true
			}
		});

		return MessagePopoverItem;
	});
