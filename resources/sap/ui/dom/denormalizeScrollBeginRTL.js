/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/util/_FeatureDetection"],function(i,e){"use strict";var t;if(e.initialScrollPositionIsZero()){if(e.canScrollToNegative()){t=function(i,e){return-i}}else{t=function(i,e){return i}}}else{t=function(i,e){return e.scrollWidth-e.clientWidth-i}}var n=function(i,e){if(e){return t(i,e)}};return n});