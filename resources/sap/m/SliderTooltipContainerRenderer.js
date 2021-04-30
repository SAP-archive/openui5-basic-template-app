/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(e){"use strict";var t={apiVersion:2},n={MAIN_CLASS:"sapMSliderTooltipContainer"};t.render=function(e,t){var i=t.getAssociatedTooltipsAsControls();e.openStart("div",t).style("width",t.getWidth()).openEnd();e.openStart("div",t.getId()+"-container").style("left","0%").style("right","0%").class(n.MAIN_CLASS);if(!t.getEnabled()){e.class(n.MAIN_CLASS+"Disabled")}e.openEnd();if(i&&i.length){i.forEach(function(t){e.renderControl(t)})}e.close("div").close("div")};return t},true);