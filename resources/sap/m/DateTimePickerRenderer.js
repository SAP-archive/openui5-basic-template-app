/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./DatePickerRenderer","./InputBaseRenderer","sap/ui/core/library"],function(e,r,t,i){"use strict";var n=e.extend(r);n.apiVersion=2;n.getDescribedByAnnouncement=function(e){var r=t.getDescribedByAnnouncement.apply(this,arguments);return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("DATETIMEPICKER_TYPE")+" "+r};n.getAccessibilityState=function(e){var t=r.getAccessibilityState.apply(this,arguments);t["haspopup"]=i.aria.HasPopup.Dialog.toLowerCase();return t};return n},true);