/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/pipelines/PipelineFactory","sap/ui/thirdparty/jquery"],function(e,t,i){"use strict";var n=new t({name:"Action",functionName:"executeOn"});return e.extend("sap.ui.test.matcherPipeline",{process:function(e){var t,i=e.control;var a=n.create(e.actions);if(!Array.isArray(i)){t=[i]}else{t=i}t.forEach(function(e){a.forEach(function(t){t.executeOn(e)})})}})});