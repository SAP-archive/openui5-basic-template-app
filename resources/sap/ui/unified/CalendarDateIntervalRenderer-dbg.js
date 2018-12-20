/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['sap/ui/core/Renderer', './CalendarRenderer'],
	function(Renderer, CalendarRenderer) {
	"use strict";


	/**
	 * CalendarDateInterval renderer.
	 * @namespace
	 */
	var CalendarDateIntervalRenderer = Renderer.extend(CalendarRenderer);

	CalendarDateIntervalRenderer.renderCalContentOverlay = function() {
	// we don't need the ContentOverlay in CalendarDateInterval case
	};

	CalendarDateIntervalRenderer.renderCalContentAndArrowsOverlay = function(oRm, oCal, sId) {

		if (oCal.getPickerPopup()) {
			oRm.write("<div id=\"" + sId + "-contentOver\" class=\"sapUiCalContentOver\" style=\"display:none;\"></div>");
		}

	};

	CalendarDateIntervalRenderer.addAttributes = function(oRm, oCal) {

		oRm.addClass("sapUiCalInt");
		oRm.addClass("sapUiCalDateInt");
		var iDays = oCal._getDays();

		if (iDays > oCal._getDaysLarge()) {
			oRm.addClass("sapUiCalIntLarge");
		}

		if (iDays > oCal._iDaysMonthHead) {
			oRm.addClass("sapUiCalIntHead");
		}

	};

	return CalendarDateIntervalRenderer;

}, /* bExport= */ true);
