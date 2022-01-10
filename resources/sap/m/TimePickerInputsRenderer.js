/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(t){"use strict";var e={apiVersion:2};e.render=function(t,e){var r=e.getAggregation("_inputs"),i=e.getAggregation("_buttonAmPm"),n=e._getTimeSeparators(e._getDisplayFormatPattern()),a,o;if(r){if(i){r.push(i)}t.openStart("div",e);t.class("sapMTPInputsContainer");t.attr("role","application");t.attr("aria-roledescription",e._getAriaRoleDescription());t.openEnd();for(o=0;o<r.length;o++){t.renderControl(r[o]);if(o<r.length-1){a=n.shift();if(!a){a=" "}t.openStart("span");t.attr("aria-hidden","true");t.openEnd();t.text(a);t.close("span")}}t.close("div")}};return e},true);