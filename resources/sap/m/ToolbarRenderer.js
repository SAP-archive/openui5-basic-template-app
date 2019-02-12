/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BarInPageEnabler"],function(e){"use strict";var t={};t.render=e.prototype.render;t.decorateRootElement=function(e,t){var a;e.addClass("sapMTB");if(!t.getAriaLabelledBy().length){a=t.getTitleId()}e.writeAccessibilityState(t,{role:t._getAccessibilityRole(),labelledBy:a});e.addClass("sapMTBNewFlex");if(t.getActive()){e.addClass("sapMTBActive");e.writeAttribute("tabindex","0")}else{e.addClass("sapMTBInactive")}e.addClass("sapMTB"+t.getStyle());e.addClass("sapMTB-"+t.getActiveDesign()+"-CTX");var d=t.getWidth();var i=t.getHeight();d&&e.addStyle("width",d);i&&e.addStyle("height",i)};t.renderBarContent=function(t,a){a.getContent().forEach(function(d){e.addChildClassTo(d,a);t.renderControl(d)})};t.shouldAddIBarContext=function(e){return false};return t},true);