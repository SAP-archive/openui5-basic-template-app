/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Model"],function(t){"use strict";var e=t.extend("sap.ui.model.MetaModel",{constructor:function(){t.apply(this,arguments)}});e.prototype.createBindingContext=function(t,e,n,o){if(typeof e=="function"){o=e;e=null}if(typeof n=="function"){o=n;n=null}var i=this.resolve(t,e),u=i==undefined?undefined:this.getContext(i?i:"/");if(!u){u=null}if(o){o(u)}return u};e.prototype.destroyBindingContext=function(t){};e.prototype.getAdapterFactoryModulePath=null;return e});