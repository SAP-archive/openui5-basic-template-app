/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dom/isHidden","./hasTabIndex"],function(i,n){"use strict";function e(r,t){var u=t?r.firstChild:r.lastChild,s;while(u){if(u.nodeType==1&&!n(u)){if(i(u).hasTabIndex()){return u}s=e(u,t);if(s){return s}}u=t?u.nextSibling:u.previousSibling}return null}i.fn.firstFocusableDomRef=function(){var i=this.get(0);if(!i||n(i)){return null}return e(i,true)};i.fn.lastFocusableDomRef=function(){var i=this.get(0);if(!i||n(i)){return null}return e(i,false)};return i});