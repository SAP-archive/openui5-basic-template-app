/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

//Provides class sap.ui.model.odata.v4.lib._ConcatHelper
sap.ui.define([
	"./_AggregationHelper"
], function (_AggregationHelper) {
	"use strict";

	return {
		/**
		 * Enhances the given cache, so that additional rows are requested together with the first
		 * request using "concat"; this means that $count needs to be requested as "UI5__count"
		 * instead, in a separate row. Subsequent requests remain unchanged.
		 *
		 * @param {sap.ui.model.odata.v4.lib._CollectionCache} oCache
		 *   The cache to be enhanced
		 * @param {object} oAggregation
		 *   An object holding the information needed for data aggregation; see also
		 *   <a href="http://docs.oasis-open.org/odata/odata-data-aggregation-ext/v4.0/">OData
		 *   Extension for Data Aggregation Version 4.0</a>; must already be normalized by
		 *   {@link _AggregationHelper.buildApply}
		 * @param {function[]} [aAdditionalRowHandlers]
		 *   Handlers for the additional response rows (which are automatically scanned for
		 *   "UI5__count"); if a handler is missing, the corresponding row is assumed to be missing
		 *   as well
		 * @param {object} [mAlias2MeasureAndMethod]
		 *   A map which is filled by {@link _AggregationHelper.buildApply} in case an aggregatable
		 *   property requests minimum or maximum values.
		 */
		enhanceCache : function (oCache, oAggregation, aAdditionalRowHandlers,
				mAlias2MeasureAndMethod) {
			var bFollowUp;

			/**
			 * Returns the resource path including the query string with "$apply" which includes the
			 * aggregation functions for additional rows and thus uses "skip()/top()" as
			 * transformations. Follow-up requests do not aggregate these additional rows again.
			 *
			 * This function is used to replace <code>getResourcePathWithQuery</code> of the first
			 * level cache and needs to be called on the first level cache.
			 *
			 * @param {number} iStart
			 *   The start index of the range
			 * @param {number} iEnd
			 *   The index after the last element
			 * @returns {string}
			 *   The resource path including the query string
			 */
			// @override sap.ui.model.odata.v4.lib._CollectionCache#getResourcePathWithQuery
			oCache.getResourcePathWithQuery = function (iStart, iEnd) {
				// Note: ignore existing mQueryOptions.$apply, e.g. from ODLB#updateAnalyticalInfo
				var mQueryOptionsWithApply = _AggregationHelper.buildApply(oAggregation,
						Object.assign({}, this.mQueryOptions, {
							$skip : iStart,
							$top : iEnd - iStart
						}), 1, bFollowUp, mAlias2MeasureAndMethod);

				bFollowUp = true; // next request is a follow-up

				return this.sResourcePath + this.oRequestor.buildQueryString(this.sMetaPath,
					mQueryOptionsWithApply, false, true);
			};

			/**
			 * Handles a GET response wich contains additional rows.
			 *
			 * @param {number} iStart
			 *   The index of the first element to request ($skip)
			 * @param {number} iEnd
			 *   The index after the last element to request ($skip + $top)
			 * @param {object} oResult
			 *   The result of the GET request
			 * @param {object} mTypeForMetaPath
			 *   A map from meta path to the entity type (as delivered by {@link #fetchTypes})
			 */
			// @override sap.ui.model.odata.v4.lib._CollectionCache#handleResponse
			oCache.handleResponse = function (iStart, iEnd, oResult, mTypeForMetaPath) {
				aAdditionalRowHandlers.forEach(function (fnHandler) {
					var oAdditionalRow;

					if (fnHandler) {
						oAdditionalRow = oResult.value.shift();
						if ("UI5__count" in oAdditionalRow) {
							oResult["@odata.count"] = oAdditionalRow.UI5__count;
						}
						fnHandler(oAdditionalRow);
					}
				});

				// revert to prototype and call it
				delete this.handleResponse;
				this.handleResponse(iStart, iEnd, oResult, mTypeForMetaPath);
			};
		}
	};
}, /* bExport= */false);
