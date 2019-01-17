/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t;sap.ui.getCore().registerPlugin({startPlugin:function(e){t=e}});return{getAllControls:function(t){var e,n,r=[],i=this.getCoreElements();for(n in i){if(!i.hasOwnProperty(n)){continue}e=i[n];if(this.checkControlType(e,t)){r.push(e)}}return r},checkControlType:function(t,e){if(e){return t instanceof e}else{return true}},getCoreElements:function(){var e={};if(!t){return e}return t.mElements||e},isUIDirty:function(){return t&&t.getUIDirty()}}},true);