/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){e.openStart("div",t).class("sapUiLayoutCSSGrid");if(t.getWidth()){e.style("width",t.getWidth())}t.getGridLayoutConfiguration().renderSingleGridLayout(e);e.openEnd();t.getItems().forEach(e.renderControl,e);e.close("div")};return e});