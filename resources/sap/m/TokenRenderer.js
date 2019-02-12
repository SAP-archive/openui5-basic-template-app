/*!

* OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.

*/
sap.ui.define(["sap/ui/core/library","sap/ui/core/InvisibleText"],function(e,t){"use strict";var i=e.TextDirection;var r={};r.render=function(e,i){e.write('<div tabindex="-1"');e.writeControlData(i);e.addClass("sapMToken");e.writeAttribute("role","listitem");e.writeAttribute("aria-readonly",!i.getEditable());e.writeAttribute("aria-selected",i.getSelected());if(i.getSelected()){e.addClass("sapMTokenSelected")}if(!i.getEditable()){e.addClass("sapMTokenReadOnly")}e.writeClasses();var a=i.getTooltip_AsString();if(a){e.writeAttributeEscaped("title",a)}var d={};d.describedby={value:t.getStaticId("sap.m","TOKEN_ARIA_LABEL"),append:true};if(i.getEditable()){d.describedby={value:t.getStaticId("sap.m","TOKEN_ARIA_DELETABLE"),append:true}}e.writeAccessibilityState(i,d);e.write(">");r._renderInnerControl(e,i);if(i.getEditable()){e.renderControl(i._deleteIcon)}e.write("</div>")};r._renderInnerControl=function(e,t){var r=t.getTextDirection();e.write("<span");e.addClass("sapMTokenText");e.writeClasses();if(r!==i.Inherit){e.writeAttribute("dir",r.toLowerCase())}e.write(">");var a=t.getText();if(a){e.writeEscaped(a)}e.write("</span>")};return r},true);