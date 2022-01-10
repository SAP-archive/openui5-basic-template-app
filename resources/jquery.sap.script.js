/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/util/uid","sap/base/strings/hash","sap/base/util/array/uniqueSort","sap/base/util/deepEqual","sap/base/util/each","sap/base/util/array/diff","sap/base/util/JSTokenizer","sap/base/util/merge","sap/base/util/UriParameters"],function(e,r,a,t,n,o,i,s,l,f){"use strict";e.sap.uid=r;e.sap.hashCode=a;e.sap.unique=t;e.sap.equal=n;e.sap.each=o;e.sap.arraySymbolDiff=i;e.sap._createJSTokenizer=function(){return new s};e.sap.parseJS=s.parseJS;e.sap.extend=function(){var e=arguments,r=false;if(typeof arguments[0]==="boolean"){r=arguments[0];e=Array.prototype.slice.call(arguments,1)}if(r){return l.apply(this,e)}else{
/*
			 * The code in this function is taken from jQuery 3.6.0 "jQuery.extend" and got modified.
			 *
			 * jQuery JavaScript Library v3.6.0
			 * https://jquery.com/
			 *
			 * Copyright OpenJS Foundation and other contributors
			 * Released under the MIT license
			 * https://jquery.org/license
			 */
var a,t,n,o=arguments[0]||{},i=1,s=arguments.length;if(typeof o!=="object"&&typeof o!=="function"){o={}}for(;i<s;i++){n=arguments[i];for(t in n){a=n[t];if(t==="__proto__"||o===a){continue}o[t]=a}}return o}};e.sap.getUriParameters=function e(r){return f.fromURL(r||window.location.href)};e.sap.delayedCall=function e(r,a,t,n){return setTimeout(function(){if(typeof t==="string"){t=a[t]}t.apply(a,n||[])},r)};e.sap.clearDelayedCall=function e(r){clearTimeout(r);return this};e.sap.intervalCall=function e(r,a,t,n){return setInterval(function(){if(typeof t==="string"){t=a[t]}t.apply(a,n||[])},r)};e.sap.clearIntervalCall=function e(r){clearInterval(r);return this};e.sap.forIn=o;e.sap.arrayDiff=function(e,r,a,t){a=a||function(e,r){return n(e,r)};var o=[];var i=[];var s=[];for(var l=0;l<r.length;l++){var f=r[l];var p=0;var u;if(t&&a(e[l],f)){p=1;u=l}else{for(var d=0;d<e.length;d++){if(a(e[d],f)){p++;u=d;if(t||p>1){break}}}}if(p==1){var w={oldIndex:u,newIndex:l};if(s[u]){delete o[u];delete i[s[u].newIndex]}else{i[l]={data:r[l],row:u};o[u]={data:e[u],row:l};s[u]=w}}}for(var l=0;l<r.length-1;l++){if(i[l]&&!i[l+1]&&i[l].row+1<e.length&&!o[i[l].row+1]&&a(e[i[l].row+1],r[l+1])){i[l+1]={data:r[l+1],row:i[l].row+1};o[i[l].row+1]={data:o[i[l].row+1],row:l+1}}}for(var l=r.length-1;l>0;l--){if(i[l]&&!i[l-1]&&i[l].row>0&&!o[i[l].row-1]&&a(e[i[l].row-1],r[l-1])){i[l-1]={data:r[l-1],row:i[l].row-1};o[i[l].row-1]={data:o[i[l].row-1],row:l-1}}}var c=[];if(r.length==0){for(var l=0;l<e.length;l++){c.push({index:0,type:"delete"})}}else{var h=0;if(!o[0]){for(var l=0;l<e.length&&!o[l];l++){c.push({index:0,type:"delete"});h=l+1}}for(var l=0;l<r.length;l++){if(!i[l]||i[l].row>h){c.push({index:l,type:"insert"})}else{h=i[l].row+1;for(var d=i[l].row+1;d<e.length&&(!o[d]||o[d].row<l);d++){c.push({index:l+1,type:"delete"});h=d+1}}}}return c};return e});