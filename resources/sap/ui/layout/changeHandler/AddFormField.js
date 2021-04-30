/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseAddViaDelegate"],function(e){"use strict";var r=e.createAddViaDelegateChangeHandler({addProperty:function(e){var r=e.innerControls;var n=e.modifier;var a=e.view;var t=e.appComponent;var o=e.change;var i=o.getContent();var l=i.newFieldIndex;var g=i.newFieldSelector;var d;if(!r.layoutControl){d=n.createControl("sap.ui.layout.form.FormElement",t,a,g);n.insertAggregation(d,"label",r.label,0,a);n.insertAggregation(d,"fields",r.control,0,a)}else{d=r.control}var s=o.getDependentControl("parentFormContainer",e);n.insertAggregation(s,"formElements",d,l,a);if(r.valueHelp){n.insertAggregation(s,"dependents",r.valueHelp,0,a)}},aggregationName:"formElements",parentAlias:"parentFormContainer",fieldSuffix:"-field",supportsDefault:true});return r},true);