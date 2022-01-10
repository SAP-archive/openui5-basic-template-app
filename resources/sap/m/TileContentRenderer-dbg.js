/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["./library", "sap/base/security/encodeCSS", "sap/m/GenericTile", "sap/ui/core/library"],
	function(library, encodeCSS, GenericTile, Core) {
	"use strict";

	var GenericTileMode = library.GenericTileMode,
		FrameType = library.FrameType,
		Priority = Core.Priority;

	/**
	 * TileContent renderer.
	 * @namespace
	 */
	var TileContentRenderer = {
		apiVersion: 2    // enable in-place DOM patching
	};

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered
	 */
	TileContentRenderer.render = function(oRm, oControl) {

		var sTooltip = oControl.getTooltip_AsString();
		var sContentTypeClass = oControl._getContentType();
		if (sContentTypeClass) {
			sContentTypeClass = encodeCSS(sContentTypeClass);
		}
		var sFrameTypeClass = encodeCSS("sapMFrameType" + oControl.getFrameType());

		oRm.openStart("div", oControl);
		oRm.class("sapMTileCnt");
		oRm.class(sContentTypeClass);
		oRm.class(sFrameTypeClass);
		if (sTooltip.trim()) { // trim check needed since IE11 renders white spaces
			oRm.attr("title", sTooltip);
		}
		oRm.openEnd();
		this._renderContent(oRm, oControl);
		this._renderFooter(oRm, oControl);

		oRm.close("div");
	};

	/**
	 * Renders the HTML for the content of the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @private
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control whose content should be rendered
	 */
	TileContentRenderer._renderContent = function(oRm, oControl) {
		if (!oControl._bRenderContent) {
			return;
		}

		var oContent = oControl.getContent(),
			oPriority = oControl.getPriority(),
			oTile = oControl.getParent(),
			bIsActionMode = oTile instanceof GenericTile && oTile.getMode() === GenericTileMode.ActionMode && oTile.getFrameType() === FrameType.TwoByOne,
			bRenderPriority = bIsActionMode && oPriority && oPriority !== Priority.None;

		if (oContent) {
			if (bRenderPriority) {
				oRm.openStart("div", oControl.getId() + "-content-container");
				oRm.class("sapMTileContainer");
				oRm.openEnd();
				//Priority Container
				oRm.openStart("div", oControl.getId() + "-priority");
				oRm.class("sapMTilePriority");
				oRm.class(oPriority);
				oRm.openEnd();
				//Inner Container
				oRm.openStart("div", oControl.getId() + "-priority-content");
				oRm.class("sapMTilePriorityCnt");
				oRm.openEnd();
				//Border
				oRm.openStart("div", oControl.getId() + "-priority-border");
				oRm.class("sapMTilePriorityBorder");
				oRm.openEnd();
				oRm.close("div");
				//Value
				oRm.openStart("span", oControl.getId() + "-priority-value");
				oRm.class("sapMTilePriorityValue");
				oRm.openEnd();
				oRm.text(oControl._getPriorityText(oPriority));
				oRm.close("span");
				oRm.close("div");
				oRm.close("div");
			}

			oRm.openStart("div", oControl.getId() + "-content");
			oRm.class("sapMTileCntContent");
			oRm.openEnd();
			if (!oContent.hasStyleClass("sapMTcInnerMarker")) {
				oContent.addStyleClass("sapMTcInnerMarker");
			}
			oRm.renderControl(oContent);
			oRm.close("div");

			if (bRenderPriority) {
				oRm.close("div");
			}
		}
	};

	/**
	 * Renders the HTML for the footer of the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @private
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control whose footer should be rendered
	 */

	TileContentRenderer._renderFooter = function(oRm, oControl) {
		if (!oControl._bRenderFooter) {
			return;
		}

		var sColorClass = "sapMTileCntFooterTextColor" + oControl.getFooterColor(),
			sFooterTxt = oControl._getFooterText(oRm, oControl),
			oTile = oControl.getParent();

		if (oTile instanceof GenericTile && (oTile._isNavigateActionEnabled() || oTile._isActionMode())) {
			oRm.openStart("div", oTile.getId() + "-footer-container");
			oRm.class("sapMTileFtrCnt");
			oRm.openEnd();
		}

		// footer text div
		oRm.openStart("div", oControl.getId() + "-footer-text");
		oRm.class("sapMTileCntFtrTxt");
		oRm.class(encodeCSS(sColorClass));
		oRm.openEnd();
		oRm.text(sFooterTxt);
		oRm.close("div");

		if (oTile instanceof GenericTile && oTile._isActionMode()) {
			//Render Action Buttons, only in ActionMode and in TwoByOne frame type
			oRm.openStart("div", oTile.getId() + "-actionButtons");
			oRm.class("sapMGTActionModeContainer");
			oRm.openEnd();
			oTile.getActionButtons().forEach(function (oActionButton) {
				oRm.renderControl(oActionButton);
			});
			oRm.close("div");
			oRm.close("div");
		} else if (oTile instanceof GenericTile && oTile._isNavigateActionEnabled()) {
			oRm.openStart("div", oTile.getId() + "-navigateActionContainer");
			oRm.class("sapMTileNavContainer");
			oRm.openEnd();
			oRm.renderControl(oTile._getNavigateAction());
			oRm.close("div");
			oRm.close("div");
		}
	};

	return TileContentRenderer;
}, /* bExport= */ true);