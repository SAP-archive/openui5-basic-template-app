/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";return{display:function(e,r,t){var i=Promise.resolve();return this._display(e,r,t,i)},_display:function(e,r,t,i,n){var a=this,s=[];if(!Array.isArray(e)){e=[e]}this._attachTitleChanged(e,t);return e.reduce(function(e,t){var i=t;if(typeof t==="string"){i={name:t}}var u={afterCreate:n,prefix:i.prefix};return a._displaySingleTarget(i,r,e,u).then(function(e){e=e||{};e.targetInfo=i;s.push(e)})},i).then(function(){return s})},_displaySingleTarget:function(r,t,i,n){var a=r.name,s=this.getTarget(a);if(s!==undefined){return s._display(t,i,n)}else{var u='The target with the name "'+a+'" does not exist!';e.error(u,this);return Promise.resolve({name:a,error:u})}}}});