/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Binding"],function(t){"use strict";var e=t.extend("sap.ui.model.ContextBinding",{constructor:function(e,n,o,i,u){t.call(this,e,n,o,i,u);this.oElementContext=null;this.bInitial=true},metadata:{publicMethods:["getElementContext"]}});e.prototype.checkUpdate=function(t){};e.prototype.getBoundContext=function(){return this.oElementContext};return e});