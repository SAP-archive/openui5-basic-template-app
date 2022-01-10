/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dom/denormalizeScrollLeftRTL","sap/ui/util/_FeatureDetection","sap/ui/thirdparty/jquery"],function(t,e,i){"use strict";var r;if(e.initialScrollPositionIsZero()){r=function(t){return t.scrollWidth+t.scrollLeft-t.clientWidth}}else{r=function(t){return t.scrollLeft}}var n=function(e){var i=this.get(0);if(i){if(e===undefined){return r(i)}else{i.scrollLeft=t(e,i);return this}}};i.fn.scrollLeftRTL=n;return i});