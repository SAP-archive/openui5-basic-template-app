/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ClientTreeBinding","sap/ui/thirdparty/jquery"],function(e,t){"use strict";var i=e.extend("sap.ui.model.xml.XMLTreeBinding");i.prototype.getNodeContexts=function(e,i,n){if(!i){i=0}if(!n){n=this.oModel.iSizeLimit}var o=e.getPath();if(!o.endsWith("/")){o=o+"/"}if(!o.startsWith("/")){o="/"+o}var d=[],s={},r=this,a=this.oModel._getObject(e.getPath()),l,f;t.each(a[0].childNodes,function(e,t){if(t.nodeType==1){if(s[t.nodeName]==undefined){s[t.nodeName]=0}else{s[t.nodeName]++}l=o+t.nodeName+"/"+s[t.nodeName];f=r.oModel.getContext(l);if(r.oCombinedFilter&&!r.bIsFiltering){if(r.filterInfo.aFilteredContexts&&r.filterInfo.aFilteredContexts.indexOf(f)!=-1){d.push(f)}}else{d.push(f)}}});this._applySorter(d);this._setLengthCache(o,d.length);return d.slice(i,i+n)};return i});