(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[0],{102:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(63),u=t(54),s=window.$fn;a.default=function(e){var a=e.node,t=e.tempStyle,n=r.a.useRef(),o=r.a.useRef(),c=r.a.useRef(),f=r.a.useRef();r.a.useEffect((function(){var e=t||{};n.current.setValue(s.toNum(e.padding)),o.current.setValue(s.toNum(e.borderRadius)),c.current.setValue(e.backgroundColor),f.current.setValue(s.toNum(e.opacity))}),[t]);var i=r.a.useCallback((function(e,t){if(a){var n={};for(var r in e)n.label=r,n.value=e[r];l.a.getStyleNode(a).style[n.label]=""===n.value?t||0:isNaN(parseInt(n.value))?n.value:n.value+"px"}else window.$fn.toast("\u672a\u9009\u4e2d\u76ee\u6807")}),[a]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"fx"},r.a.createElement(u.a.Input,{ref:n,label:"\u8865\u767d",name:"padding",onChange:i,isHalf:!0}),r.a.createElement(u.a.Input,{ref:f,label:"\u900f\u660e\u5ea6",name:"opacity",onChange:i,isHalf:!0})),r.a.createElement("div",{className:"fx"},r.a.createElement(u.a.Input,{ref:o,label:"\u5706\u89d2",name:"borderRadius",onChange:i,isHalf:!0}),r.a.createElement(u.a.Input,{ref:c,label:"\u80cc\u666f",name:"backgroundColor",onChange:function(e){return i(e,"transparent")},isHalf:!0})))}}}]);