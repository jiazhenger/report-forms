(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[107,106],{49:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(43),r=a(42),s=a(45);t.default=function(e){var t=e._node,a=o.a.useRef(),n=o.a.useRef();o.a.useEffect((function(){l.default.getNodeInfo(t,!1).then((function(e){var t=e._drag;a.current.setValue(t.hasClass("lock")),n.current.setValue(Boolean("absolute"===t.style("position")))}))}),[t]);var f=o.a.useCallback((function(e){l.default.getNodeInfo(t).then((function(t){var a=t._drag;e?a.addClass("lock"):a.removeClass("lock")}))}),[t]),u=o.a.useCallback((function(e){l.default.getNodeInfo(t).then((function(t){var a=t._drag;if(e){var n=a.getInfo(),o=Object(r.default)("#dragContent").getInfo().offsetTop;a.removeClass("darg-rel").style("position","absolute").top(n.offsetTop-o)}else a.addClass("darg-rel").style("position","relative").removeStyle("left,top")}))}),[t]);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(s.default.Switch,{label:"\u9501\u5b9a",ref:a,onChange:f}),o.a.createElement(s.default.Switch,{label:"\u5b9a\u4f4d",ref:n,onChange:u})))}}}]);