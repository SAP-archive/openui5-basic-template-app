/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./CalendarDateIntervalRenderer"],function(e,t){"use strict";var a=e.extend(t);a.addAttributes=function(e,a){t.addAttributes.apply(this,arguments);e.addClass("sapUiCalOneMonthInt")};return a},true);