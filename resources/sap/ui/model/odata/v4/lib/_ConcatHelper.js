/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper"],function(e){"use strict";return{enhanceCache:function(t,n,s,i){var u;t.getResourcePathWithQuery=function(t,s){var a=e.buildApply(n,Object.assign({},this.mQueryOptions,{$skip:t,$top:s-t}),1,u,i);u=true;return this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,a,false,true)};t.handleResponse=function(e,t,n,i){s.forEach(function(e){var t;if(e){t=n.value.shift();if("UI5__count"in t){n["@odata.count"]=t.UI5__count}e(t)}});delete this.handleResponse;this.handleResponse(e,t,n,i)}}}},false);