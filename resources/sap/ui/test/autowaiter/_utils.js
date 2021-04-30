/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/URI","sap/base/util/isPlainObject"],function(r,t){"use strict";function a(){var t=new Error;var a="No stack trace available";var e=(new r).search(true);var n=["false",undefined].indexOf(e.opaFrameIEStackTrace)<0;if(t.stack){a=t.stack}else if(n){try{throw t}catch(r){a=r.stack}}return a.replace(/^Error\s/,"")}function e(r){return"'"+r.toString().replace(/\"/g,"'")+"'"}function n(r){try{return Array.prototype.map.call(r,a).join("; ")}catch(t){return"'"+r+"'"}function a(r){if(typeof r==="function"){return e(r)}if(Array.isArray(r)){var n=Array.prototype.map.call(r,a);return"["+n.join(", ")+"]"}if(t(r)){return JSON.stringify(r)}return"'"+r.toString()+"'"}}return{resolveStackTrace:a,functionToString:e,argumentsToString:n}},true);