/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["sap/m/library", "sap/base/security/encodeCSS", "sap/ui/thirdparty/jquery"],
	function(library, encodeCSS, jQuery) {
	"use strict";

	// shortcut for sap.m.GenericTileScope
	var GenericTileScope = library.GenericTileScope;

	// shortcut for sap.m.LoadState
	var LoadState = library.LoadState;

	var oRb = sap.ui.getCore().getLibraryResourceBundle("sap.m");

	/**
	 * GenericTileLineMode renderer.
	 * @namespace
	 */
	var GenericTileLineModeRenderer = {
		apiVersion: 2    // enable in-place DOM patching
	};

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the Render-Output-Buffer
	 * @param {sap.m.GenericTile} oControl the control to be rendered
	 */
	GenericTileLineModeRenderer.render = function(oRm, oControl) {
		var sTooltipText = oControl._getTooltipText(),
			bIsScreenLarge = oControl._isScreenLarge(),
			sAriaText = oControl._getAriaText(),
			sScope = oControl.getScope(),
			sScopeClass,
			bIsSingleAction = false,
			bHasPress = oControl.hasListeners("press"),
			sState = oControl.getState(),
			sAriaRoleDescription = oControl.getAriaRoleDescription(),
			sAriaRole = oControl.getAriaRole();

		// Render a link when URL is provided, not in action scope and the state is enabled
		var bRenderLink = oControl.getUrl() && !oControl._isInActionScope() && sState !== LoadState.Disabled;

		this._bRTL = sap.ui.getCore().getConfiguration().getRTL();

		if (sScope === GenericTileScope.Actions) {
			sScopeClass = encodeCSS("sapMGTScopeActions");
		} else if (sScope === GenericTileScope.ActionMore || sScope === GenericTileScope.ActionRemove) {
			bIsSingleAction = true;
			sScopeClass = encodeCSS("sapMGTScopeSingleAction");
		} else {
			sScopeClass = encodeCSS("sapMGTScopeDisplay");
		}

		if (bRenderLink) {
			oRm.openStart("a", oControl);
			oRm.attr("href", oControl.getUrl());
			oRm.attr("rel", "noopener noreferrer");
			oRm.attr("draggable", "false"); // <a> elements are draggable per default, use UI5 DnD instead
		} else {
			oRm.openStart("span", oControl);
		}
		oRm.attr("aria-label", sAriaText);
		if (sAriaRoleDescription) {
			oRm.attr("aria-roledescription", sAriaRoleDescription );
		} else {
			oRm.attr("aria-roledescription", oRb.getText("GENERIC_TILE_ROLE_DESCRIPTION"));
		}
		if (sAriaRole) {
			oRm.attr("role", sAriaRole);
		} else if (!bRenderLink) { // buttons only; <a> elements always have the default role
			oRm.attr("role", bHasPress ? "button" : "presentation");
		} else {
			oRm.attr("role", "link");
		}
		oRm.class("sapMGT");
		oRm.class(sScopeClass);
		oRm.class("sapMGTLineMode");
		this._writeDirection(oRm);
		if (sTooltipText) {
			oRm.attr("title", sTooltipText);
		}

		if (sState !== LoadState.Disabled) {
			if (!oControl.isInActionRemoveScope()) {
				oRm.class("sapMPointer");
			}
			oRm.attr("tabindex", "0");
		} else {
			oRm.class("sapMGTDisabled");
		}
		if (sState === LoadState.Failed) {
			oRm.class("sapMGTFailed");
		}
		// oRm.writeClasses();
		oRm.openEnd();

		if (bIsScreenLarge) {
			//large
			oRm.openStart("div", oControl.getId() + "-startMarker");
			oRm.class("sapMGTStartMarker");
			oRm.openEnd();
			oRm.close("div");

			this._renderFailedIcon(oRm, oControl);
			this._renderHeader(oRm, oControl);
			if (oControl.getSubheader()) {
				this._renderSubheader(oRm, oControl);
			}

			oRm.openStart("div", oControl.getId() + "-endMarker");
			oRm.class("sapMGTEndMarker");
			oRm.openEnd();

			if (oControl._isInActionScope()) {
				this._renderActionsScope(oRm, oControl, bIsSingleAction);
			}

			oRm.close("div");

			//hover and press style helper
			oRm.openStart("div", oControl.getId() + "-styleHelper");
			oRm.class("sapMGTStyleHelper");
			oRm.openEnd();
			oRm.close("div");

		} else {
			// small
			if (oControl.getState() !== LoadState.Disabled) {
				this._renderFocusDiv(oRm, oControl);
			}

			oRm.openStart("div", oControl.getId() + "-touchArea");
			oRm.class("sapMGTTouchArea");
			oRm.openEnd();

			this._renderFailedIcon(oRm, oControl);

			oRm.openStart("span",oControl.getId() + "-lineModeHelpContainer");
			oRm.class("sapMGTLineModeHelpContainer");
			oRm.openEnd();

			this._renderHeader(oRm, oControl);

			if (oControl.getSubheader()) {
				this._renderSubheader(oRm, oControl);
			}
			oRm.close("span"); //.sapMGTLineModeHelpContainer

			if (oControl._isInActionScope()) {
				this._renderActionsScope(oRm, oControl, bIsSingleAction);
			}

			oRm.close("div"); //.sapMGTTouchArea
		}

		if (bRenderLink) {
			oRm.close("a");
		} else {
			oRm.close("span"); //.sapMGT
		}
	};

	GenericTileLineModeRenderer._writeDirection = function(oRm) {
		if (this._bRTL) {
			oRm.attr("dir", "rtl");
		}
	};

	GenericTileLineModeRenderer._renderFailedIcon = function(oRm, oControl) {
		if (oControl.getState() === LoadState.Failed) {
			if (oControl._isCompact()) {
				oControl._oWarningIcon.setSize("1.25rem");
			} else {
				oControl._oWarningIcon.setSize("1.375rem");
			}
			oRm.renderControl(oControl._oWarningIcon.addStyleClass("sapMGTLineModeFailedIcon"));
		}
	};

	GenericTileLineModeRenderer._renderHeader = function(oRm, oControl) {
		oRm.openStart("span",  oControl.getId() + "-hdr-text");
		this._writeDirection(oRm);
		oRm.class("sapMGTHdrTxt");
		oRm.openEnd();
		oRm.text(oControl._oTitle.getText());
		oRm.close("span");
	};

	GenericTileLineModeRenderer._renderSubheader = function(oRm, oControl) {
		oRm.openStart("span",oControl.getId() + "-subHdr-text");
		this._writeDirection(oRm);
		oRm.class("sapMGTSubHdrTxt");
		oRm.openEnd();
		oRm.text(oControl._oSubTitle.getText());
		oRm.close("span");
	};

	GenericTileLineModeRenderer._renderActionsScope = function(oRm, oControl, bIsSingleAction) {
		if (oControl.getState() !== LoadState.Disabled) {
			oRm.openStart("span", oControl.getId() + "-actions");
			oRm.class("sapMGTActionsContainer");

			if (bIsSingleAction) {
				oRm.class("sapMGTScopeSingleActionContainer");
			}

			oRm.openEnd();

			oRm.renderControl(oControl._oMoreIcon);
			oRm.renderControl(oControl._oRemoveButton);

			oRm.close("span");
		}
	};

	/**
	 * Removes and re-calculates the style helpers used in compact mode for hover and focus display.
	 *
	 * @private
	 */
	GenericTileLineModeRenderer._updateHoverStyle = function() {
		var $StyleHelper = this.$("styleHelper"),
			oLine,
			i = 0,
			sHelpers = "";

		//empty the style helper even if there is no style data available in order to guarantee a clean display without artifacts
		$StyleHelper.empty();

		if (!this._oStyleData || this.$().is(":hidden")) {
			return;
		}

		if (this._oStyleData.rtl) {
			$StyleHelper.css("right", -this._oStyleData.positionRight);
		} else {
			$StyleHelper.css("left", -this._oStyleData.positionLeft);
		}

		for (i; i < this._oStyleData.lines.length; i++) {
			oLine = this._oStyleData.lines[i];

			var $Rect = jQuery("<div class='sapMGTLineStyleHelper'><div class='sapMGTLineStyleHelperInner'></div></div>");
			if (this._oStyleData.rtl) {
				$Rect.css("right", oLine.offset.x + "px");
			} else {
				$Rect.css("left", oLine.offset.x + "px");
			}
			$Rect.css({
				top: oLine.offset.y + "px",
				width: oLine.width + "px",
				height: oLine.height
			});

			sHelpers += $Rect.get(0).outerHTML.trim();
		}

		$StyleHelper.html(sHelpers);
	};

	/**
	 * Renders a helper used in cozy mode for focus display.
	 *
	 * @private
	 */
	GenericTileLineModeRenderer._renderFocusDiv = function(oRm, oControl) {
		oRm.openStart("div", oControl.getId() + "-focus");
		oRm.class("sapMGTFocusDiv");
		oRm.openEnd();
		oRm.close("div");
	};

	/**
	 * Calculates the given property of the passed tile. If the property is retrieved in pixels, it is directly returned.
	 * If the property is given as rem, it is converted to pixels.
	 *
	 * @param {sap.m.GenericTile|jQuery} obj The object the CSS property is to be retrieved of.
	 * @param {string} property The CSS property to be read and converted.
	 * @returns {float} The property value in pixels.
	 * @private
	 */
	GenericTileLineModeRenderer._getCSSPixelValue = function(obj, property) {
		var $Obj = obj instanceof jQuery ? obj : obj.$(),
			aMatch = ($Obj.css(property) || "").match(/([^a-zA-Z\%]*)(.*)/),
			fValue = parseFloat(aMatch[1]),
			sUnit = aMatch[2];
		return (sUnit === "px") ? fValue : fValue * 16;
	};

	return GenericTileLineModeRenderer;

}, /* bExport= */true);
