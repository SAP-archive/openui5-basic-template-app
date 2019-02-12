/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/performance/trace/FESR","sap/base/Log"],function(e,t){"use strict";return function(){var r=!!document.querySelector("meta[name=sap-ui-fesr][content=true]"),i=window.location.search.match(/[\?|&]sap-ui-(?:xx-)?fesr=(true|x|X|false)&?/);if(i){r=i[1]&&i[1]!="false"}if(typeof window.performance.getEntriesByType==="function"){e.setActive(r)}else{t.debug("FESR is not supported in clients without support of window.Performance extensions.")}if(/sap-ui-xx-e2e-trace=(true|x|X)/.test(location.search)){sap.ui.requireSync("sap/ui/core/support/trace/E2eTraceLib")}}});