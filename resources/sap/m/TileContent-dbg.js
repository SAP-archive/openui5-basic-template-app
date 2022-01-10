/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['./library', 'sap/ui/core/library', 'sap/ui/core/Control', './TileContentRenderer'],
	function(library, Core, Control, TileContentRenderer) {
	"use strict";

	var Priority = Core.Priority;

	/**
	 * Constructor for a new sap.m.TileContent control.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class This control is used within the GenericTile control.
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version 1.96.2
	 * @since 1.34.0
	 *
	 * @public
	 * @alias sap.m.TileContent
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var TileContent = Control.extend("sap.m.TileContent", /** @lends sap.m.TileContent.prototype */ {
		metadata : {
			library : "sap.m",
			properties : {
				/**
				 * The footer text of the tile.
				 */
				"footer" : {type : "string", group : "Appearance", defaultValue : null},
				/**
				 * The semantic color of the footer.
				 * @since 1.44
				 */
				"footerColor" : {type : "sap.m.ValueColor", group : "Appearance", defaultValue : "Neutral"},
				/**
				 * Updates the size of the tile. If it is not set, then the default size is applied based on the device tile.
				 * @deprecated Since version 1.38.0. The TileContent control has now a fixed size, depending on the used media (desktop, tablet or phone).
				 */
				"size" : {type : "sap.m.Size", group : "Appearance", defaultValue : "Auto", deprecated: true},
				/**
				 * The percent sign, the currency symbol, or the unit of measure.
				 */
				"unit" : {type : "string", group : "Data", defaultValue : null},
				/**
				 * Disables control if true.
				 */
				"disabled" : {type : "boolean", group : "Behavior", defaultValue : false},
				/**
				 * Frame types: 1x1, 2x1, and auto.
				 */
				"frameType" : {type : "sap.m.FrameType", group : "Appearance", defaultValue : "Auto"},
				/**
				 * Adds a priority badge before the content. Works only in Generic Tile ActionMode.
				 * @experimental Since 1.96
				 */
				"priority" : {type: "sap.ui.core.Priority", group: "Misc", defaultValue: Priority.None}
			},
			defaultAggregation : "content",
			aggregations : {
				/**
				 * The switchable view that depends on the tile type.
				 */
				"content" : {type : "sap.ui.core.Control", multiple : false, bindable : "bindable"}
			}
		}
	});

	/* --- Lifecycle methods --- */

	TileContent.prototype.init = function() {
		this._bRenderFooter = true;
		this._bRenderContent = true;
	};

	TileContent.prototype.onBeforeRendering = function() {
		if (this.getContent() && this._oDelegate) {
			if (this.getDisabled()) {
				this.getContent().addDelegate(this._oDelegate);
			} else {
				this.getContent().removeDelegate(this._oDelegate);
			}
		}
	};

	/**
	 * Handler for after rendering
	 */
	TileContent.prototype.onAfterRendering = function() {
		var oContent = this.getContent();
		if (oContent) {
			var thisRef = this.$();
			var aTooltipEments = thisRef.find("*");
			// tooltip of the entire tile
			var sTileToolTip = thisRef.attr("title") || "";
			// tooltip of the content if any
			var sCntTooltip = oContent.getTooltip_AsString() || "";
			// if both the tooltips are same, make tile tooltip as null
			if (sTileToolTip === sCntTooltip) {
				sTileToolTip = "";
			}
			var sInnerToolTip = '';
			// looping through all the inner elements to concatenate
			// their tooltips
			aTooltipEments.toArray().forEach(function(el){
				if (el.title) {
						sInnerToolTip = sInnerToolTip.concat(el.title + " ");
					}
				});
				// if inner tooltips exist, then concatenate with the content tooltip
				if (sInnerToolTip.trim() !== 0) {
					sCntTooltip = sCntTooltip + " " + sInnerToolTip;
				}
				if (sCntTooltip && sCntTooltip.trim().length !== 0) {
					if (this._getFooterText().trim() !== 0) {
						sCntTooltip = sCntTooltip + "\n" + this._getFooterText();
					}
					// if tile tooltip exists concatenate tile tooltip
					// and content tooltip with a newline
					sTileToolTip.trim().length !== 0 ?
						thisRef.attr("title", sTileToolTip + "\n" + sCntTooltip) :
						thisRef.attr("title",  sCntTooltip);
				}

			// removing all inner elements tooltip om every mouse enter
			aTooltipEments.removeAttr("title").off("mouseenter");
		}
	};

	/* --- Getters and Setters --- */

	/**
	 * Returns the ContentType
	 * @private
	 * @returns {String} The ContentType text
	 */
	TileContent.prototype._getContentType = function() {
		if (this.getContent()) {
			var sContentType = this.getContent().getMetadata().getName();
			if (sContentType === "sap.m.NewsContent" || sContentType === "sap.suite.ui.commons.NewsContent") {
				return "News";
			}
		}
	};

	/**
	 * Returns the Footer text
	 * @private
	 * @returns {String} The Footer text
	 */
	TileContent.prototype._getFooterText = function() {
		var resourceBundle = sap.ui.getCore().getLibraryResourceBundle('sap.m');
		var sFooter = this.getFooter();
		var sUnit = this.getUnit();
		if (sUnit) {
			if (sFooter) {
				if (sap.ui.getCore().getConfiguration().getRTL()) {
					return resourceBundle.getText('TILECONTENT_FOOTER_TEXT', [sFooter, sUnit]);
				} else {
					return resourceBundle.getText('TILECONTENT_FOOTER_TEXT', [sUnit, sFooter]);
				}
			} else {
				return sUnit;
			}
		} else {
			return sFooter;
		}
	};

	/**
	 * Returns the Alttext
	 *
	 * @returns {String} The AltText text
	 */
	TileContent.prototype.getAltText = function() {
		var sAltText = "";
		var bIsFirst = true;
		var oContent = this.getContent();

		if (oContent) {
			if (oContent.getAltText) {
				sAltText += oContent.getAltText();
				bIsFirst = false;
			} else if (oContent.getTooltip_AsString()) {
				sAltText += oContent.getTooltip_AsString();
				bIsFirst = false;
			}
		}
		if (this.getUnit()) {
			sAltText += (bIsFirst ? "" : "\n") + this.getUnit();
			bIsFirst = false;
		}

		if (this.getFooter()) {
			sAltText += (bIsFirst ? "" : "\n") + this.getFooter();
		}
		return sAltText;
	};

	TileContent.prototype.getTooltip_AsString = function() { //eslint-disable-line
		var sTooltip = this.getTooltip();
		var sAltText = "";
		if (typeof sTooltip === "string" || sTooltip instanceof String) {
			return sTooltip;
		}
		sAltText = this.getAltText();
		return sAltText ? sAltText : "";
	};

	/**
	 * Setter for protected property to enable or disable footer rendering. This function does not invalidate the control.
	 * @param {boolean} value Determines whether the control's footer is rendered or not
	 * @returns {this} this to allow method chaining
	 * @protected
	 */
	TileContent.prototype.setRenderFooter = function(value) {
		this._bRenderFooter = value;
		return this;
	};

	/**
	 * Setter for protected property to enable or disable content rendering. This function does not invalidate the control.
	 * @param {boolean} value Determines whether the control's content is rendered or not
	 * @returns {this} this To allow method chaining
	 * @protected
	 */
	TileContent.prototype.setRenderContent = function(value) {
		this._bRenderContent = value;
		return this;
	};

	/**
	 * Returns priority text from resource bundle
	 * @param {string} sPriority The priority value
	 * @returns {string} The priority text
	 * @private
	 */
	TileContent.prototype._getPriorityText = function(sPriority) {
		var oResourceBundle = sap.ui.getCore().getLibraryResourceBundle('sap.m');
		return oResourceBundle.getText('ACTION_PRIORITY_' + sPriority.toUpperCase());
	};

	return TileContent;
});
