/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/util/_FeatureDetection"],function(i,t){"use strict";var e;if(t.initialScrollPositionIsZero()){if(t.canScrollToNegative()){e=function(i,t){return t.clientWidth+i-t.scrollWidth}}else{e=function(i,t){return t.scrollWidth-t.clientWidth-i}}}else{e=function(i,t){return i}}var n=function(i,t){if(t){return e(i,t)}};return n});