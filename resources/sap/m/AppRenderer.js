/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./NavContainerRenderer","sap/ui/core/Renderer","sap/m/library"],function(e,r,a){"use strict";var n=a.BackgroundHelper;var t={};var t=r.extend(e);t.renderAttributes=function(e,r){n.addBackgroundColorStyles(e,r._getValidatedBackgroundColor(),r.getBackgroundImage())};t.renderBeforeContent=function(e,r){n.renderBackgroundImageTag(e,r,"sapMAppBG",r.getBackgroundImage(),r.getBackgroundRepeat(),r.getBackgroundOpacity())};return t},true);