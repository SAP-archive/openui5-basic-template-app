/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/dom/containsOrEquals","sap/ui/dom/patch","sap/ui/core/syncStyleClass","sap/ui/dom/getOwnerWindow","sap/ui/dom/getScrollbarSize","sap/ui/dom/denormalizeScrollLeftRTL","sap/ui/dom/denormalizeScrollBeginRTL","sap/ui/dom/units/Rem","sap/ui/dom/jquery/Aria","sap/ui/dom/jquery/Selection","sap/ui/dom/jquery/zIndex","sap/ui/dom/jquery/parentByAttribute","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/selectText","sap/ui/dom/jquery/getSelectedText","sap/ui/dom/jquery/rect","sap/ui/dom/jquery/rectContains","sap/ui/dom/jquery/Focusable","sap/ui/dom/jquery/hasTabIndex","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/Selectors"],function(e,r,a,t,s,o,u,i,n){"use strict";e.sap.domById=function e(r,a){return r?(a||window).document.getElementById(r):null};e.sap.byId=function r(a,t){var s="";if(a){s="#"+a.replace(/(:|\.)/g,"\\$1")}return e(s,t)};e.sap.focus=function e(r){if(!r){return}r.focus();return true};e.sap.pxToRem=n.fromPx;e.sap.remToPx=n.toPx;e.fn.outerHTML=function(){var r=this.get(0);if(r&&r.outerHTML){return e.trim(r.outerHTML)}else{var a=this[0]?this[0].ownerDocument:document;var t=a.createElement("div");t.appendChild(r.cloneNode(true));return t.innerHTML}};e.sap.containsOrEquals=r;e.sap.denormalizeScrollLeftRTL=u;e.sap.denormalizeScrollBeginRTL=i;
/*
	 * The following methods are taken from jQuery UI core but modified.
	 *
	 * jQuery UI Core
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */e.support.selectstart="onselectstart"in document.createElement("div");e.sap.ownerWindow=s;e.sap.scrollbarSize=o;e.sap.syncStyleClass=t;e.sap.replaceDOM=function(r,t,s){var o;if(typeof t==="string"){o=e.parseHTML(t)[0]}else{o=t}if(s){e.cleanData([r]);e.cleanData(r.getElementsByTagName("*"))}return a(r,o)};return e});