/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{actions:{rename:function(e){if(e.getCustomHeader()){return}return{changeType:"rename",domRef:function(e){return e.getDomRef("title")}}}},aggregations:{content:{domRef:":sap-domref > .sapMPopoverCont",actions:{move:"moveControls"}},customHeader:{domRef:":sap-domref > .sapMPopoverHeader"},subHeader:{domRef:":sap-domref > .sapMPopoverSubHeader"},footer:{domRef:":sap-domref > .sapMPopoverFooter"},beginButton:{domRef:":sap-domref > header.sapMPopoverHeader .sapMBarLeft"},endButton:{domRef:":sap-domref > header.sapMPopoverHeader .sapMBarRight"}}}});