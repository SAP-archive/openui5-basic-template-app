/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,n){var r=n.getTooltip_AsString();e.openStart("div",n);if(r){e.attr("title",r)}e.class("sapUiUfdCurrency");if(n._bRenderNoValClass){e.class("sapUiUfdCurrencyNoVal")}e.openEnd();e.openStart("div");e.class("sapUiUfdCurrencyAlign");e.openEnd();e.openStart("span");e.attr("dir","ltr");e.class("sapUiUfdCurrencyValue");e.openEnd();e.text(n.getFormattedValue());e.close("span");e.openStart("span");e.class("sapUiUfdCurrencyCurrency");e.openEnd();e.text(n._getCurrency());e.close("span");e.close("div");e.close("div")};return e},true);