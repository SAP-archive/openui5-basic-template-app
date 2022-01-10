/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/assert","sap/ui/util/Storage"],function(e,t,s){"use strict";var a={};e.sap.storage=function(e,r){if(!e){e=s.Type.session}if(typeof e==="string"&&s.Type[e]){var i=e;if(r&&r!="state.key_"){i=e+"_"+r}if(!a[i]){a[i]=new s(e,r)}return a[i]}t(e instanceof Object&&e.clear&&e.setItem&&e.getItem&&e.removeItem,"storage: duck typing the storage");return new s(e,r)};e.sap.storage.Storage=s;e.sap.storage.Type=s.Type;Object.assign(e.sap.storage,s);return e});