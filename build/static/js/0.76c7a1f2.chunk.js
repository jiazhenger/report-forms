(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[0],{71:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(55),u=t(50),o=window.$fn;a.default=function(e){var a=e.node,t=e.tempStyle,n=r.a.useRef(),s=r.a.useRef(),c=r.a.useRef(),f=r.a.useRef();r.a.useEffect((function(){var e=t||{};n.current.setValue(o.toNum(e.padding)),s.current.setValue(o.toNum(e.borderRadius)),c.current.setValue(e.backgroundColor),f.current.setValue(o.toNum(e.opacity))}),[t]);var i=r.a.useCallback((function(e,t){l.a.getNode(a).then((function(a){var n=a.node,r={};for(var u in e)r.label=u,r.value=e[u];l.a.getStyleNode(n).style[r.label]=""===r.value?t||0:isNaN(parseInt(r.value))?r.value:r.value+"px"}))}),[a]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"fx"},r.a.createElement(u.a.Input,{ref:n,label:"\u8865\u767d",name:"padding",onChange:i,isHalf:!0}),r.a.createElement(u.a.Input,{ref:f,label:"\u900f\u660e\u5ea6",name:"opacity",onChange:i,isHalf:!0})),r.a.createElement("div",{className:"fx"},r.a.createElement(u.a.Input,{ref:s,label:"\u5706\u89d2",name:"borderRadius",onChange:i,isHalf:!0}),r.a.createElement(u.a.Input,{ref:c,label:"\u80cc\u666f",name:"backgroundColor",onChange:function(e){return i(e,"transparent")},isHalf:!0})))}}}]);