(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[11],{133:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(136);function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,l=!1,r=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(u){l=!0,r=u}finally{try{n||null==c.return||c.return()}finally{if(l)throw r}}return a}}(e,t)||Object(n.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},288:function(e,t,a){"use strict";a.r(t);var n=a(133),l=a(0),r=a.n(l),o=a(63),c=a(54),u=window.$fn,i=[{label:"\u65e0",value:"none"},{label:"\u5b9e\u5fc3\u5706",value:"disc"},{label:"\u7a7a\u5fc3\u5706",value:"circle"},{label:"\u6570\u5b57",value:"decimal"},{label:"\u5c0f\u5199\u5b57\u6bcd",value:"lower-alpha"},{label:"\u5927\u5199\u5b57\u6bcd",value:"upper-alpha"},{label:"\u6c49\u5b57",value:"cjk-ideographic"}];t.default=function(e){var t=e.node,a=r.a.useState(2),l=Object(n.a)(a,2),s=l[0],d=l[1],f=r.a.useState("decimal"),m=Object(n.a)(f,2),p=m[0],b=m[1],v=r.a.useCallback((function(e){if(t){var a=t.querySelector("ul");a&&(a.style.listStyleType=e)}b(e)}),[t]),h=r.a.useCallback((function(){if(s<=0)return u.toast("\u884c\u6570\u5fc5\u987b\u5927\u4e8e 0");o.a.getNode(t).then((function(e){var t=e.node;t.style.height="auto";var a=t.querySelector(".template"),n=document.createElement("ul");n.style.cssText="width:100%;padding-left:2em;list-style:outside ".concat(p);for(var l=document.createDocumentFragment(),r=0;r<s;r++){var o=document.createElement("li");o.className="loopNode",o.style.cssText="padding:5px 0;border-bottom:1px dashed #eee;",o.setAttribute("type","text"),l.appendChild(o)}n.appendChild(l),a.innerHTML="",a.appendChild(n)}))}),[t,s,p]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"fx"},r.a.createElement(c.a.Input,{label:"\u5217\u6570",value:s,onChange:function(e){return d(e)},isHalf:!0}),r.a.createElement(c.a.Select,{label:"\u6837\u5f0f",value:p,data:i,p:"\u9009\u62e9\u6837\u5f0f",isHalf:!0,onChange:v})),r.a.createElement("div",{className:"fx"},r.a.createElement(c.a.Button,{label:"",name:"src",text:"\u751f\u6210\u5217\u8868",onClick:h})))}}}]);