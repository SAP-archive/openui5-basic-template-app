/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){var i=e.getSubheader();var r=e.getTooltip_AsString();if(typeof r!=="string"){r=""}t.write("<div");t.writeControlData(e);t.writeAttribute("id",e.getId()+"-news-content");t.writeAttribute("role","presentation");t.writeAttributeEscaped("aria-label",r);t.addClass("sapMNwC");if(e.hasListeners("press")){t.addClass("sapMPointer");t.writeAttribute("tabindex","0")}t.writeClasses();t.write(">");t.write("<div");t.addClass("sapMNwCCTxt");t.writeClasses();t.write(">");t.renderControl(e._oContentText);t.write("</div>");t.write("<div");t.writeAttribute("id",e.getId()+"-subheader");t.addClass("sapMNwCSbh");t.writeClasses();t.write(">");t.writeEscaped(i);t.write("</div>");t.write("</div>")};return t},true);