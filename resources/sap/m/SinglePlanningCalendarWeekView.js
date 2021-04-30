/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["./library","./SinglePlanningCalendarView","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils"],function(e,a,t,n){"use strict";var r=a.extend("sap.m.SinglePlanningCalendarWeekView",{metadata:{library:"sap.m"}});r.prototype.getEntityCount=function(){return 7};r.prototype.getScrollEntityCount=function(){return 7};r.prototype.calculateStartDate=function(e){var a=t.fromLocalJSDate(e),r=n._getFirstDateOfWeek(a);return r.toLocalJSDate()};return r});