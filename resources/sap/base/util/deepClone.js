/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./isPlainObject"],function(e){"use strict";var r=function(e,r){if(!r){r=10}return t(e,0,r)};function t(e,r,t){if(r>t){throw new TypeError("The structure depth of the source exceeds the maximum depth ("+t+")")}if(e==null){return e}else if(e instanceof Date){return new Date(e.getTime())}else if(Array.isArray(e)){return n(e,r,t)}else if(typeof e==="object"){return i(e,r,t)}else{return e}}function n(e,r,n){var i=[];for(var o=0;o<e.length;o++){i.push(t(e[o],r+1,n))}return i}function i(r,n,i){if(!e(r)){throw new TypeError("Cloning is only supported for plain objects")}var o={};for(var u in r){if(u==="__proto__"){continue}o[u]=t(r[u],n+1,i)}return o}return r});