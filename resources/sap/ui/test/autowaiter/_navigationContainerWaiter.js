/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_OpaLogger","sap/ui/test/_opaCorePlugin","sap/base/util/ObjectPath"],function(a,t,e){"use strict";var i=a.getLogger("sap.ui.test.autowaiter._navigationContainerWaiter#hasPending");function n(){var a="sap.m.NavContainer";var n=e.get(a);if(sap.ui.lazyRequire._isStub(a)||!n){return false}return t.getAllControls(n).some(function(a){if(a._bNavigating){i.debug("The NavContainer "+a+" is currently navigating")}return a._bNavigating})}return{hasPending:n}});