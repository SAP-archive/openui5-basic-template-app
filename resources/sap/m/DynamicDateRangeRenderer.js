/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/InputBaseRenderer","sap/ui/core/Renderer"],function(e,n){"use strict";var r={apiVersion:2};r.render=function(e,n){e.openStart("div",n);e.class("sapMDynamicDateRange");e.openEnd();e.renderControl(n._oInput);e.close("div")};return r});