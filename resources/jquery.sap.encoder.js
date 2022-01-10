/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/security/encodeXML","sap/base/security/encodeJS","sap/base/security/encodeURL","sap/base/security/encodeURLParameters","sap/base/security/encodeCSS","sap/base/security/URLListValidator","sap/base/security/URLWhitelist","sap/base/security/sanitizeHTML"],function(e,s,a,t,i,r,c,p,n){"use strict";e.sap.encodeHTML=s;e.sap.encodeXML=s;e.sap.escapeHTML=s;e.sap.encodeJS=a;e.sap.escapeJS=a;e.sap.encodeURL=t;e.sap.encodeURLParameters=i;e.sap.encodeCSS=r;e.sap.clearUrlWhitelist=c.clear;e.sap.addUrlWhitelist=c.add.bind(p);e.sap.removeUrlWhitelist=function(e){c._delete(c.entries()[e])};e.sap.getUrlWhitelist=c.entries;e.sap.validateUrl=c.validate;e.sap._sanitizeHTML=n;return e});