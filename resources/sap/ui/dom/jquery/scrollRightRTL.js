/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/util/_FeatureDetection","sap/ui/thirdparty/jquery"],function(t,i){"use strict";var r;if(t.initialScrollPositionIsZero()){r=function(t){return-t.scrollLeft}}else{r=function(t){return t.scrollWidth-t.scrollLeft-t.clientWidth}}var e=function(){var t=this.get(0);if(t){return r(t)}};i.fn.scrollRightRTL=e;return i});