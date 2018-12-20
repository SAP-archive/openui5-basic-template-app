/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){t.write("<div");t.writeControlData(e);t.addClass("sapMFT");t.writeClasses();if(e.getTooltip_AsString()){t.writeAttributeEscaped("title",e.getTooltip_AsString())}t.addStyle("width",e.getWidth()||null);t.addStyle("height",e.getHeight()||null);t.writeStyles();t.write(">");t.write(e._getDisplayHtml());t.write("</div>")};return t},true);