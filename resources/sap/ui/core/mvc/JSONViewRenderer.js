/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ViewRenderer","sap/ui/core/Control"],function(e,t){"use strict";var i={apiVersion:2};i.render=function(t,i){t.openStart("div",i);t.class("sapUiView");t.class("sapUiJSONView");e.addDisplayClass(t,i);t.style("width",i.getWidth());t.style("height",i.getHeight());t.openEnd();i.getContent().forEach(t.renderControl,t);t.close("div")};return i},true);