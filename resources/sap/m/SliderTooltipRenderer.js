/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/Core"],function(e,t){"use strict";var i={apiVersion:2};i.CSS_CLASS="sapMSliderTooltip";i.render=function(e,t){e.openStart("div",t).class(i.CSS_CLASS);if(!t.getEditable()){e.class(i.CSS_CLASS+"NonEditableWrapper")}if(t.getWidth()){e.style("width",t.getWidth())}e.openEnd();this.renderTooltipElement(e,t);e.close("div")};i.renderTooltipElement=function(e,a){var r=t.getLibraryResourceBundle("sap.m");e.voidStart("input",a.getId()+"-input").class(i.CSS_CLASS+"Input");if(!a.getEditable()){e.class(i.CSS_CLASS+"NonEditable")}e.attr("aria-label",r.getText("SLIDER_INPUT_LABEL"));e.accessibilityState(a).attr("tabindex","-1").attr("value",a.getValue()).attr("type","number").attr("step",a.getStep()).voidEnd()};return i},true);