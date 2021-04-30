/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_OpaLogger","sap/ui/base/ManagedObject"],function(t,e){"use strict";var a=e.extend("sap.ui.test.matchers.Matcher",{metadata:{publicMethods:["isMatching"]},constructor:function(){this._oLogger=t.getLogger(this.getMetadata().getName());return e.prototype.constructor.apply(this,arguments)},isMatching:function(t){return true},_getApplicationWindow:function(){if(sap.ui.test&&sap.ui.test.Opa5){return sap.ui.test.Opa5.getWindow()}else{return window}}});return a});