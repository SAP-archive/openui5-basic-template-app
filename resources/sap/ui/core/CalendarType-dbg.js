/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides type sap.ui.core.CalendarType.
sap.ui.define([], function() {
	"use strict";

	/**
	 * The types of <code>Calendar</code>.
	 *
	 * @enum {string}
	 * @alias sap.ui.core.CalendarType
	 * @public
	 * @ui5-metamodel This simple type also will be described in the UI5 (legacy) designtime metamodel
	 */
	var CalendarType = {

		/**
		 * The Gregorian calendar
		 * @public
		 */
		Gregorian: "Gregorian",

		/**
		 * The Islamic calendar
		 * @public
		 */
		Islamic: "Islamic",

		/**
		 * The Japanese emperor calendar
		 * @public
		 */
		Japanese: "Japanese",

		/**
		 * The Persian Jalali calendar
		 * @public
		 */
		Persian: "Persian",

		/**
		 * The Thai buddhist calendar
		 * @public
		 */
		Buddhist: "Buddhist"
	};

	return CalendarType;

}, /* bExport= */ true);