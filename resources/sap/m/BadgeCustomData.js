/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/CustomData","sap/base/Log"],function(t,e){"use strict";var i=t.extend("sap.m.BadgeCustomData",{metadata:{properties:{visible:{type:"boolean",group:"Appearance",defaultValue:true}}}});i.prototype.init=function(){var t=this.getParent();if(t&&!t.isA("sap.m.IBadge")){e.warning("BadgeCustomData must be attached only to controls, which implement sap.m.IBadge")}};i.prototype.setValue=function(e){if(this.getValue()===e){return this}var i=this.getParent();t.prototype.setValue.call(this,e);if(i&&typeof e==="string"){i.updateBadgeValue(e)}return this};i.prototype.setVisible=function(t){if(this.getVisible()===t){return this}this.setProperty("visible",t,true);var e=this.getParent();if(e){e.updateBadgeVisibility(t)}return this};i.prototype.setKey=function(){return this};return i});