/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,n,t){"use strict";return e.extend("sap.ui.test.pipelines.PipelineFactory",{constructor:function(e){this._oOptions=e},create:function(e){var t=[];if(Array.isArray(e)){t=e}else if(e){t=[e]}else{n.error(this._oOptions.name+" were defined, but they were neither an array nor a single element: "+e)}t=t.map(function(e){var t;if(e[this._oOptions.functionName]){return e}else if(typeof e=="function"){t={};t[this._oOptions.functionName]=e;return t}n.error("A "+this._oOptions.name+" was defined, but it is no function and has no '"+this._oOptions.functionName+"' function: "+e)}.bind(this)).filter(function(e){return!!e});return t}})});