/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/actions/Action"],function(t){"use strict";var e=t.extend("sap.ui.test.actions.Drag",{metadata:{publicMethods:["executeOn"]},executeOn:function(t){var e=this.$(t)[0];if(e){this._createAndDispatchDragEvent("dragstart",e);this._createAndDispatchDragEvent("drag",e)}else{this.oLogger.debug("Cannot drag control "+t+": control has no DOM focus reference")}}});return e});