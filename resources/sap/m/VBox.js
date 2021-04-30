/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./FlexBox","./library","./VBoxRenderer"],function(e,i,t){"use strict";var n=i.FlexDirection;var r=e.extend("sap.m.VBox",{metadata:{library:"sap.m",designtime:"sap/m/designtime/VBox.designtime"}});r.prototype.init=function(){this.setDirection(n.Column);e.prototype.init.apply(this,arguments)};return r});