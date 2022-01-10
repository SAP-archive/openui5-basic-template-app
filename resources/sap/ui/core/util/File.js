/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";var o={save:function(o,n,r,a,t,i){var d=n+"."+r;if(typeof i==="undefined"&&t==="utf-8"&&r==="csv"){i=true}if(i===true&&t==="utf-8"){o="\ufeff"+o}if(window.Blob){var w="data:"+a;if(t){w+=";charset="+t}var u=new window.Blob([o],{type:w});if(window.navigator.msSaveOrOpenBlob){window.navigator.msSaveOrOpenBlob(u,d)}else{var f=window.URL||window.webkitURL;var l=f.createObjectURL(u);var v=window.document.createElement("a");if("download"in v){var p=e(document.body);var c=e(v).attr({download:d,href:l,style:"display:none"});p.append(c);c.get(0).click();c.remove()}else{o=encodeURI(o);var s=window.open(w+","+o);s.opener=null;if(!s){throw new Error("Could not download the file, please deactivate your pop-up blocker.")}}}}}};return o},true);