/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/unified/calendar/CalendarDate","./MonthRenderer"],function(e,a,t){"use strict";var r=e.extend(t);r.getStartDate=function(e){return e._getStartDate()};r.getClass=function(e,a){var t="sapUiCalDatesRow sapUiCalRow";if(!a.getShowDayNamesLine()){t=t+" sapUiCalNoNameLine"}return t};r.renderMonth=function(e,a,r){t.renderMonth.apply(this,arguments);this.renderWeekNumbers(e,a)};r.renderWeekNumbers=function(e,a){var t,r,i,n;if(a.getShowWeekNumbers()&&a.getPrimaryCalendarType()===sap.ui.core.CalendarType.Gregorian){t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");e.write('<div id="'+a.getId()+'-weeks"');e.addClass("sapUiCalRowWeekNumbers");e.writeClasses();e.write(">");r=a.getDays();i=100/r;n=a.getWeekNumbers();n.forEach(function(a){e.write("<div");e.addClass("sapUiCalRowWeekNumber");e.writeClasses();e.addStyle("width",a.len*i+"%");e.writeStyles();e.writeAttribute("data-sap-ui-week",a.number);e.write(">"+t.getText("CALENDAR_DATES_ROW_WEEK_NUMBER",[a.number])+"</div>")});e.write("</div>")}};r.renderHeader=function(e,a,t){var r=a._getLocaleData();var i=a.getId();var n=a.getDays();var s="";if(a._getShowHeader()){e.write('<div id="'+i+'-Head">');this.renderHeaderLine(e,a,r,t);e.write("</div>")}s=100/n+"%";if(a.getShowDayNamesLine()){e.write('<div id="'+i+'-Names" style="display: inline;">');this.renderDayNames(e,a,r,t.getDay(),n,false,s);e.write("</div>")}};r.renderHeaderLine=function(e,t,r,i){var n=t.getId();var s=t.getDays();var d=new a(i,t.getPrimaryCalendarType());var o="";var l=0;var g=[];var D=0;for(D=0;D<s;D++){l=d.getMonth();if(g.length>0&&g[g.length-1].iMonth==l){g[g.length-1].iDays++}else{g.push({iMonth:l,iDays:1})}d.setDate(d.getDate()+1)}var u=r.getMonthsStandAlone("wide");for(D=0;D<g.length;D++){var y=g[D];o=100/s*y.iDays+"%";e.write('<div id="'+n+"-Head"+D+'"class="sapUiCalHeadText" style="width:'+o+'">');e.write(u[y.iMonth]);e.write("</div>")}};r.renderDays=function(e,t,r){var i=t.getDays();var n=100/i+"%";var s=t.getShowDayNamesLine();if(!r){r=t._getFocusedDate()}var d=this.getDayHelper(t,r);if(!s){if(t._bLongWeekDays||!t._bNamesLengthChecked){d.aWeekDays=d.oLocaleData.getDaysStandAlone("abbreviated")}else{d.aWeekDays=d.oLocaleData.getDaysStandAlone("narrow")}d.aWeekDaysWide=d.oLocaleData.getDaysStandAlone("wide")}var o=new a(r,t.getPrimaryCalendarType());for(var l=0;l<i;l++){this.renderDay(e,t,o,d,false,false,l,n,!s);o.setDate(o.getDate()+1)}};return r},true);