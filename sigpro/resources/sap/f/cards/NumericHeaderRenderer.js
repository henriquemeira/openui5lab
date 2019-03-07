/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={},r=sap.ui.getCore().getLibraryResourceBundle("sap.f");e.render=function(t,a){t.write("<header");t.writeControlData(a);t.addClass("sapFCardHeader");t.addClass("sapFCardNumericHeader");t.writeAttribute("tabindex","0");t.writeAccessibilityState(a,{role:"group",labelledBy:{value:a._getHeaderAccessibility(),append:true},roledescription:{value:r.getText("ARIA_ROLEDESCRIPTION_CARD_HEADER"),append:true}});t.writeClasses();t.writeStyles();t.write(">");e.renderHeaderText(t,a);e.renderIndicators(t,a);var i=a.getAggregation("_details");if(i){i.addStyleClass("sapFCardHeaderDetails");t.renderControl(i)}t.write("</header>")};e.renderHeaderText=function(e,r){var t=r.getAggregation("_title"),a=r.getAggregation("_subtitle"),i=r.getAggregation("_unitOfMeasurement");e.write("<div");e.addClass("sapFCardHeaderText");e.writeClasses();e.write(">");if(t){t.addStyleClass("sapFCardTitle");e.renderControl(t)}e.write("<div");e.addClass("sapFCardSubtitle");e.writeClasses();e.write(">");e.write("<div>");if(a){e.renderControl(a)}e.write("</div>");e.write("<div>");if(i){i.addStyleClass("sapFCardHeaderUnitOfMeasurement");e.renderControl(i)}e.write("</div>");e.write("</div>");e.write("</div>")};e.renderIndicators=function(e,r){var t=r.getAggregation("_mainIndicator"),a=r.getAggregation("sideIndicators");e.write("<div");e.addClass("sapFCardHeaderIndicators");e.writeClasses();e.write(">");if(t){t.addStyleClass("sapFCardHeaderMainIndicator");e.renderControl(t);e.write("<div");e.addClass("sapFCardHeaderIndicatorsGap");e.writeClasses();e.write(">");e.write("</div>")}if(a){e.write("<div");e.addClass("sapFCardHeaderSideIndicators");e.writeClasses();e.write(">");a.forEach(function(r){e.renderControl(r)});e.write("</div>")}e.write("</div>")};return e},true);