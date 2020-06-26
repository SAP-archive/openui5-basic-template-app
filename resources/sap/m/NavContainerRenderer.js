/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){t._bRenderingInProgress=true;if(!t.getVisible()){return}var r=t.getHeight(),n=t.getTooltip_AsString(),i=t.getCurrentPage();e.openStart("div",t);e.class("sapMNav");e.style("width",t.getWidth());if(r&&r!="100%"){e.style("height",r)}if(this.renderAttributes){this.renderAttributes(e,t)}if(n){e.attr("title",n)}e.openEnd();if(this.renderBeforeContent){this.renderBeforeContent(e,t)}t.getPages().forEach(function(t){if(t===i){i.removeStyleClass("sapMNavItemHidden");e.renderControl(i)}else{e.cleanupControlWithoutRendering(t)}});e.close("div");t._bRenderingInProgress=false};return e},true);