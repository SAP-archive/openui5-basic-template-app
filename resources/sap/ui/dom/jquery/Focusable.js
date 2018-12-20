/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dom/jquery/hasTabIndex"],function(i,e){"use strict";function t(e){return e.offsetWidth<=0&&e.offsetHeight<=0||i.css(e,"visibility")==="hidden"}function n(e,r){var u=r?e.firstChild:e.lastChild,f;while(u){if(u.nodeType==1&&!t(u)){if(i(u).hasTabIndex()){return u}f=n(u,r);if(f){return f}}u=r?u.nextSibling:u.previousSibling}return null}i.fn.firstFocusableDomRef=function(){var i=this.get(0);if(!i||t(i)){return null}return n(i,true)};i.fn.lastFocusableDomRef=function(){var i=this.get(0);if(!i||t(i)){return null}return n(i,false)};return i});