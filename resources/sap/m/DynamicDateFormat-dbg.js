/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.m.DynamicDateFormat
sap.ui.define([
	'sap/ui/core/format/DateFormat',
	'sap/ui/core/format/NumberFormat',
	'sap/ui/core/Locale',
	'sap/ui/core/LocaleData',
	'./StandardDynamicDateRangeKeys',
	"sap/base/Log",
	"sap/base/util/deepExtend",
	"sap/base/util/isEmptyObject",
	"sap/ui/core/date/UniversalDateUtils"
],
	function(DateFormat, NumberFormat, Locale, LocaleData, StandardDynamicDateRangeKeys, Log, deepExtend, isEmptyObject, UniversalDateUtils) {
		"use strict";

		/**
		 * Constructor for DynamicDateFormat - must not be used: To get a DynamicDateFormat instance, please use <code>DynamicDateFormat.getInstance()</code>.
		 *
		 * @class
		 * The DynamicDateFormat is a static class for formatting and parsing an array of strings in a locale-sensitive manner according
		 * to a set of format options.
		 *
		 * @public
		 * @hideconstructor
		 * @alias sap.m.DynamicDateFormat
		 * @experimental Since 1.92. This class is experimental and provides only limited functionality. Also the API might be changed in future.
		 */
		var DynamicDateFormat = function() {
			// Do not use the constructor
			throw new Error();
		};

		var _resourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");
		var _staticParts = {};
		var _dynamicParameterIndexes = {};
		var aParameterTypesByStandardOptionKey = {
			"DATE": ["date"],
			"DATERANGE": ["date", "date"],
			"LASTDAYS": ["int"],
			"LASTWEEKS": ["int"],
			"LASTMONTHS": ["int"],
			"LASTQUARTERS": ["int"],
			"LASTYEARS": ["int"],
			"NEXTDAYS": ["int"],
			"NEXTWEEKS": ["int"],
			"NEXTMONTHS": ["int"],
			"NEXTQUARTERS": ["int"],
			"NEXTYEARS": ["int"],
			"FROM": ["date"],
			"TO": ["date"],
			"SPECIFICMONTH": ["month"],
			"TODAYFROMTO": ["int", "int"]
		};

		for (var i = 0; i < StandardDynamicDateRangeKeys.length; i++) {
			var sKey = StandardDynamicDateRangeKeys[i];
			var sPattern = _resourceBundle.getText("DYNAMIC_DATE_" + sKey.toUpperCase() + "_FORMAT");
			var aStaticParts = sPattern.split('{').map(function(sPart) {
				var iClosingBracket = sPart.indexOf('}');

				if (iClosingBracket !== -1) {
					return sPart.slice(iClosingBracket + 1);
				}

				return sPart;
			});

			_staticParts[sKey] = aStaticParts;

			// indexes of dynamic parts in order of appearance
			var aParams = [];

			var iParamStart = sPattern.indexOf('{');
			var iParamEnd = -1;
			var iParamIndex = -1;

			while (iParamStart !== -1) {
				iParamEnd = sPattern.indexOf('}');
				iParamIndex = parseInt(sPattern.slice(iParamStart + 1, iParamEnd - iParamEnd - 1));

				aParams.push(iParamIndex);

				sPattern = sPattern.slice(iParamEnd + 1);
				iParamStart = sPattern.indexOf('{');
			}

			_dynamicParameterIndexes[sKey] = aParams;
		}

		/**
		 * Get an instance of the DynamicDateFormat which can be used for formatting.
		 *
		 * @param {object} [oFormatOptions] Object which defines the format options
		 * @param {sap.ui.core.Locale} [oLocale] Locale to get the formatter for
		 * @return {sap.m.DynamicDateFormat} Instance of the DynamicDateFormat
		 * @public
		 *
		 */
		DynamicDateFormat.getInstance = function(oFormatOptions, oLocale) {
			return this.createInstance(oFormatOptions, oLocale);
		};

		DynamicDateFormat.oDefaultDynamicDateFormat = {
			"date": {},
			"month": { pattern: "MMMM" },
			"int": {}
		};

		/**
		 * Create an instance of the DynamicDateFormat.
		 *
		 * @param {object} [oFormatOptions] Object which defines the format options
		 * @param {{sap.ui.core.Locale}} [oLocale] Locale to get the formatter for
		 * @return {sap.m.DynamicDateFormat} Instance of the DynamicDateFormat
		 * @private
		 */
		DynamicDateFormat.createInstance = function(oFormatOptions, oLocale) {
			var oFormat = Object.create(this.prototype);

			if (oFormatOptions instanceof Locale) {
				oLocale = oFormatOptions;
				oFormatOptions = undefined;
			}

			if (!oLocale) {
				oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
			}
			oFormat.oLocale = oLocale;
			oFormat.oLocaleData = LocaleData.getInstance(oLocale);
			oFormat.oOriginalFormatOptions = deepExtend({}, DynamicDateFormat.oDefaultDynamicDateFormat, oFormatOptions);
			oFormat._dateFormatter = DateFormat.getInstance(oFormat.oOriginalFormatOptions["date"]);
			// hack the date formatter not to parse relative
			// dates like: "next month", "next quarter", "previous week"
			[oFormat._dateFormatter].concat(oFormat._dateFormatter.aFallbackFormats).forEach(function(f) {
				f.parseRelative = function() {
					return null;
				};
			});

			oFormat._monthFormatter = DateFormat.getInstance(oFormat.oOriginalFormatOptions["month"]);
			oFormat._numberFormatter = NumberFormat.getInstance(oFormat.oOriginalFormatOptions["int"]);
			oFormat._resourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");

			return oFormat;
		};

		/**
		 * Formats a list according to the given format options.
		 *
		 * @param {object} oObj The value to format
		 * @return {string} The formatted output value.
		 * @public
		 */
		DynamicDateFormat.prototype.format = function(oObj) {
			var sKey = oObj.operator;
			var aParams = oObj.values.slice(0);

			if (sKey === "SPECIFICMONTH") {
				var oDate = new Date();
				oDate.setMonth(aParams[0]);
				aParams[0] = this._monthFormatter.format(oDate);
			} else if (sKey === "LASTDAYS" && aParams[0] === 1) {
				sKey = "YESTERDAY";
				aParams = [];
			} else if (sKey === "NEXTDAYS" && aParams[0] === 1) {
				sKey = "TOMORROW";
				aParams = [];
			} else if ((sKey === "LASTDAYS" || sKey === "NEXTDAYS") && aParams[0] === 0) {
				sKey = "TODAY";
				aParams = [];
			}

			var aFormattedParams = aParams.map(function(param) {
				if (param instanceof Date) {
					return this._dateFormatter.format(param);
				}

				if (typeof (param) === "number") {
					return this._numberFormatter.format(param);
				} else {
					return param.toString();
				}
			}, this);

			return this._resourceBundle.getText("DYNAMIC_DATE_" + sKey.toUpperCase() + "_FORMAT", aFormattedParams);
		};

		/**
		 * Parses a given list string into an array.
		 *
		 * @param {string} sValue String value to be parsed
		 * @return {object} The parsed output value
		 * @public
		 */
		DynamicDateFormat.prototype.parse = function(sValue, sKey) {
			var aResult;
			var aStaticParts = _staticParts[sKey];

			var sRegexPattern = "^" + aStaticParts.join("(.*)") + "$";

			if (sKey === "TODAYFROMTO") {
				sRegexPattern = sRegexPattern.replace("+", "\\+");
			}

			var rRegex = new RegExp(sRegexPattern, "i");
			var match = sValue.match(rRegex);

			if (match) {
				aResult = {};
				aResult.values = [];

				for (var j = 0; j < _dynamicParameterIndexes[sKey].length; j++) {
					var iIndex = _dynamicParameterIndexes[sKey][j];

					var sType = aParameterTypesByStandardOptionKey[sKey][iIndex];
					var oVal;
					var sCurrentMatch = match[j + 1];

					switch (sType) {
						case "date":
							oVal = this._dateFormatter.parse(sCurrentMatch);
							break;
						case "month":
							var aMonthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function(i) {
								var oDate = new Date();
								oDate.setMonth(i);
								return this._monthFormatter.format(oDate);
							}, this);
							var iMatchIndex = aMonthNames.indexOf(sCurrentMatch);
							oVal = iMatchIndex !== -1 ? iMatchIndex : null;
							break;
						case "int":
							oVal = this._numberFormatter.parse(sCurrentMatch);
							break;
						case "string":
							oVal = sCurrentMatch;
							break;
						default:
							break;
					}

					if (!oVal) {
						aResult = null;
						break;
					}

					aResult.values[iIndex] = oVal;
				}

				if (aResult) {
					aResult.operator = sKey;
					return aResult;
				}
			}
		};

		return DynamicDateFormat;
	});