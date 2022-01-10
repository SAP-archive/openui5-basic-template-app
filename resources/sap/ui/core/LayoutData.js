/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Element","sap/ui/thirdparty/jquery","./library"],function(t,a){"use strict";var e=t.extend("sap.ui.core.LayoutData",{metadata:{abstract:true,library:"sap.ui.core"}});e.prototype.invalidate=function(){var t=this.getParent();if(t&&t.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){t=t.getParent()}if(t){var e=t.getParent();if(e){var r=a.Event("LayoutDataChange");r.srcControl=t;e._handleEvent(r)}}};e.prototype.setLayoutData=function(t){return this};return e});