/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/dom/denormalizeScrollLeftRTL","sap/ui/util/_FeatureDetection","sap/ui/thirdparty/jquery"],function(e,t,i,r){"use strict";var l;if(i.initialScrollPositionIsZero()){if(i.canScrollToNegative()){l=function(e){return e.scrollWidth+e.scrollLeft-e.clientWidth}}else{l=function(e){return e.scrollWidth-e.scrollLeft-e.clientWidth}}}else{l=function(e){return e.scrollLeft}}var n=function(e){var i=this.get(0);if(i){if(e===undefined){return l(i)}else{i.scrollLeft=t(e,i);return this}}};r.fn.scrollLeftRTL=n;return r});