/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var e={apiVersion:2};e.render=function(e,t){this.startWizardStep(e,t);this.renderWizardStepTitle(e,t);this.renderContent(e,t);this.endWizardStep(e)};e.startWizardStep=function(e,t){e.openStart("div",t).accessibilityState(t,{labelledby:t._getNumberInvisibleText().getId(),role:"region"}).class("sapMWizardStep").openEnd()};e.renderWizardStepTitle=function(e,t){e.openStart("h3",t.getId()+"-Title").class("sapMWizardStepTitle").openEnd().text(t.getTitle()).close("h3")};e.renderContent=function(e,t){t.getContent().forEach(e.renderControl,e);e.renderControl(t.getAggregation("_nextButton"))};e.endWizardStep=function(e){e.close("div")};return e},true);