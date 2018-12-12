/*
 Highmaps JS v6.1.1 (2018-06-27)
 Highmaps as a plugin for Highcharts or Highstock.

 (c) 2011-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w){"object"===typeof module&&module.exports?module.exports=w:w(Highcharts)})(function(w){(function(a){var m=a.addEvent,g=a.Axis,l=a.each,f=a.pick;m(g,"getSeriesExtremes",function(){var a=[];this.isXAxis&&(l(this.series,function(q,f){q.useMapGeometry&&(a[f]=q.xData,q.xData=[])}),this.seriesXData=a)});m(g,"afterGetSeriesExtremes",function(){var a=this.seriesXData,n,g,r;this.isXAxis&&(n=f(this.dataMin,Number.MAX_VALUE),g=f(this.dataMax,-Number.MAX_VALUE),l(this.series,function(e,b){e.useMapGeometry&&
(n=Math.min(n,f(e.minX,n)),g=Math.max(g,f(e.maxX,g)),e.xData=a[b],r=!0)}),r&&(this.dataMin=n,this.dataMax=g),delete this.seriesXData)});m(g,"afterSetAxisTranslation",function(){var a=this.chart,n;n=a.plotWidth/a.plotHeight;var a=a.xAxis[0],f;"yAxis"===this.coll&&void 0!==a.transA&&l(this.series,function(a){a.preserveAspectRatio&&(f=!0)});if(f&&(this.transA=a.transA=Math.min(this.transA,a.transA),n/=(a.max-a.min)/(this.max-this.min),n=1>n?this:a,a=(n.max-n.min)*n.transA,n.pixelPadding=n.len-a,n.minPixelPadding=
n.pixelPadding/2,a=n.fixTo)){a=a[1]-n.toValue(a[0],!0);a*=n.transA;if(Math.abs(a)>n.minPixelPadding||n.min===n.dataMin&&n.max===n.dataMax)a=0;n.minPixelPadding-=a}});m(g,"render",function(){this.fixTo=null})})(w);(function(a){var m=a.addEvent,g=a.Axis,l=a.Chart,f=a.color,q,n=a.each,u=a.extend,r=a.isNumber,e=a.Legend,b=a.LegendSymbolMixin,d=a.noop,h=a.merge,v=a.pick;a.ColorAxis||(q=a.ColorAxis=function(){this.init.apply(this,arguments)},u(q.prototype,g.prototype),u(q.prototype,{defaultColorAxisOptions:{lineWidth:0,
minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(g.prototype.keepProps),init:function(a,c){var k="vertical"!==a.options.legend.layout,b;this.coll="colorAxis";b=h(this.defaultColorAxisOptions,
{side:k?2:1,reversed:!k},c,{opposite:!k,showEmpty:!1,title:null,visible:a.options.legend.enabled});g.prototype.init.call(this,a,b);c.dataClasses&&this.initDataClasses(c);this.initStops();this.horiz=k;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(a){var c=this.chart,k,b=0,p=c.options.chart.colorCount,d=this.options,e=a.dataClasses.length;this.dataClasses=k=[];this.legendItems=[];n(a.dataClasses,function(a,t){a=h(a);k.push(a);a.color||("category"===d.dataClassColor?(t=c.options.colors,
p=t.length,a.color=t[b],a.colorIndex=b,b++,b===p&&(b=0)):a.color=f(d.minColor).tweenTo(f(d.maxColor),2>e?.5:t/(e-1)))})},setTickPositions:function(){if(!this.dataClasses)return g.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];n(this.stops,function(a){a.color=f(a[1])})},setOptions:function(a){g.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,
c=this.chart,k=c.options.legend||{},b,d;a?(this.left=k=a.attr("x"),this.top=b=a.attr("y"),this.width=d=a.attr("width"),this.height=a=a.attr("height"),this.right=c.chartWidth-k-d,this.bottom=c.chartHeight-b-a,this.len=this.horiz?d:a,this.pos=this.horiz?k:b):this.len=(this.horiz?k.symbolWidth:k.symbolHeight)||this.defaultLegendLength},normalizedValue:function(a){this.isLog&&(a=this.val2lin(a));return 1-(this.max-a)/(this.max-this.min||1)},toColor:function(a,c){var k=this.stops,b,p,d=this.dataClasses,
e,h;if(d)for(h=d.length;h--;){if(e=d[h],b=e.from,k=e.to,(void 0===b||a>=b)&&(void 0===k||a<=k)){p=e.color;c&&(c.dataClass=h,c.colorIndex=e.colorIndex);break}}else{a=this.normalizedValue(a);for(h=k.length;h--&&!(a>k[h][0]););b=k[h]||k[h+1];k=k[h+1]||b;a=1-(k[0]-a)/(k[0]-b[0]||1);p=b.color.tweenTo(k.color,a)}return p},getOffset:function(){var a=this.legendGroup,c=this.chart.axisOffset[this.side];a&&(this.axisParent=a,g.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=
this.width),this.chart.axisOffset[this.side]=c)},setLegendColor:function(){var a,c=this.reversed;a=c?1:0;c=c?0:1;a=this.horiz?[a,0,c,0]:[0,c,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:this.stops}},drawLegendSymbol:function(a,c){var k=a.padding,b=a.options,d=this.horiz,p=v(b.symbolWidth,d?this.defaultLegendLength:12),e=v(b.symbolHeight,d?12:this.defaultLegendLength),h=v(b.labelPadding,d?16:30),b=v(b.itemDistance,10);this.setLegendColor();c.legendSymbol=this.chart.renderer.rect(0,
a.baseline-11,p,e).attr({zIndex:1}).add(c.legendGroup);this.legendItemWidth=p+k+(d?b:h);this.legendItemHeight=e+k+(d?h:0)},setState:function(a){n(this.series,function(c){c.setState(a)})},visible:!0,setVisible:d,getSeriesExtremes:function(){var a=this.series,c=a.length;this.dataMin=Infinity;for(this.dataMax=-Infinity;c--;)a[c].getExtremes(),void 0!==a[c].valueMin&&(this.dataMin=Math.min(this.dataMin,a[c].valueMin),this.dataMax=Math.max(this.dataMax,a[c].valueMax))},drawCrosshair:function(a,c){var k=
c&&c.plotX,b=c&&c.plotY,d,e=this.pos,p=this.len;c&&(d=this.toPixels(c[c.series.colorKey]),d<e?d=e-2:d>e+p&&(d=e+p+2),c.plotX=d,c.plotY=this.len-d,g.prototype.drawCrosshair.call(this,a,c),c.plotX=k,c.plotY=b,this.cross&&!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.cross.attr({fill:this.crosshair.color})))},getPlotLinePath:function(a,c,k,b,d){return r(d)?this.horiz?["M",d-4,this.top-6,"L",
d+4,this.top-6,d,this.top,"Z"]:["M",this.left,d,"L",this.left-6,d+6,this.left-6,d-6,"Z"]:g.prototype.getPlotLinePath.call(this,a,c,k,b)},update:function(a,c){var k=this.chart,b=k.legend;n(this.series,function(a){a.isDirtyData=!0});a.dataClasses&&b.allItems&&(n(b.allItems,function(a){a.isDataClass&&a.legendGroup&&a.legendGroup.destroy()}),k.isDirtyLegend=!0);k.options[this.coll]=h(this.userOptions,a);g.prototype.update.call(this,a,c);this.legendItem&&(this.setLegendColor(),b.colorizeItem(this,!0))},
remove:function(){this.legendItem&&this.chart.legend.destroyItem(this);g.prototype.remove.call(this)},getDataClassLegendSymbols:function(){var e=this,c=this.chart,k=this.legendItems,t=c.options.legend,h=t.valueDecimals,v=t.valueSuffix||"",f;k.length||n(this.dataClasses,function(p,t){var q=!0,x=p.from,g=p.to;f="";void 0===x?f="\x3c ":void 0===g&&(f="\x3e ");void 0!==x&&(f+=a.numberFormat(x,h)+v);void 0!==x&&void 0!==g&&(f+=" - ");void 0!==g&&(f+=a.numberFormat(g,h)+v);k.push(u({chart:c,name:f,options:{},
drawLegendSymbol:b.drawRectangle,visible:!0,setState:d,isDataClass:!0,setVisible:function(){q=this.visible=!q;n(e.series,function(a){n(a.points,function(a){a.dataClass===t&&a.setVisible(q)})});c.legend.colorizeItem(this,q)}},p))});return k},name:""}),n(["fill","stroke"],function(b){a.Fx.prototype[b+"Setter"]=function(){this.elem.attr(b,f(this.start).tweenTo(f(this.end),this.pos),null,!0)}}),m(l,"afterGetAxes",function(){var a=this.options.colorAxis;this.colorAxis=[];a&&new q(this,a)}),m(e,"afterGetAllItems",
function(b){var c=[],k=this.chart.colorAxis[0];k&&k.options&&k.options.showInLegend&&(k.options.dataClasses?c=k.getDataClassLegendSymbols():c.push(k),n(k.series,function(c){a.erase(b.allItems,c)}));for(k=c.length;k--;)b.allItems.unshift(c[k])}),m(e,"afterColorizeItem",function(a){a.visible&&a.item.legendColor&&a.item.legendSymbol.attr({fill:a.item.legendColor})}),m(e,"afterUpdate",function(a,c,b){this.chart.colorAxis[0]&&this.chart.colorAxis[0].update({},b)}))})(w);(function(a){var m=a.defined,g=
a.each,l=a.noop,f=a.seriesTypes;a.colorPointMixin={isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setVisible:function(a){var f=this,q=a?"show":"hide";g(["graphic","dataLabel"],function(a){if(f[a])f[a][q]()})},setState:function(f){a.Point.prototype.setState.call(this,f);this.graphic&&this.graphic.attr({zIndex:"hover"===f?1:0})}};a.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group",
"markerGroup","dataLabelsGroup"],getSymbol:l,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:f.column.prototype.pointAttribs,translateColors:function(){var a=this,f=this.options.nullColor,l=this.colorAxis,m=this.colorKey;g(this.data,function(e){var b=e[m];if(b=e.options.color||(e.isNull?f:l&&void 0!==b?l.toColor(b,e):e.color||a.color))e.color=b})},colorAttribs:function(a){var f={};m(a.color)&&(f[this.colorProp||"fill"]=a.color);return f}}})(w);(function(a){function m(a){a&&(a.preventDefault&&
a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)}function g(a){this.init(a)}var l=a.addEvent,f=a.Chart,q=a.doc,n=a.each,u=a.extend,r=a.merge,e=a.pick;g.prototype.init=function(a){this.chart=a;a.mapNavButtons=[]};g.prototype.update=function(b){var d=this.chart,h=d.options.mapNavigation,f,p,c,k,t,x=function(a){this.handler.call(d,a);m(a)},g=d.mapNavButtons;b&&(h=d.options.mapNavigation=r(d.options.mapNavigation,b));for(;g.length;)g.pop().destroy();e(h.enableButtons,h.enabled)&&
!d.renderer.forExport&&a.objectEach(h.buttons,function(a,b){f=r(h.buttonOptions,a);p=f.theme;p.style=r(f.theme.style,f.style);k=(c=p.states)&&c.hover;t=c&&c.select;a=d.renderer.button(f.text,0,0,x,p,k,t,0,"zoomIn"===b?"topbutton":"bottombutton").addClass("highcharts-map-navigation").attr({width:f.width,height:f.height,title:d.options.lang[b],padding:f.padding,zIndex:5}).add();a.handler=f.onclick;a.align(u(f,{width:a.width,height:2*a.height}),null,f.alignTo);l(a.element,"dblclick",m);g.push(a)});this.updateEvents(h)};
g.prototype.updateEvents=function(a){var b=this.chart;e(a.enableDoubleClickZoom,a.enabled)||a.enableDoubleClickZoomTo?this.unbindDblClick=this.unbindDblClick||l(b.container,"dblclick",function(a){b.pointer.onContainerDblClick(a)}):this.unbindDblClick&&(this.unbindDblClick=this.unbindDblClick());e(a.enableMouseWheelZoom,a.enabled)?this.unbindMouseWheel=this.unbindMouseWheel||l(b.container,void 0===q.onmousewheel?"DOMMouseScroll":"mousewheel",function(a){b.pointer.onContainerMouseWheel(a);m(a);return!1}):
this.unbindMouseWheel&&(this.unbindMouseWheel=this.unbindMouseWheel())};u(f.prototype,{fitToBox:function(a,d){n([["x","width"],["y","height"]],function(b){var e=b[0];b=b[1];a[e]+a[b]>d[e]+d[b]&&(a[b]>d[b]?(a[b]=d[b],a[e]=d[e]):a[e]=d[e]+d[b]-a[b]);a[b]>d[b]&&(a[b]=d[b]);a[e]<d[e]&&(a[e]=d[e])});return a},mapZoom:function(a,d,f,g,p){var c=this.xAxis[0],k=c.max-c.min,b=e(d,c.min+k/2),h=k*a,k=this.yAxis[0],q=k.max-k.min,n=e(f,k.min+q/2),q=q*a,b=this.fitToBox({x:b-h*(g?(g-c.pos)/c.len:.5),y:n-q*(p?(p-
k.pos)/k.len:.5),width:h,height:q},{x:c.dataMin,y:k.dataMin,width:c.dataMax-c.dataMin,height:k.dataMax-k.dataMin}),h=b.x<=c.dataMin&&b.width>=c.dataMax-c.dataMin&&b.y<=k.dataMin&&b.height>=k.dataMax-k.dataMin;g&&(c.fixTo=[g-c.pos,d]);p&&(k.fixTo=[p-k.pos,f]);void 0===a||h?(c.setExtremes(void 0,void 0,!1),k.setExtremes(void 0,void 0,!1)):(c.setExtremes(b.x,b.x+b.width,!1),k.setExtremes(b.y,b.y+b.height,!1));this.redraw()}});l(f,"beforeRender",function(){this.mapNavigation=new g(this);this.mapNavigation.update()})})(w);
(function(a){var m=a.extend,g=a.pick,l=a.Pointer;a=a.wrap;m(l.prototype,{onContainerDblClick:function(a){var f=this.chart;a=this.normalize(a);f.options.mapNavigation.enableDoubleClickZoomTo?f.pointer.inClass(a.target,"highcharts-tracker")&&f.hoverPoint&&f.hoverPoint.zoomTo():f.isInsidePlot(a.chartX-f.plotLeft,a.chartY-f.plotTop)&&f.mapZoom(.5,f.xAxis[0].toValue(a.chartX),f.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)},onContainerMouseWheel:function(a){var f=this.chart,g;a=this.normalize(a);g=a.detail||
-(a.wheelDelta/120);f.isInsidePlot(a.chartX-f.plotLeft,a.chartY-f.plotTop)&&f.mapZoom(Math.pow(f.options.mapNavigation.mouseWheelSensitivity,g),f.xAxis[0].toValue(a.chartX),f.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)}});a(l.prototype,"zoomOption",function(a){var f=this.chart.options.mapNavigation;g(f.enableTouchZoom,f.enabled)&&(this.chart.options.chart.pinchType="xy");a.apply(this,[].slice.call(arguments,1))});a(l.prototype,"pinchTranslate",function(a,g,n,l,m,e,b){a.call(this,g,n,l,m,e,b);"map"===
this.chart.options.chart.type&&this.hasZoom&&(a=l.scaleX>l.scaleY,this.pinchTranslateDirection(!a,g,n,l,m,e,b,a?l.scaleX:l.scaleY))})})(w);(function(a){var m=a.colorPointMixin,g=a.each,l=a.extend,f=a.isNumber,q=a.map,n=a.merge,u=a.noop,r=a.pick,e=a.isArray,b=a.Point,d=a.Series,h=a.seriesType,v=a.seriesTypes,p=a.splat;h("map","scatter",{allAreas:!0,animation:!1,nullColor:"#f7f7f7",borderColor:"#cccccc",borderWidth:1,marker:null,stickyTracking:!1,joinBy:"hc-key",dataLabels:{formatter:function(){return this.point.value},
inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},turboThreshold:0,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{halo:null,brightness:.2},select:{color:"#cccccc"}}},n(a.colorSeriesMixin,{type:"map",getExtremesFromAll:!0,useMapGeometry:!0,forceDL:!0,searchPoint:u,directTouch:!0,preserveAspectRatio:!0,pointArrayMap:["value"],getBox:function(c){var b=Number.MAX_VALUE,d=-b,e=b,p=-b,h=b,n=b,l=this.xAxis,v=this.yAxis,q;
g(c||[],function(c){if(c.path){"string"===typeof c.path&&(c.path=a.splitPath(c.path));var k=c.path||[],t=k.length,g=!1,l=-b,x=b,v=-b,A=b,m=c.properties;if(!c._foundBox){for(;t--;)f(k[t])&&(g?(l=Math.max(l,k[t]),x=Math.min(x,k[t])):(v=Math.max(v,k[t]),A=Math.min(A,k[t])),g=!g);c._midX=x+(l-x)*r(c.middleX,m&&m["hc-middle-x"],.5);c._midY=A+(v-A)*r(c.middleY,m&&m["hc-middle-y"],.5);c._maxX=l;c._minX=x;c._maxY=v;c._minY=A;c.labelrank=r(c.labelrank,(l-x)*(v-A));c._foundBox=!0}d=Math.max(d,c._maxX);e=Math.min(e,
c._minX);p=Math.max(p,c._maxY);h=Math.min(h,c._minY);n=Math.min(c._maxX-c._minX,c._maxY-c._minY,n);q=!0}});q&&(this.minY=Math.min(h,r(this.minY,b)),this.maxY=Math.max(p,r(this.maxY,-b)),this.minX=Math.min(e,r(this.minX,b)),this.maxX=Math.max(d,r(this.maxX,-b)),l&&void 0===l.options.minRange&&(l.minRange=Math.min(5*n,(this.maxX-this.minX)/5,l.minRange||b)),v&&void 0===v.options.minRange&&(v.minRange=Math.min(5*n,(this.maxY-this.minY)/5,v.minRange||b)))},getExtremes:function(){d.prototype.getExtremes.call(this,
this.valueData);this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data);this.valueMin=this.dataMin;this.valueMax=this.dataMax;this.dataMin=this.minY;this.dataMax=this.maxY},translatePath:function(a){var c=!1,b=this.xAxis,d=this.yAxis,e=b.min,p=b.transA,b=b.minPixelPadding,h=d.min,g=d.transA,d=d.minPixelPadding,l,n=[];if(a)for(l=a.length;l--;)f(a[l])?(n[l]=c?(a[l]-e)*p+b:(a[l]-h)*g+d,c=!c):n[l]=a[l];return n},setData:function(c,b,h,l){var k=this.options,t=this.chart.options.chart,
v=t&&t.map,x=k.mapData,m=k.joinBy,r=null===m,u=k.keys||this.pointArrayMap,z=[],w={},y=this.chart.mapTransforms;!x&&v&&(x="string"===typeof v?a.maps[v]:v);r&&(m="_i");m=this.joinBy=p(m);m[1]||(m[1]=m[0]);c&&g(c,function(b,d){var p=0;if(f(b))c[d]={value:b};else if(e(b)){c[d]={};!k.keys&&b.length>u.length&&"string"===typeof b[0]&&(c[d]["hc-key"]=b[0],++p);for(var t=0;t<u.length;++t,++p)u[t]&&void 0!==b[p]&&(0<u[t].indexOf(".")?a.Point.prototype.setNestedProperty(c[d],b[p],u[t]):c[d][u[t]]=b[p])}r&&(c[d]._i=
d)});this.getBox(c);(this.chart.mapTransforms=y=t&&t.mapTransforms||x&&x["hc-transform"]||y)&&a.objectEach(y,function(a){a.rotation&&(a.cosAngle=Math.cos(a.rotation),a.sinAngle=Math.sin(a.rotation))});if(x){"FeatureCollection"===x.type&&(this.mapTitle=x.title,x=a.geojson(x,this.type,this));this.mapData=x;this.mapMap={};for(y=0;y<x.length;y++)t=x[y],v=t.properties,t._i=y,m[0]&&v&&v[m[0]]&&(t[m[0]]=v[m[0]]),w[t[m[0]]]=t;this.mapMap=w;c&&m[1]&&g(c,function(a){w[a[m[1]]]&&z.push(w[a[m[1]]])});k.allAreas?
(this.getBox(x),c=c||[],m[1]&&g(c,function(a){z.push(a[m[1]])}),z="|"+q(z,function(a){return a&&a[m[0]]}).join("|")+"|",g(x,function(a){m[0]&&-1!==z.indexOf("|"+a[m[0]]+"|")||(c.push(n(a,{value:null})),l=!1)})):this.getBox(z)}d.prototype.setData.call(this,c,b,h,l)},drawGraph:u,drawDataLabels:u,doFullTranslate:function(){return this.isDirtyData||this.chart.isResizing||this.chart.renderer.isVML||!this.baseTrans},translate:function(){var a=this,b=a.xAxis,d=a.yAxis,e=a.doFullTranslate();a.generatePoints();
g(a.data,function(c){c.plotX=b.toPixels(c._midX,!0);c.plotY=d.toPixels(c._midY,!0);e&&(c.shapeType="path",c.shapeArgs={d:a.translatePath(c.path)})});a.translateColors()},pointAttribs:function(a,b){b=v.column.prototype.pointAttribs.call(this,a,b);b["stroke-width"]=r(a.options[this.pointAttrToOptions&&this.pointAttrToOptions["stroke-width"]||"borderWidth"],"inherit");return b},drawPoints:function(){var a=this,b=a.xAxis,d=a.yAxis,e=a.group,p=a.chart,f=p.renderer,h,l,n,m,q=this.baseTrans,r,u,w,E,F;a.transformGroup||
(a.transformGroup=f.g().attr({scaleX:1,scaleY:1}).add(e),a.transformGroup.survive=!0);a.doFullTranslate()?(p.hasRendered&&g(a.points,function(b){b.shapeArgs&&(b.shapeArgs.fill=a.pointAttribs(b,b.state).fill)}),a.group=a.transformGroup,v.column.prototype.drawPoints.apply(a),a.group=e,g(a.points,function(a){a.graphic&&(a.name&&a.graphic.addClass("highcharts-name-"+a.name.replace(/ /g,"-").toLowerCase()),a.properties&&a.properties["hc-key"]&&a.graphic.addClass("highcharts-key-"+a.properties["hc-key"].toLowerCase()))}),
this.baseTrans={originX:b.min-b.minPixelPadding/b.transA,originY:d.min-d.minPixelPadding/d.transA+(d.reversed?0:d.len/d.transA),transAX:b.transA,transAY:d.transA},this.transformGroup.animate({translateX:0,translateY:0,scaleX:1,scaleY:1})):(h=b.transA/q.transAX,l=d.transA/q.transAY,n=b.toPixels(q.originX,!0),m=d.toPixels(q.originY,!0),.99<h&&1.01>h&&.99<l&&1.01>l&&(l=h=1,n=Math.round(n),m=Math.round(m)),r=this.transformGroup,p.renderer.globalAnimation?(u=r.attr("translateX"),w=r.attr("translateY"),
E=r.attr("scaleX"),F=r.attr("scaleY"),r.attr({animator:0}).animate({animator:1},{step:function(a,b){r.attr({translateX:u+(n-u)*b.pos,translateY:w+(m-w)*b.pos,scaleX:E+(h-E)*b.pos,scaleY:F+(l-F)*b.pos})}})):r.attr({translateX:n,translateY:m,scaleX:h,scaleY:l}));e.element.setAttribute("stroke-width",(a.options[a.pointAttrToOptions&&a.pointAttrToOptions["stroke-width"]||"borderWidth"]||1)/(h||1));this.drawMapDataLabels()},drawMapDataLabels:function(){d.prototype.drawDataLabels.call(this);this.dataLabelsGroup&&
this.dataLabelsGroup.clip(this.chart.clipRect)},render:function(){var a=this,b=d.prototype.render;a.chart.renderer.isVML&&3E3<a.data.length?setTimeout(function(){b.call(a)}):b.call(a)},animate:function(a){var b=this.options.animation,c=this.group,d=this.xAxis,e=this.yAxis,p=d.pos,h=e.pos;this.chart.renderer.isSVG&&(!0===b&&(b={duration:1E3}),a?c.attr({translateX:p+d.len/2,translateY:h+e.len/2,scaleX:.001,scaleY:.001}):(c.animate({translateX:p,translateY:h,scaleX:1,scaleY:1},b),this.animate=null))},
animateDrilldown:function(a){var b=this.chart.plotBox,c=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],d=c.bBox,e=this.chart.options.drilldown.animation;a||(a=Math.min(d.width/b.width,d.height/b.height),c.shapeArgs={scaleX:a,scaleY:a,translateX:d.x,translateY:d.y},g(this.points,function(a){a.graphic&&a.graphic.attr(c.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},e)}),this.animate=null)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,animateDrillupFrom:function(a){v.column.prototype.animateDrillupFrom.call(this,
a)},animateDrillupTo:function(a){v.column.prototype.animateDrillupTo.call(this,a)}}),l({applyOptions:function(a,d){a=b.prototype.applyOptions.call(this,a,d);d=this.series;var c=d.joinBy;d.mapData&&((c=void 0!==a[c[1]]&&d.mapMap[a[c[1]]])?(d.xyFromShape&&(a.x=c._midX,a.y=c._midY),l(a,c)):a.value=a.value||null);return a},onMouseOver:function(c){a.clearTimeout(this.colorInterval);if(null!==this.value||this.series.options.nullInteraction)b.prototype.onMouseOver.call(this,c);else this.series.onMouseOut(c)},
zoomTo:function(){var a=this.series;a.xAxis.setExtremes(this._minX,this._maxX,!1);a.yAxis.setExtremes(this._minY,this._maxY,!1);a.chart.redraw()}},m))})(w);(function(a){var m=a.seriesType,g=a.seriesTypes;m("mapline","map",{lineWidth:1,fillColor:"none"},{type:"mapline",colorProp:"stroke",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,f){a=g.map.prototype.pointAttribs.call(this,a,f);a.fill=this.options.fillColor;return a},drawLegendSymbol:g.line.prototype.drawLegendSymbol})})(w);
(function(a){var m=a.merge,g=a.Point;a=a.seriesType;a("mappoint","scatter",{dataLabels:{enabled:!0,formatter:function(){return this.point.name},crop:!1,defer:!1,overflow:!1,style:{color:"#000000"}}},{type:"mappoint",forceDL:!0},{applyOptions:function(a,f){a=void 0!==a.lat&&void 0!==a.lon?m(a,this.series.chart.fromLatLonToPoint(a)):a;return g.prototype.applyOptions.call(this,a,f)}})})(w);(function(a){var m=a.arrayMax,g=a.arrayMin,l=a.Axis,f=a.color,q=a.each,n=a.isNumber,u=a.noop,r=a.pick,e=a.pInt,
b=a.Point,d=a.Series,h=a.seriesType,v=a.seriesTypes;h("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},animationLimit:250,marker:{lineColor:null,lineWidth:1,fillOpacity:.5,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x",
"y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(a,b){var c=this.options.marker.fillOpacity;a=d.prototype.pointAttribs.call(this,a,b);1!==c&&(a.fill=f(a.fill).setOpacity(c).get("rgba"));return a},getRadii:function(a,b,d,e){var c,k,h,p=this.zData,f=[],g=this.options,t="width"!==g.sizeBy,l=g.zThreshold,m=b-a;k=0;for(c=p.length;k<c;k++)h=p[k],g.sizeByAbsoluteValue&&null!==h&&(h=Math.abs(h-l),b=m=Math.max(b-l,Math.abs(a-
l)),a=0),n(h)?h<a?h=d/2-1:(h=0<m?(h-a)/m:.5,t&&0<=h&&(h=Math.sqrt(h)),h=Math.ceil(d+h*(e-d))/2):h=null,f.push(h);this.radii=f},animate:function(a){!a&&this.points.length<this.options.animationLimit&&(q(this.points,function(a){var b=a.graphic,c;b&&b.width&&(c={x:b.x,y:b.y,width:b.width,height:b.height},b.attr({x:a.plotX,y:a.plotY,width:1,height:1}),b.animate(c,this.options.animation))},this),this.animate=null)},translate:function(){var b,c=this.data,d,e,h=this.radii;v.scatter.prototype.translate.call(this);
for(b=c.length;b--;)d=c[b],e=h?h[b]:0,n(e)&&e>=this.minPxSize/2?(d.marker=a.extend(d.marker,{radius:e,width:2*e,height:2*e}),d.dlBox={x:d.plotX-e,y:d.plotY-e,width:2*e,height:2*e}):d.shapeArgs=d.plotY=d.dlBox=void 0},alignDataLabel:v.column.prototype.alignDataLabel,buildKDTree:u,applyZones:u},{haloPath:function(a){return b.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});l.prototype.beforePadding=function(){var b=this,c=this.len,d=this.chart,h=0,f=c,l=this.isXAxis,
v=l?"xData":"yData",u=this.min,w={},A=Math.min(d.plotWidth,d.plotHeight),C=Number.MAX_VALUE,D=-Number.MAX_VALUE,z=this.max-u,B=c/z,y=[];q(this.series,function(c){var h=c.options;!c.bubblePadding||!c.visible&&d.options.chart.ignoreHiddenSeries||(b.allowZoomOutside=!0,y.push(c),l&&(q(["minSize","maxSize"],function(a){var b=h[a],c=/%$/.test(b),b=e(b);w[a]=c?A*b/100:b}),c.minPxSize=w.minSize,c.maxPxSize=Math.max(w.maxSize,w.minSize),c=a.grep(c.zData,a.isNumber),c.length&&(C=r(h.zMin,Math.min(C,Math.max(g(c),
!1===h.displayNegative?h.zThreshold:-Number.MAX_VALUE))),D=r(h.zMax,Math.max(D,m(c))))))});q(y,function(a){var c=a[v],d=c.length,e;l&&a.getRadii(C,D,a.minPxSize,a.maxPxSize);if(0<z)for(;d--;)n(c[d])&&b.dataMin<=c[d]&&c[d]<=b.dataMax&&(e=a.radii[d],h=Math.min((c[d]-u)*B-e,h),f=Math.max((c[d]-u)*B+e,f))});y.length&&0<z&&!this.isLog&&(f-=c,B*=(c+h-f)/c,q([["min","userMin",h],["max","userMax",f]],function(a){void 0===r(b.options[a[0]],b[a[1]])&&(b[a[0]]+=a[2]/B)}))}})(w);(function(a){var m=a.merge,g=
a.Point,l=a.seriesType,f=a.seriesTypes;f.bubble&&l("mapbubble","bubble",{animationLimit:500,tooltip:{pointFormat:"{point.name}: {point.z}"}},{xyFromShape:!0,type:"mapbubble",pointArrayMap:["z"],getMapData:f.map.prototype.getMapData,getBox:f.map.prototype.getBox,setData:f.map.prototype.setData},{applyOptions:function(a,l){return a&&void 0!==a.lat&&void 0!==a.lon?g.prototype.applyOptions.call(this,m(a,this.series.chart.fromLatLonToPoint(a)),l):f.map.prototype.pointClass.prototype.applyOptions.call(this,
a,l)},isValid:function(){return"number"===typeof this.z},ttBelow:!1})})(w);(function(a){var m=a.colorPointMixin,g=a.each,l=a.merge,f=a.noop,q=a.pick,n=a.Series,u=a.seriesType,r=a.seriesTypes;u("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{hover:{halo:!1,
brightness:.2}}},l(a.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){var a;r.scatter.prototype.init.apply(this,arguments);a=this.options;a.pointRange=q(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||1},translate:function(){var a=this.options,b=this.xAxis,d=this.yAxis,h=a.pointPadding||0,f=function(a,b,d){return Math.min(Math.max(b,a),d)};this.generatePoints();g(this.points,function(e){var c=(a.colsize||
1)/2,k=(a.rowsize||1)/2,g=f(Math.round(b.len-b.translate(e.x-c,0,1,0,1)),-b.len,2*b.len),c=f(Math.round(b.len-b.translate(e.x+c,0,1,0,1)),-b.len,2*b.len),l=f(Math.round(d.translate(e.y-k,0,1,0,1)),-d.len,2*d.len),k=f(Math.round(d.translate(e.y+k,0,1,0,1)),-d.len,2*d.len),m=q(e.pointPadding,h);e.plotX=e.clientX=(g+c)/2;e.plotY=(l+k)/2;e.shapeType="rect";e.shapeArgs={x:Math.min(g,c)+m,y:Math.min(l,k)+m,width:Math.abs(c-g)-2*m,height:Math.abs(k-l)-2*m}});this.translateColors()},drawPoints:function(){r.column.prototype.drawPoints.call(this);
g(this.points,function(a){a.graphic.attr(this.colorAttribs(a))},this)},animate:f,getBox:f,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,alignDataLabel:r.column.prototype.alignDataLabel,getExtremes:function(){n.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;n.prototype.getExtremes.call(this)}}),a.extend({haloPath:function(a){if(!a)return[];var b=this.shapeArgs;return["M",b.x-a,b.y-a,"L",b.x-a,b.y+b.height+a,b.x+b.width+a,b.y+b.height+a,b.x+
b.width+a,b.y-a,"Z"]}},m))})(w);(function(a){function m(a,b){var d,e,f,g=!1,c=a.x,k=a.y;a=0;for(d=b.length-1;a<b.length;d=a++)e=b[a][1]>k,f=b[d][1]>k,e!==f&&c<(b[d][0]-b[a][0])*(k-b[a][1])/(b[d][1]-b[a][1])+b[a][0]&&(g=!g);return g}var g=a.Chart,l=a.each,f=a.extend,q=a.format,n=a.merge,u=a.win,r=a.wrap;g.prototype.transformFromLatLon=function(e,b){if(void 0===u.proj4)return a.error(21),{x:0,y:null};e=u.proj4(b.crs,[e.lon,e.lat]);var d=b.cosAngle||b.rotation&&Math.cos(b.rotation),h=b.sinAngle||b.rotation&&
Math.sin(b.rotation);e=b.rotation?[e[0]*d+e[1]*h,-e[0]*h+e[1]*d]:e;return{x:((e[0]-(b.xoffset||0))*(b.scale||1)+(b.xpan||0))*(b.jsonres||1)+(b.jsonmarginX||0),y:(((b.yoffset||0)-e[1])*(b.scale||1)+(b.ypan||0))*(b.jsonres||1)-(b.jsonmarginY||0)}};g.prototype.transformToLatLon=function(e,b){if(void 0===u.proj4)a.error(21);else{e={x:((e.x-(b.jsonmarginX||0))/(b.jsonres||1)-(b.xpan||0))/(b.scale||1)+(b.xoffset||0),y:((-e.y-(b.jsonmarginY||0))/(b.jsonres||1)+(b.ypan||0))/(b.scale||1)+(b.yoffset||0)};var d=
b.cosAngle||b.rotation&&Math.cos(b.rotation),h=b.sinAngle||b.rotation&&Math.sin(b.rotation);b=u.proj4(b.crs,"WGS84",b.rotation?{x:e.x*d+e.y*-h,y:e.x*h+e.y*d}:e);return{lat:b.y,lon:b.x}}};g.prototype.fromPointToLatLon=function(e){var b=this.mapTransforms,d;if(b){for(d in b)if(b.hasOwnProperty(d)&&b[d].hitZone&&m({x:e.x,y:-e.y},b[d].hitZone.coordinates[0]))return this.transformToLatLon(e,b[d]);return this.transformToLatLon(e,b["default"])}a.error(22)};g.prototype.fromLatLonToPoint=function(e){var b=
this.mapTransforms,d,h;if(!b)return a.error(22),{x:0,y:null};for(d in b)if(b.hasOwnProperty(d)&&b[d].hitZone&&(h=this.transformFromLatLon(e,b[d]),m({x:h.x,y:-h.y},b[d].hitZone.coordinates[0])))return h;return this.transformFromLatLon(e,b["default"])};a.geojson=function(a,b,d){var e=[],g=[],m=function(a){var b,c=a.length;g.push("M");for(b=0;b<c;b++)1===b&&g.push("L"),g.push(a[b][0],-a[b][1])};b=b||"map";l(a.features,function(a){var c=a.geometry,d=c.type,c=c.coordinates;a=a.properties;var h;g=[];"map"===
b||"mapbubble"===b?("Polygon"===d?(l(c,m),g.push("Z")):"MultiPolygon"===d&&(l(c,function(a){l(a,m)}),g.push("Z")),g.length&&(h={path:g})):"mapline"===b?("LineString"===d?m(c):"MultiLineString"===d&&l(c,m),g.length&&(h={path:g})):"mappoint"===b&&"Point"===d&&(h={x:c[0],y:-c[1]});h&&e.push(f(h,{name:a.name||a.NAME,properties:a}))});d&&a.copyrightShort&&(d.chart.mapCredits=q(d.chart.options.credits.mapText,{geojson:a}),d.chart.mapCreditsFull=q(d.chart.options.credits.mapTextFull,{geojson:a}));return e};
r(g.prototype,"addCredits",function(a,b){b=n(!0,this.options.credits,b);this.mapCredits&&(b.href=null);a.call(this,b);this.credits&&this.mapCreditsFull&&this.credits.attr({title:this.mapCreditsFull})})})(w);(function(a){function m(a,b,e,f,c,g,l,m){return["M",a+c,b,"L",a+e-g,b,"C",a+e-g/2,b,a+e,b+g/2,a+e,b+g,"L",a+e,b+f-l,"C",a+e,b+f-l/2,a+e-l/2,b+f,a+e-l,b+f,"L",a+m,b+f,"C",a+m/2,b+f,a,b+f-m/2,a,b+f-m,"L",a,b+c,"C",a,b+c/2,a+c/2,b,a+c,b,"Z"]}var g=a.Chart,l=a.defaultOptions,f=a.each,q=a.extend,n=
a.merge,u=a.pick,r=a.Renderer,e=a.SVGRenderer,b=a.VMLRenderer;q(l.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});l.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,padding:5,style:{fontSize:"15px",fontWeight:"bold"},theme:{"stroke-width":1,"text-align":"center"}},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)},text:"-",y:28}},mouseWheelSensitivity:1.1};a.splitPath=function(a){var b;
a=a.replace(/([A-Za-z])/g," $1 ");a=a.replace(/^\s*/,"").replace(/\s*$/,"");a=a.split(/[ ,]+/);for(b=0;b<a.length;b++)/[a-zA-Z]/.test(a[b])||(a[b]=parseFloat(a[b]));return a};a.maps={};e.prototype.symbols.topbutton=function(a,b,e,f,c){return m(a-1,b-1,e,f,c.r,c.r,0,0)};e.prototype.symbols.bottombutton=function(a,b,e,f,c){return m(a-1,b-1,e,f,0,0,c.r,c.r)};r===b&&f(["topbutton","bottombutton"],function(a){b.prototype.symbols[a]=e.prototype.symbols[a]});a.Map=a.mapChart=function(b,e,f){var d="string"===
typeof b||b.nodeName,c=arguments[d?1:0],k={endOnTick:!1,visible:!1,minPadding:0,maxPadding:0,startOnTick:!1},h,l=a.getOptions().credits;h=c.series;c.series=null;c=n({chart:{panning:"xy",type:"map"},credits:{mapText:u(l.mapText,' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),mapTextFull:u(l.mapTextFull,"{geojson.copyright}")},tooltip:{followTouchMove:!1},xAxis:k,yAxis:n(k,{reversed:!0})},c,{chart:{inverted:!1,alignTicks:!1}});c.series=h;return d?new g(b,c,f):
new g(c,e)}})(w)});