(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[87],{165:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,l=!1,r=void 0;try{for(var o,d=e[Symbol.iterator]();!(n=(o=d.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(u){l=!0,r=u}finally{try{n||null==d.return||d.return()}finally{if(l)throw r}}return a}}(e,t)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(t,"a",(function(){return l}))},77:function(e,t,a){"use strict";a.r(t);var n=a(18),l=a(165),r=a(0),o=a.n(r),d=a(43),u=a(47),f=a(42),c=a(44),i=a(45),s=window.$fn,b=[{label:"\u4e0b\u8fb9\u5b9e\u7ebf",value:"solid"},{label:"\u4e0b\u8fb9\u865a\u7ebf",value:"dashed"},{label:"\u4e0b\u8fb9\u70b9\u7ebf",value:"dotted"}],h=[{label:"\u4e0a\u4e0b\u65e0\u8fb9\u6846",value:"vsides"},{label:"\u4e24\u4fa7\u65e0\u8fb9\u6846",value:"hsides"},{label:"\u56db\u8fb9\u65e0\u8fb9\u6846",value:"box"}];t.default=function(e){var t=e._node,a=o.a.useState(3),r=Object(l.a)(a,2),m=r[0],g=r[1],y=o.a.useState(1),v=Object(l.a)(y,2),p=v[0],C=v[1],N=o.a.useState(!0),x=Object(l.a)(N,2),w=x[0],E=x[1],k=o.a.useState(!0),j=Object(l.a)(k,1)[0],O=o.a.useRef(),I=o.a.useRef(),S=o.a.useRef(),B=o.a.useRef(),V=o.a.useRef(),_=o.a.useRef();o.a.useEffect((function(){if(t){var e=t.find("table");if(e.el){var a=e.find("tbody");if(a.children().length()>0){var n=a.find("tr"),l=a.finds("tr").length(),r=n.finds("td").length(),o=n.find("td"),d=o.style("borderColor");d||(d=o.style("borderBottomColor"));var u=Boolean(e.find("thead").el);O.current.setValue(l),I.current.setValue(r),S.current.setValue(d),B.current.setValue(e.attr("xframe")),V.current.setValue(e.attr("xborder")),_.current.setValue(u),C(l),g(r),E(u)}}}}),[t]);var R=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(t){var a=t._drag.find("table");if(e){var l=u.default.createThead({col:a.find("tr").children().length(),th:{style:Object(n.a)(Object(n.a)({},c.tableConfig.style),{},{border:"1px solid "+S.current.getValue(),background:"#f5f5f5"}),attr:{type:"text"},className:"loopNode"}});a.append(l)}else a.find("thead").remove()}))}),[t]),H=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(t){var a=t._drag.find("table");u.default.showHideBorder(a,e,S.current.getValue())}))}),[t]),A=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(t){var a=t._drag.find("table").attr("xframe",e);u.default.showHideBorder(a,V.current.getValue(),S.current.getValue()),"hsides"!==e&&"box"!==e||(a.finds("tr").each((function(e){return e.first().style("borderLeft","none")})),a.finds("tr").each((function(e){return e.last().style("borderRight","none")}))),"vsides"!==e&&"box"!==e||(w?a.find("thead").finds("th").style("borderTop",0):a.first().finds("td").style("borderTop",0),a.find("tbody").last().finds("td").style("borderBottom","none"))}))}),[t,w]),T=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(t){var a=t._drag.find("table").attr("xborder",e),n=S.current.getValue();u.default.setBottomBorder(a,V.current.getValue(),n)}))}),[t]),J=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(t){var a=t._drag;u.default.setBorderColor(a.find("table"),e)}))}),[t]),$=o.a.useCallback((function(){return p<=0?s.toast("\u884c\u6570\u5fc5\u987b\u5927\u4e8e 0"):m<=0?s.toast("\u5217\u6570\u5fc5\u987b\u5927\u4e8e 0"):void d.default.getNodeInfo(t).then((function(e){var t=e._drag,a=e._temp;t.removeStyle("height");var l=c.tableConfig.style,r=u.default.create({row:p,col:m,thead:_.current.getValue()?{th:{style:Object(n.a)({background:"#f5f5f5"},l),className:"loopNode",attr:{type:"text"}}}:null,tbody:{td:{style:l,className:"loopNode",attr:{type:"text"}}}});a.html("").append(r),u.default.showHideBorder(Object(f.default)(r),j,S.current.getValue())}))}),[t,m,p,j]),F=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(e){var t=e._temp.find("table");u.default.addRow(t,{td:{style:Object(n.a)(Object(n.a)({},c.tableConfig.style),{},{borderColor:t.find("tbody").find("td").style("borderColor")}),className:"loopNode",attr:{type:"text"}}})}))}),[t]),L=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(e){var t=e._temp;u.default.delRow(t.find("table"))}))}),[t]),M=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(e){var t=e._temp.find("table"),a=c.tableConfig.style,l=t.find("tbody").find("td").style("borderColor");u.default.addCol(t,{thead:{th:{style:Object(n.a)(Object(n.a)({background:"#f5f5f5"},a),{},{borderColor:l}),className:"loopNode",attr:{type:"text"}}},tbody:{td:{style:Object(n.a)(Object(n.a)({},a),{},{borderColor:l}),className:"loopNode",attr:{type:"text"}}}})}))}),[t]),U=o.a.useCallback((function(e){d.default.getNodeInfo(t).then((function(e){var t=e._temp;u.default.delCol(t.find("table"))}))}),[t]);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"fx"},o.a.createElement(i.default.Input,{label:"\u884c",ref:O,value:p,onChange:function(e){return C(e)},isHalf:!0}),o.a.createElement(i.default.Input,{label:"\u5217",ref:I,value:m,onChange:function(e){return g(e)},isHalf:!0})),o.a.createElement("div",{className:"fx"},o.a.createElement(i.default.Select,{label:"\u4e0b\u8fb9",ref:V,data:b,isHalf:!0,onChange:T}),o.a.createElement(i.default.Select,{label:"\u5916\u4fa7\u6846",ref:B,data:h,isHalf:!0,onChange:A})),o.a.createElement("div",null,o.a.createElement(i.default.Input,{label:"\u989c\u8272",ref:S,p:"\u8f93\u5165\u989c\u8272",onChange:J})),o.a.createElement("div",{className:"fx"},o.a.createElement(i.default.Switch,{ref:_,label:"\u8868\u5934",onChange:R}),o.a.createElement(i.default.Switch,{value:j,label:"\u8fb9\u6846",onChange:H})),o.a.createElement("div",{className:"fx"},o.a.createElement(i.default.Button,{label:"",text:"\u751f\u6210\u8868\u683c",width:65,onClick:$}),o.a.createElement(i.default.Button,{text:"\u6dfb\u52a0\u884c",width:65,onClick:F}),o.a.createElement(i.default.Button,{text:"\u6dfb\u52a0\u5217",width:65,onClick:M})),o.a.createElement("div",{className:"fx"},o.a.createElement(i.default.Button,{label:"",text:"\u5220\u9664\u884c",width:65,onClick:L}),o.a.createElement(i.default.Button,{text:"\u5220\u9664\u5217",width:65,onClick:U})))}}}]);