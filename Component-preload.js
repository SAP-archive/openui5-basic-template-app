//@ui5-bundle sap/ui/demo/basicTemplate/Component-preload.js
sap.ui.require.preload({
	"sap/ui/demo/basicTemplate/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(e,i,t){"use strict";return e.extend("sap.ui.demo.basicTemplate.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.setModel(t.createDeviceModel(),"device");this.getRouter().initialize()}})});
},
	"sap/ui/demo/basicTemplate/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/demo/basicTemplate/model/formatter"],function(e,t){"use strict";return e.extend("sap.ui.demo.basicTemplate.controller.App",{formatter:t,onInit:function(){}})});
},
	"sap/ui/demo/basicTemplate/controller/Home.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","../model/formatter"],function(e,t){"use strict";return e.extend("sap.ui.demo.basicTemplate.controller.Home",{formatter:t,onInit:function(){}})});
},
	"sap/ui/demo/basicTemplate/i18n/i18n.properties":'title=Basic Template\nappTitle=Basic Template\nappDescription=Blank app as starting point for your app development',
	"sap/ui/demo/basicTemplate/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"sap.ui.demo.basicTemplate","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","ach":"ach"},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"sap.ui.demo.basicTemplate.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"sap.ui.demo.basicTemplate.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"sap.ui.demo.basicTemplate.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"home","target":["home"]}],"targets":{"home":{"viewName":"Home","viewId":"home","viewLevel":1,"title":"{i18n>title}"}}}}}',
	"sap/ui/demo/basicTemplate/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{}});
},
	"sap/ui/demo/basicTemplate/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"sap/ui/demo/basicTemplate/view/App.view.xml":'<mvc:View\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc" \n\tcontrollerName="sap.ui.demo.basicTemplate.controller.App"><Shell><App id="app"/></Shell></mvc:View>',
	"sap/ui/demo/basicTemplate/view/Home.view.xml":'<mvc:View\n\tcontrollerName="sap.ui.demo.basicTemplate.controller.Home"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><Page\n\t\tid="page"\n\t\ttitle="{i18n>title}"><content></content></Page></mvc:View>'
});
