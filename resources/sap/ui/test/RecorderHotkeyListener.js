/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={ALT:18,T:84};return{init:function(){var t=false;document.addEventListener("keydown",function(o){if(o.keyCode===e.ALT){t=typeof o.location!=="number"||o.location===1;return}if(o.shiftKey&&o.altKey&&o.ctrlKey&&o.keyCode===e.T&&t){sap.ui.require(["sap/ui/testrecorder/Bootstrap"],function(e){e.init(["true","window"])},function(e){console.warn("Could not load module 'sap/ui/testrecorder/Bootstrap'! Details: "+e)})}})}}});