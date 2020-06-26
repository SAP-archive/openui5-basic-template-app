/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/selectors/_Selector","sap/m/SelectList","sap/ui/core/Item"],function(e,t,r){"use strict";var n=e.extend("sap.ui.test.selectors._DropdownItem",{_generate:function(e,t){if(t){var r=e.getKey();this._oLogger.debug("Control "+e+" with parent "+JSON.stringify(t)+" has selection key "+r);return{ancestor:t,properties:{key:r}}}else{this._oLogger.debug("Control "+e+" is not inside a supported dropdown")}},_isAncestorRequired:function(){return true},_getAncestor:function(e){if(e instanceof r){var n=e.getParent();if(n&&n instanceof t){return n}}}});return n});