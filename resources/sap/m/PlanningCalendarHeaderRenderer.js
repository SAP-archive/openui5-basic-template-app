/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r={};r.render=function(r,e){var t=e.getAggregation("_actionsToolbar"),i=e.getAggregation("_navigationToolbar");r.write("<div");r.writeControlData(e);r.addClass("sapMPCHead");r.writeClasses();r.write(">");if(t){r.renderControl(t)}if(i){r.renderControl(i)}r.write("</div>")};return r},true);