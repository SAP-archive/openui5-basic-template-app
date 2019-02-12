/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.flexClass="sapMTBSpacerFlex";e.render=function(s,t){s.write("<div");s.writeControlData(t);s.addClass("sapMTBSpacer");var a=t.getWidth();if(a){s.addStyle("width",a)}else{s.addClass(e.flexClass)}s.writeStyles();s.writeClasses();s.write("></div>")};return e},true);