/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./DatePickerRenderer"],function(e,t){"use strict";var a=e.extend(t);a.apiVersion=2;a.writeInnerValue=function(e,t){if(t._bValid){e.attr("value",t._formatValue(t.getDateValue(),t.getSecondDateValue()))}else{e.attr("value",t.getValue())}};return a},true);