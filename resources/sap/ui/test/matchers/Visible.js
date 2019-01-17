/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/matchers/Matcher"],function(e){"use strict";return e.extend("sap.ui.test.matchers.Visible",{isMatching:function(e){if(!e.getDomRef()){this._oLogger.debug("Control '"+e+"'' is not rendered");return false}var t=e.$().is(":visible");if(!t){this._oLogger.debug("Control '"+e+"' is not visible")}return t}})});