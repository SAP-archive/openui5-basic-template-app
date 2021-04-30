/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define("sap/ui/test/qunitPause",[],function(){"use strict";var e={NONE:"none",POLL:"poll"};var n=e.NONE;var t=false;function i(){return n.indexOf(e.POLL)>-1}function u(e,n){QUnit.begin(function(){t=false});var u=false;if(!QUnit){throw new Error("QUnitPause should start polling after QUnit is loaded!")}else if(t){n({qunitDone:true})}else if(i()){QUnit.done(function(){t=true;if(!u){n({qunitDone:true})}});setTimeout(function(){if(!t&&!u){u=true;n({qunitDone:false})}},e)}}function r(n){var t=false;for(var i in e){if(e[i]===n){t=true}}return t}return{PAUSE_RULES:e,get pauseRule(){return n},set pauseRule(t){var i=t.split(",");n="";var u=i.filter(r).join(",");n=u?u:e.NONE},shouldPoll:i,pollForQUnitDone:u}},true);