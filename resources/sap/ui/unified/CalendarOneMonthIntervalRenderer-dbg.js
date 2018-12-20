/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['sap/ui/core/Renderer', './CalendarDateIntervalRenderer'],
	function(Renderer, CalendarDateIntervalRenderer) {
	"use strict";


	/**
	 * CalendarOneMonthInterval renderer.
	 * @namespace
	 */
	var CalendarOneMonthIntervalRenderer = Renderer.extend(CalendarDateIntervalRenderer);

	CalendarOneMonthIntervalRenderer.addAttributes = function(oRm, oCal) {

		CalendarDateIntervalRenderer.addAttributes.apply(this, arguments);
		oRm.addClass("sapUiCalOneMonthInt");
	};

	return CalendarOneMonthIntervalRenderer;

}, /* bExport= */ true);
