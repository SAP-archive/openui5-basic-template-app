/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e=function(e){this.mParams={};var t=e;if(t){if(t.indexOf("#")>=0){t=t.slice(0,t.indexOf("#"))}if(t.indexOf("?")>=0){t=t.slice(t.indexOf("?")+1);var i=t.split("&"),r={},n,a,o;for(var s=0;s<i.length;s++){n=i[s];a="";o=n.indexOf("=");if(o>=0){a=decodeURIComponent(n.slice(o+1).replace(/\+/g," "));n=n.slice(0,o)}n=decodeURIComponent(n.replace(/\+/g," "));if(n){if(!Object.prototype.hasOwnProperty.call(r,n)){r[n]=[]}r[n].push(a)}}this.mParams=r}}};e.prototype={};e.prototype.get=function(e,t){var i=Object.prototype.hasOwnProperty.call(this.mParams,e)?this.mParams[e]:[];return t===true?i:i[0]||null};return e});