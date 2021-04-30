/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";var t=document.querySelector("[src$='runTest.js']");if(t&&!t.id&&document.getElementById("sap-ui-bootstrap")==null){t.id="sap-ui-bootstrap"}var e=/(?:^|\?|&)coverage(?:&|=|$)/.test(window.location.search);sap.ui.loader.config({async:!e})})();