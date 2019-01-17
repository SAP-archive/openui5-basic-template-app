/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,r){e.write("<span ");e.writeControlData(r);e.addClass("sapMObjectMarker");if(r._isIconVisible()){e.addClass("sapMObjectMarkerIcon")}if(r._isTextVisible()){e.addClass("sapMObjectMarkerText")}e.writeClasses();e.write(">");e.renderControl(r._getInnerControl());e.write("</span>")};return e},true);