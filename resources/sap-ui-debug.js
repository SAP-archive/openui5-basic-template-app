/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap-ui-debug");(function(t){"use strict";var e,r,i,s,u,c;c=document.getElementById("sap-ui-bootstrap");if(c){i=c.getAttribute("src");s=i.match(/^(?:.*\/)?resources\//i);if(s){u=s[1]}}if(u==null){e=document.getElementsByTagName("script");for(r=0;r<e.length;r++){i=e[r].getAttribute("src");if(i){s=i.match(/(.*\/)sap-ui-core.*\.js$/i);if(s){u=s[1];break}}}}if(u==null){throw new Error("sap-ui-debug.js: could not identify script tag!")}for(r=0;r<t.length;r++){i=t[r];i=u+i.slice(4);document.write('<script src="'+i+'"><\/script>')}})(["raw:sap/ui/debug/DebugEnv.js"]);