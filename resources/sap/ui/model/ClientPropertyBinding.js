/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PropertyBinding"],function(t){"use strict";var e=t.extend("sap.ui.model.ClientPropertyBinding",{constructor:function(e,s,i,o){t.apply(this,arguments);this.oValue=this._getValue()}});e.prototype.getValue=function(){return this.oValue};e.prototype._getValue=function(){var t=this.sPath.substr(this.sPath.lastIndexOf("/")+1);if(this.oContext&&t=="__name__"){var e=this.oContext.getPath().split("/");return e[e.length-1]}return this.oModel.getProperty(this.sPath,this.oContext)};e.prototype.setContext=function(t){if(this.oContext!=t){sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(),true);this.oContext=t;if(this.isRelative()){this.checkUpdate()}}};return e});