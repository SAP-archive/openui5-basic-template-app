/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["./library","./SinglePlanningCalendarView","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate"],function(t,e,a,n){"use strict";var r=e.extend("sap.m.SinglePlanningCalendarMonthView",{metadata:{library:"sap.m"}});r.prototype.getEntityCount=function(){return 1};r.prototype.getScrollEntityCount=function(t,e){var r=n.fromLocalJSDate(t),i=t.getMonth()+e,o=e>0?1:-1;r.setMonth(i);while((i+12)%12!==r.getMonth()){r.setDate(r.getDate()-o)}return Math.abs(a._daysBetween(r,n.fromLocalJSDate(t)))};r.prototype.calculateStartDate=function(t){var e=a.getFirstDateOfMonth(a._createUTCDate(t,true)).getJSDate();return a._createLocalDate(e,true)};return r});