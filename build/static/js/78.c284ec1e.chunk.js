(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[78,67],{48:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(44),u=a(43),f=a(42),i=a(45),c=a(59),o=a(50),s=window.$fn;t.default=function(e){var t=e._node,a=r.a.useRef(),n=r.a.useRef(),m=r.a.useRef(),d=r.a.useRef(),g=r.a.useRef(),h=r.a.useRef(),p=r.a.useRef(),v=r.a.useRef();r.a.useEffect((function(){u.default.getNodeInfo(t,!1).then((function(e){var t=e._drag,r=t.getStyle(!0);a.current.setValue(r.left),n.current.setValue(r.top),m.current.setValue(t.outerWidth()),d.current.setValue(t.outerHeight()),g.current.setValue(s.toNum(r.zIndex)),h.current.setValue("100%"===t.style("width")),v.current.setValue(!t.hasStyle("height"));var l=(t.parent(".drag").outerWidth()-t.outerWidth())/2;p.current.setValue(t.left()===l)}))}),[t]);var E=r.a.useCallback((function(e,a){u.default.getNodeInfo(t).then((function(t){var a=t._drag,n=f.default.getKeyValue(e),r=n.key,l=n.value;a.style([r],l)}))}),[t]),b=r.a.useCallback((function(e){u.default.getNodeInfo(t).then((function(t){var a=t._drag;e?a.removeStyle("left").width("100%"):a.removeStyle("width")}))}),[t]),N=r.a.useCallback((function(e){u.default.getNodeInfo(t).then((function(t){var a=t._drag;if(e){var n=a.parent(".drag").outerWidth(),r=a.outerWidth(),u=(n-r)/2,f=u%l.axesSpace;a.left(u-f).width(r-(f?10:0)).attr("center",1)}else a.left(0).removeAttr("center")}))}),[t]),I=r.a.useCallback((function(e){u.default.getNodeInfo(t).then((function(t){var a=t._drag;e&&a.removeStyle("height")}))}),[t]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.default,{title:"\u5c3a\u5bf8",first:!0},r.a.createElement("div",{className:"fx"},r.a.createElement(i.default.Input,{label:"\u5bbd",ref:m,name:"width",onChange:function(e){return E(e,"px")},isHalf:!0}),r.a.createElement(i.default.Input,{label:"\u9ad8",ref:d,name:"height",onChange:function(e){return E(e,"px")},isHalf:!0}))),r.a.createElement(o.default,{title:"\u4f4d\u7f6e"},r.a.createElement("div",{className:"fx"},r.a.createElement(i.default.Input,{label:"\u5de6",ref:a,name:"left",onChange:function(e){return E(e,"px")},isHalf:!0}),r.a.createElement(i.default.Input,{label:"\u4e0a",ref:n,name:"top",onChange:function(e){return E(e,"px")},isHalf:!0})),r.a.createElement("div",{className:"fx"},r.a.createElement(i.default.Input,{label:"\u5c42\u7ea7",ref:g,name:"zIndex",onChange:function(e){return E(e,"")},isHalf:!0}))),r.a.createElement(c.default,{_node:t}),r.a.createElement(o.default,{title:"\u63a7\u5236"},r.a.createElement("div",{className:"fxj"},r.a.createElement(i.default.Switch,{label:"\u5168\u5c4f",ref:h,onChange:b}),r.a.createElement(i.default.Switch,{label:"\u5c45\u4e2d",ref:p,onChange:N}),r.a.createElement(i.default.Switch,{label:"\u81ea\u52a8\u9ad8",ref:v,onChange:I}))))}},50:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n);t.default=function(e){var t=e.title,a=e.children,n=e.first?{}:{borderTop:"1px solid #eee"};return r.a.createElement("fieldset",{style:n},r.a.createElement("legend",{style:{display:"block"},className:"f12 tc plr10 c0"},t),a)}},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(43),u=a(42),f=a(45),i=a(50),c=window.$fn;t.default=function(e){var t=e._node,a=r.a.useRef(),n=r.a.useRef(),o=r.a.useRef(),s=r.a.useRef(),m=r.a.useRef(),d=r.a.useRef(),g=r.a.useRef();r.a.useEffect((function(){l.default.getNodeInfo(t,!1).then((function(e){var t=e._drag,r=t.getStyle(!0);a.current.setValue(c.toNum(r.marginTop)),n.current.setValue(c.toNum(r.marginBottom)),o.current.setValue(c.toNum(r.marginLeft)),s.current.setValue(c.toNum(r.marginRight));var l=t.style("margin");if(u.default.isString(l)){var f=l.split(" ");2===f.length?(0===+f[0]&&m.current.setValue(c.toNum(f[0])),0===+f[1]&&d.current.setValue(c.toNum(f[1]))):g.current.setValue(c.toNum(l))}}))}),[t]);var h=r.a.useCallback((function(e,a){l.default.getNodeInfo(t).then((function(t){var n=t._drag,r=u.default.getKeyValue(e),l=r.key,f=r.value,i=parseInt(f)+"px";n.removeStyle("margin,marginTop,marginLeft,marginRight,marginBottom"),a&&("h"===a?(i="0 "+i,"100%"===n.style("width")&&n.removeStyle("width")):"v"===a&&(i+=" 0")),n.style([l],i)}))}),[t]);return r.a.createElement(i.default,{title:"\u8fb9\u8ddd"},r.a.createElement("div",{className:"fx"},r.a.createElement(f.default.Input,{label:"\u4e0a",ref:a,name:"marginTop",onChange:function(e){return h(e)},isHalf:!0}),r.a.createElement(f.default.Input,{label:"\u4e0b",ref:n,name:"marginBottom",onChange:function(e){return h(e)},isHalf:!0})),r.a.createElement("div",{className:"fx"},r.a.createElement(f.default.Input,{label:"\u5de6",ref:o,name:"marginLeft",onChange:function(e){return h(e)},isHalf:!0}),r.a.createElement(f.default.Input,{label:"\u53f3",ref:s,name:"marginRight",onChange:function(e){return h(e)},isHalf:!0})),r.a.createElement("div",{className:"fx"},r.a.createElement(f.default.Input,{label:"\u6c34\u5e73",ref:m,p:"\u6c34\u5e73",name:"margin",onChange:function(e){return h(e,"h")},isHalf:!0}),r.a.createElement(f.default.Input,{label:"\u5782\u76f4",ref:d,p:"\u5782\u76f4",name:"margin",onChange:function(e){return h(e,"v")},isHalf:!0})),r.a.createElement("div",{className:"fx"},r.a.createElement(f.default.Input,{label:"\u56db\u8fb9",ref:g,p:"\u56db\u8fb9",name:"margin",onChange:function(e){return h(e,"all")},isHalf:!0})))}}}]);