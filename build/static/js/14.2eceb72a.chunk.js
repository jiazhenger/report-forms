(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[14],{376:function(e,a,t){"use strict";t.r(a);var l=t(90),n=t(68),r=t(0),o=t.n(r),c=t(55),u=t(50),i=window.$fn,s=[{label:"\u65e0",value:"none"},{label:"\u5b9e\u5fc3\u5706",value:"disc"},{label:"\u7a7a\u5fc3\u5706",value:"circle"},{label:"\u6570\u5b57",value:"decimal"},{label:"\u5c0f\u5199\u5b57\u6bcd",value:"lower-alpha"},{label:"\u5927\u5199\u5b57\u6bcd",value:"upper-alpha"},{label:"\u6c49\u5b57",value:"cjk-ideographic"}],d=[{label:"\u65e0",value:"none"},{label:"\u5b9e",value:"solid"},{label:"\u865a\u7ebf",value:"dashed"},{label:"\u70b9\u7ebf",value:"dotted"}];a.default=function(e){var a=e.node,t=o.a.useState(2),r=Object(n.a)(t,2),f=r[0],b=r[1],m=o.a.useState("decimal"),p=Object(n.a)(m,2),v=p[0],y=p[1],h=o.a.useCallback((function(e){if(a){var t=a.querySelector("ul");t&&(t.style.listStyleType=e)}y(e)}),[a]),S=o.a.useCallback((function(e){if(a){var t,n=a.querySelectorAll("li"),r=Object(l.a)(n);try{for(r.s();!(t=r.n()).done;){t.value.style.borderBottomStyle=e}}catch(o){r.e(o)}finally{r.f()}}}),[a]),g=o.a.useCallback((function(){if(f<=0)return i.toast("\u884c\u6570\u5fc5\u987b\u5927\u4e8e 0");c.a.getNode(a).then((function(e){var a=e.node;a.style.height="auto";var t=a.querySelector(".template"),l=document.createElement("ul");l.style.cssText="width:100%;padding-left:2em;list-style:outside ".concat(v);for(var n=document.createDocumentFragment(),r=0;r<f;r++){var o=document.createElement("li");o.className="loopNode",o.style.cssText="padding:5px 0;border-bottom:1px dashed #eee;",o.setAttribute("type","text"),n.appendChild(o)}l.appendChild(n),t.innerHTML="",t.appendChild(l)}))}),[a,f,v]);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"fx"},o.a.createElement(u.a.Input,{label:"\u5217\u6570",value:f,onChange:function(e){return b(e)},isHalf:!0}),o.a.createElement(u.a.Select,{label:"\u6837\u5f0f",value:v,data:s,p:"\u9009\u62e9\u6837\u5f0f",isHalf:!0,onChange:h})),o.a.createElement("div",{className:"fx"},o.a.createElement(u.a.Select,{label:"\u4e0b\u8fb9\u7ebf",value:"dashed",data:d,p:"\u9009\u62e9\u6837\u5f0f",isHalf:!0,onChange:S})),o.a.createElement("div",{className:"fx"},o.a.createElement(u.a.Button,{label:"",name:"src",text:"\u751f\u6210\u5217\u8868",onClick:g})))}},68:function(e,a,t){"use strict";t.d(a,"a",(function(){return n}));var l=t(89);function n(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],l=!0,n=!1,r=void 0;try{for(var o,c=e[Symbol.iterator]();!(l=(o=c.next()).done)&&(t.push(o.value),!a||t.length!==a);l=!0);}catch(u){n=!0,r=u}finally{try{l||null==c.return||c.return()}finally{if(n)throw r}}return t}}(e,a)||Object(l.a)(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);