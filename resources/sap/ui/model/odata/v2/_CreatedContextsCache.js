/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function e(){this.mCache={}}e.prototype.addContext=function(e,t,n){var i,o;o=this.mCache[t];if(!o){o=this.mCache[t]={}}i=o[n];if(!i){i=o[n]=[]}i.unshift(e)};e.prototype.findAndRemoveContext=function(e){var t=this;Object.keys(this.mCache).some(function(n){var i=t.mCache[n];return Object.keys(i).some(function(i){var o=t.mCache[n][i];if(o.includes(e)){t.removeContext(e,n,i);return true}return false})})};e.prototype.getContexts=function(e,t){var n=this.mCache[e],i=n&&n[t];return i?i.slice():[]};e.prototype.removeContext=function(e,t,n){var i=this.mCache[t],o=i[n];o.splice(o.indexOf(e),1);if(!o.length){delete i[n];if(!Object.keys(i).length){delete this.mCache[t]}}};return e},false);