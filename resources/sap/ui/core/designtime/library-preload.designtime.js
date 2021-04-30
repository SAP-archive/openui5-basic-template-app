//@ui5-bundle sap/ui/core/designtime/library-preload.designtime.js
sap.ui.predefine("sap/ui/core/designtime/ComponentContainer.designtime",[],function(){"use strict";return{associations:{component:{aggregationLike:true}}}});
sap.ui.predefine("sap/ui/core/designtime/CustomData.designtime",[],function(){"use strict";return{aggregations:{customData:{ignored:true}}}});
sap.ui.predefine("sap/ui/core/designtime/Icon.designtime",[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/ui/core/designtime/Icon.icon.svg"}}}});
sap.ui.predefine("sap/ui/core/designtime/UIComponent.designtime",[],function(){"use strict";return{domRef:function(e){if(e.oContainer){return e.oContainer.getDomRef("uiarea")}},aggregations:{rootControl:{ignore:false}}}});
sap.ui.predefine("sap/ui/core/designtime/library.designtime",[],function(){"use strict";return{}});
sap.ui.predefine("sap/ui/core/designtime/mvc/ControllerExtensionTemplate",["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("{{controllerExtensionName}}",{})});
sap.ui.predefine("sap/ui/core/designtime/mvc/View.designtime",[],function(){"use strict";return{controllerExtensionTemplate:"sap/ui/core/designtime/mvc/ControllerExtensionTemplate"}});
sap.ui.predefine("sap/ui/core/designtime/mvc/XMLView.designtime",[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref"}}}});
