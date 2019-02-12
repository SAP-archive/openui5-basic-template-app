/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e;sap.ui.getCore().registerPlugin({startPlugin:function(t){e=t}});return{getAllControls:function(e){var t,n,r=[],i=this.getCoreElements();for(n in i){if(!i.hasOwnProperty(n)){continue}t=i[n];if(this.checkControlType(t,e)){r.push(t)}}return r},checkControlType:function(e,t){if(t){return e instanceof t}else{return true}},getCoreElements:function(){var t={};if(!e){return t}return e.mElements||t},getCoreElement:function(e,t){var n=this.getCoreElements()[e]||null;return this.checkControlType(n,t)?n:null},isUIDirty:function(){return e&&e.getUIDirty()}}},true);