(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[105,106],{50:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(44),r=(a(43),a(46));t.default=function(e){var t=e._node,a=o.a.useRef(),n=o.a.useRef();o.a.useEffect((function(){l.default.getNodeInfo(t,!1).then((function(e){var t=e._drag;a.current.setValue(t.hasClass("lock")),n.current.setValue(Boolean("absolute"===t.style("position")))}))}),[t]);var s=o.a.useCallback((function(e){l.default.getNodeInfo(t).then((function(t){var a=t._drag;e?a.addClass("lock"):a.removeClass("lock")}))}),[t]),f=o.a.useCallback((function(e){l.default.getNodeInfo(t).then((function(t){var a=t._drag;if(e){var n=a.getInfo(),o=a.parent().getInfo();a.removeClass("darg-rel").style("position","absolute").top(n.offsetTop-o.offsetTop)}else a.addClass("darg-rel").style("position","relative").removeStyle("left,top")}))}),[t]);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(r.default.Switch,{label:"\u9501\u5b9a",ref:a,onChange:s}),o.a.createElement(r.default.Switch,{label:"\u5b9a\u4f4d",ref:n,onChange:f})))}}}]);