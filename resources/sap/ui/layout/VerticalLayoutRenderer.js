/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){var r=t;r.write("<DIV");r.writeControlData(e);r.addClass("sapUiVlt");r.addClass("sapuiVlt");if(e.getWidth()&&e.getWidth()!=""){r.addStyle("width",e.getWidth())}r.writeStyles();r.writeClasses();r.write(">");var i=e.getContent();for(var a=0;a<i.length;a++){r.write('<DIV class="sapUiVltCell sapuiVltCell">');r.renderControl(i[a]);r.write("</DIV>")}r.write("</DIV>")};return t},true);