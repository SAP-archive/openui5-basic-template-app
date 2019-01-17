/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./MonthRenderer","./DatesRowRenderer"],function(e,r,n){"use strict";var t=e.extend(n);["getClass","renderMonth","renderDays","renderHeader"].forEach(function(e){t[e]=function(t,a){if(a.iMode<2){return r[e].apply(r,arguments)}else{return n[e].apply(n,arguments)}}});return t},true);