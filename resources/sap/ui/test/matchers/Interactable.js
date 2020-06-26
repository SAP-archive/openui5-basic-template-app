/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/matchers/Matcher","sap/ui/test/matchers/Visible","sap/ui/test/matchers/_Busy","sap/ui/test/matchers/_Visitor"],function(e,t,i,r){"use strict";var a=new t;var s=new i;var n=new r;return e.extend("sap.ui.test.matchers.Interactable",{isMatching:function(e){if(!a.isMatching(e)){return false}if(s.isMatching(e)){return false}var t=n.isMatching(e,function(e){return e.getMetadata().getName()==="sap.ui.core.UIArea"&&e.bNeedsRerendering});if(t){this._oLogger.debug("Control '"+e+"' is currently in a UIArea that needs a new rendering");return false}var i=this._getApplicationWindow().jQuery;var r=e.$().closest("#sap-ui-static").length;var u=i("#sap-ui-blocklayer-popup").is(":visible");if(!r&&u){this._oLogger.debug("The control '"+e+"' is hidden behind a blocking popup layer");return false}return true}})});