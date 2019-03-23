/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r={};r.render=function(r,e){r.write("<div");r.writeControlData(e);r.addClass("sapMUC");r.writeClasses();r.write(">");this.renderDragDropOverlay(r,e);this.renderList(r,e);r.write("</div>")};r.renderDragDropOverlay=function(r,e){r.write("<div");r.writeAttribute("id",e.getId()+"-drag-drop-area");r.addClass("sapMUCDragDropOverlay");r.addClass("sapMUCDragDropOverlayHide");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMUCDragDropIndicator");r.writeClasses();r.write(">");r.write("</div>");r.write("</div>")};r.renderList=function(r,e){r.renderControl(e.getList())};return r});