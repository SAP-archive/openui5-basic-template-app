/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./isPlainObject"],function(r){"use strict";var e=function(){
/*
		 * The code in this function is taken from jQuery 2.2.3 "jQuery.extend" and got modified.
		 *
		 * jQuery JavaScript Library v2.2.3
		 * http://jquery.com/
		 *
		 * Copyright jQuery Foundation and other contributors
		 * Released under the MIT license
		 * http://jquery.org/license
		 */
var i,n,f,t,a,o,s=arguments[0]||{},u=1,c=arguments.length;if(typeof s!=="object"&&typeof s!=="function"){s={}}for(;u<c;u++){a=arguments[u];for(t in a){i=s[t];f=a[t];if(s===f){continue}if(f&&(r(f)||(n=Array.isArray(f)))){if(n){n=false;o=Array.isArray(i)?i:[]}else{o=i&&r(i)?i:{}}s[t]=e(o,f)}else{s[t]=f}}}return s};return e});