/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,t){t._bRenderingInProgress=true;if(!t.getVisible()){return}e.write("<div");e.writeControlData(t);e.addClass("sapMNav");if(t.getWidth()){e.addStyle("width",t.getWidth())}var r=t.getHeight();if(r&&r!="100%"){e.addStyle("height",r)}if(this.renderAttributes){this.renderAttributes(e,t)}e.writeClasses();e.writeStyles();var i=t.getTooltip_AsString();if(i){e.writeAttributeEscaped("title",i)}e.write(">");if(this.renderBeforeContent){this.renderBeforeContent(e,t)}var n=t.getCurrentPage();if(n){n.removeStyleClass("sapMNavItemHidden");e.renderControl(n)}e.write("</div>");t._bRenderingInProgress=false};return e},true);