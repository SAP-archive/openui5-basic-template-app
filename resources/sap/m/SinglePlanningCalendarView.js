/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/base/Log","sap/ui/core/Element"],function(e,t,n){"use strict";var i=n.extend("sap.m.SinglePlanningCalendarView",{metadata:{library:"sap.m",properties:{key:{type:"string",group:"Data"},title:{type:"string",group:"Appereance"}}}});i.prototype.getEntityCount=function(){t.warning("This method should be implemented in one of the inherited classes.",this)};i.prototype.getScrollEntityCount=function(){t.warning("This method should be implemented in one of the inherited classes.",this)};i.prototype.calculateStartDate=function(e){t.warning("This method should be implemented in one of the inherited classes.",this)};return i});