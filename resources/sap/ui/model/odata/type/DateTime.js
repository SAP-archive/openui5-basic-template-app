/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/model/odata/type/DateTimeBase"],function(t,e){"use strict";function a(e,a){var i={};if(a){switch(a.displayFormat){case"Date":i.isDateOnly=true;break;case undefined:break;default:t.warning("Illegal displayFormat: "+a.displayFormat,null,e.getName())}i.nullable=a.nullable}return i}var i=e.extend("sap.ui.model.odata.type.DateTime",{constructor:function(t,i){e.call(this,t,a(this,i))}});i.prototype.getConstraints=function(){var t=e.prototype.getConstraints.call(this);if(t.isDateOnly){t.displayFormat="Date";delete t.isDateOnly}return t};i.prototype.getName=function(){return"sap.ui.model.odata.type.DateTime"};return i});