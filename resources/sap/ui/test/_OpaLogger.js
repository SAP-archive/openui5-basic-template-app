/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t=[];var n=e.Level.DEBUG;return{setLevel:function(r){var o=r&&r.toUpperCase();var i=o&&e.Level[o];n=i||n;t.forEach(function(t){e.setLevel(n,t)})},getLogger:function(r){t.push(r);var o=e.getLogger(r,n);o.timestamp=function(t){if(console.timeStamp&&this.getLevel()>=e.Level.DEBUG){console.timeStamp(t)}};return o},getLevel:function(){return n}}},true);