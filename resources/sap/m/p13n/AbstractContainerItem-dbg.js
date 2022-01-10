/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['sap/ui/core/Element'],
	function(Element) {
	"use strict";

    /**
	 * Constructor for a new <code>AbstractContainerItem</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * A <code>AbstractContainerItem</code> element which defines a unique key for a content.
	 *
	 * @extends sap.ui.core.Element
	 *
	 * @author SAP SE
	 * @version 1.96.2
	 *
	 * @constructor
	 * @alias sap.m.p13n.AbstractContainerItem
	 * @author SAP SE
	 * @version 1.96.2
	 * @since 1.96.0
	 *
	 * @private
	 * @experimental
	 */
    var AbstractContainerItem = Element.extend("sap.m.p13n.AbstractContainerItem", {
        metadata : {
		library : "sap.m",
		defaultAggregation: "content",
		properties : {
			/**
			 * Unique key to identify a container item.
			 */
            key: {
                type: "string",
                defaultValue : null
			},
			/**
			 * Text describing the provided content.
			 */
			text: {
                type: "string",
                defaultValue : null
			},
			/**
			 * Additional icon for the content.
			 */
			icon: {
				type: "string",
				defaultValue : null
			}
		},
		aggregations: {
            /**
             * Dynamic content to be displayed as container item.
             */
            content: {
                type: "sap.ui.core.Control",
                multiple: false
            }
		}
	}});

	AbstractContainerItem.prototype.setContent = function(oContent) {
		this.setAggregation("content", oContent);
		if (oContent) {
			this._oContent = oContent;
		}
		return this;
	};

	AbstractContainerItem.prototype.getContent = function() {
		return this._oContent;
	};

	AbstractContainerItem.prototype.destroy = function() {
		Element.prototype.destroy.apply(this, arguments);
		if (this._oContent) {
			this._oContent.destroy();
			this._oContent = null;
		}
	};

	return AbstractContainerItem;

});
