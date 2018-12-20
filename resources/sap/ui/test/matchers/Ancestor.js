/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_LogCollector","sap/base/Log"],function(e,t){"use strict";var r=t.getLogger("sap.ui.test.matchers.Ancestor");function n(e,t){var r=typeof t==="string";return r?(e&&e.getId())===t:e===t}return function(e,t){return function(o){if(!e){r.debug("No ancestor was defined so no controls will be filtered.");return true}var s=o.getParent();while(!t&&s&&!n(s,e)){s=s.getParent()}var i=n(s,e);if(!i){r.debug("Control '"+o+"' does not have "+(t?"direct ":"")+"ancestor '"+e)}return i}}},true);