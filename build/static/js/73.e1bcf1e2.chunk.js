(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[73,47,58],{164:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,l=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(c){r=!0,l=c}finally{try{n||null==i.return||i.return()}finally{if(r)throw l}}return a}}(e,t)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(t,"a",(function(){return r}))},46:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return E}));var n=a(12),r=a(13),l=a(15),o=a(14),i=a(0),c=a.n(i),u=a(30),s=a(47),d=(a(151),a(154)),f=a(7),h=a(5),p=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={},e.onChange=function(t){var a=e.props,n=a.onChange,r=a.name;e.setState({value:t.target.value},(function(){n&&n(r?Object(h.a)({},r,e.state.value):e.state.value,e.state.value)}))},e.onSearch=function(t){var a=e.props,n=a.onChange,r=a.name;n&&n(r?Object(h.a)({},r,e.state.value):e.state.value,e.state.value)},e.setValue=function(t){null===t&&(t=""),e.setState({value:t})},e.clear=function(){return e.setValue("")},e.getRef=function(){return e.refs.inputRef.input},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.p,a=e.type,n=e.width,r=e.size,l=e.isP,o=e.clear,i=e.style,u=e.isCenter,s=e.readOnly,h=e.className,p=e.mode,b=e.loading,v=e.disabled,m=void 0===this.state.value?this.props.value:this.state.value,g=u?{textAlign:"center"}:null,y={};return"x"===r&&(y={height:"44px",fontSize:"16px"}),c.a.createElement(c.a.Fragment,null,"search"===p&&c.a.createElement(d.a.Search,{ref:"inputRef",className:h||"",allowClear:!1!==o,type:a,size:r||"large",onChange:this.onChange,onSearch:this.onSearch,value:m,style:Object(f.a)(Object(f.a)(Object(f.a)({width:n},y),g),i),placeholder:l?"\u8bf7\u8f93\u5165"+t:t,readOnly:s,disabled:v,loading:b}),!p&&c.a.createElement(d.a,{ref:"inputRef",className:h||"",allowClear:!1!==o,type:a,size:r||"large",onChange:this.onChange,value:m,style:Object(f.a)(Object(f.a)(Object(f.a)({width:n},y),g),i),placeholder:l?"\u8bf7\u8f93\u5165"+t:t,readOnly:s,disabled:v}))}}]),a}(c.a.Component);p.Search=function(e){return c.a.createElement(p,Object.assign({},e,{mode:"search"}))};a(155);var b=a(153),v=window.$fn,m=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={data:[]},e.onChange=function(t,a){var n=e.props,r=n.onChange,l=n.name;e.setState({value:t},(function(){r&&r(l?Object(h.a)({},l,t):t,a)}))},e.setValue=function(t){null===t&&(t=""),e.setState({value:t})},e.clear=function(){return e.setState({value:"",key:e.state.key+1})},e.onDropdownVisibleChange=function(){setTimeout((function(){Array.prototype.slice.call(document.querySelectorAll(".ant-select-dropdown"),0).forEach((function(e){e.addEventListener("mouseup",(function(e){return e.stopPropagation()}))}))}),10)},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.data,a=e.idStr,n=e.nameStr,r=e.p,l=e.width,o=e.size,i=e.style,u=e.isP,s=e.className,d=e.mode,h=e.disabled,p=this.state.key,m=t||this.state.data,g=n||"label",y=a||"value",C=r||"",O=void 0===this.state.value?this.props.value:this.state.value;return c.a.createElement(b.a,{key:p,size:o||"large",onChange:this.onChange,style:Object(f.a)(Object(f.a)({width:l},{}),i),value:O,className:s||"w",placeholder:u?"\u8bf7\u9009\u62e9"+C:C,disabled:!v.hasArray(m)||h,mode:d,onDropdownVisibleChange:this.onDropdownVisibleChange,showSearch:!0,allowClear:!0},v.hasArray(m)&&m.map((function(e,t){return c.a.createElement(c.a.Fragment,{key:t},e.group?c.a.createElement(b.a.OptGroup,{key:t,label:e.group},v.hasArray(e.children)&&e.children.map((function(e,t){return c.a.createElement(b.a.Option,{key:e[y],value:e[y],style:{marginRight:"20px"}},e[g])}))):c.a.createElement(b.a.Option,{key:t,value:e[y],style:{marginRight:"20px"}},e[g]))})))}}]),a}(c.a.Component),g=(a(152),a(156)),y=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={},e.onChange=function(t){var a=e.props,n=a.onChange,r=a.name,l=a.bool;e.setState({value:t},(function(){var a=l?t:e.state.value;n&&n(r?Object(h.a)({},r,a):a)}))},e.setValue=function(t){return e.setState({value:t})},e.clear=function(){return e.setValue(!1)},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.size,a=e.disabled,n=e.onClick,r=e.loading,l=e.bool,o=void 0===this.state.value?this.props.value:this.state.value,i=null;return i=l?o:0===o||!0===o,c.a.createElement(g.a,{size:t||"large",onChange:n?null:this.onChange,onClick:n,checked:i,disabled:a,loading:r})}}]),a}(c.a.Component),C=Object(u.a)((function(){return a.e(82).then(a.bind(null,273))})),O=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).setValue=function(t){return e.refs.switch.setValue(t)},e.getValue=function(){return e.refs.switch.state.value},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.value,n=e.name,r=e.onChange,l=e.disabled;return c.a.createElement(s.default,{label:t},c.a.createElement(y,{ref:"switch",size:"small",name:n,value:a,onChange:r,disabled:l}))}}]),a}(c.a.Component),j=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).setValue=function(t){return e.refs.select.setValue(t)},e.getValue=function(){return e.refs.select.state.value},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.value,n=e.name,r=e.onChange,l=e.disabled,o=e.isHalf,i=e.p,u=e.data;return c.a.createElement(s.default,{isHalf:o,label:t},c.a.createElement(m,{ref:"select",data:u,p:i,size:"small",name:n,value:a,onChange:r,disabled:l}))}}]),a}(c.a.Component),w=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).setValue=function(t){return e.refs.input.setValue(t)},e.clear=function(t){return e.refs.input.clear()},e.getValue=function(){return e.refs.input.state.value},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.value,n=e.name,r=e.onChange,l=e.disabled,o=e.readOnly,i=e.isHalf,u=e.labelWidth,d=e.size,f=e.suffix,h=e.p;return c.a.createElement(s.default,{isHalf:i,label:t,labelWidth:u,suffix:f},c.a.createElement(p,{ref:"input",p:h,size:d||"small",name:n,value:a,onChange:r,disabled:l,readOnly:o}))}}]),a}(c.a.Component),E=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.value;return c.a.createElement(s.default,{label:t,value:a})}}]),a}(c.a.Component);E.Switch=O,E.Input=w,E.Select=j,E.Button=function(e){var t=e.label,a=e.name,n=e.onClick,r=e.isHalf,l=e.text,o=e.disabled,i=e.width;return c.a.createElement(s.default,{isHalf:r,label:t},c.a.createElement(C,{size:"small",width:i,name:a,label:l,onClick:n,disabled:o}))}},47:function(e,t,a){"use strict";a.r(t);var n=a(7),r=a(0),l=a.n(r);t.default=function(e){var t=e.label,a=e.children,r=(e.onClick,e.suffix),o=e.isHalf,i=e.labelWidth,c=o?{width:"50%"}:{};return l.a.createElement("div",{className:"ns-list fxm",style:Object(n.a)({padding:"2px 0"},c)},(t||""===t)&&l.a.createElement("h3",{className:"mr5 tr f12",style:{width:i||"45px"}},t),l.a.createElement("span",{className:t?"":"vh"},":"),l.a.createElement("aside",{className:"ml5 ex"},a),r&&l.a.createElement("div",{className:"ml5"},r))}},73:function(e,t,a){"use strict";a.r(t);var n=a(7),r=a(164),l=a(0),o=a.n(l),i=a(169),c=a.n(i),u=a(44),s=a(45),d=a(46),f=window.$fn;t.default=function(e){var t=e._node,a=o.a.useState({}),l=Object(r.a)(a,2),i=l[0],h=l[1],p=o.a.useRef(),b=o.a.useRef(),v=o.a.useRef(),m=o.a.useRef(),g=o.a.useRef(),y=o.a.useRef();o.a.useEffect((function(){u.default.getNodeInfo(t,!1).then((function(e){e._drag;var a=t.find("img"),n=a.attr("code");if(n){var r=a.attr("lineColor")||s.barcode.lineColor,l=a.attr("codeWidth")||s.barcode.codeWidth,o=a.attr("codeHeight")||s.barcode.codeHeight,i=a.attr("fontSize")||s.barcode.fontSize,c=Boolean(a.attr("displayValue"));c=!!c&&s.barcode.displayValue,p.current.setValue(n),b.current.setValue(r),v.current.setValue(l),m.current.setValue(o),g.current.setValue(c),y.current.setValue(i),h({code:n,lineColor:r,width:l,height:o,displayValue:c})}}))}),[t]);var C=o.a.useCallback((function(e){h(Object(n.a)(Object(n.a)({},i),e))}),[i]),O=o.a.useCallback((function(e,a,r){u.default.getNodeInfo(t).then((function(e){var t=e._drag;if(!f.isValid(i.code))return f.toast("\u6761\u5f62\u7801\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");var a=t.find("img").width("100%").height("100%").attr("temp",1);t.height("auto");var r=a.attr("code");r?(i.lineColor?a.attr("lineColor",i.lineColor):a.removeAttr("lineColor"),i.width?a.attr("codeWidth",i.width):a.removeAttr("codeWidth"),i.height?a.attr("codeHeight",i.height):a.removeAttr("codeHeight"),i.displayValue?a.attr("displayValue",i.displayValue):a.removeAttr("displayValue"),i.fontSize?a.attr("fontSize",i.fontSize):a.removeAttr("fontSize")):(a.attr({lineColor:s.barcode.lineColor,codeWidth:s.barcode.width,codeHeight:s.barcode.height,displayValue:s.barcode.displayValue,fontSize:s.barcode.fontSize}),b.current.setValue(s.barcode.lineColor),v.current.setValue(s.barcode.width),m.current.setValue(s.barcode.height),g.current.setValue(s.barcode.displayValue),y.current.setValue(s.barcode.fontSize),h(Object(n.a)(Object(n.a)({},s.barcode),{},{code:i.code})));var l=r?i:s.barcode,o=Object(n.a)(Object(n.a)({},l),{},{font:"OCR-B"});for(var u in o)f.isValid(o[u])||delete o[u];i.code?a.attr("code",i.code):a.removeAttr("code");try{c()(a.el,i.code,o)}catch(d){f.toast("\u6761\u5f62\u7801\u5185\u5bb9\u4e0d\u5408\u6cd5")}}))}),[i,t]);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(d.default.Input,{label:"\u5185\u5bb9",ref:p,name:"code",onChange:C})),o.a.createElement("div",{className:"fx"},o.a.createElement(d.default.Input,{label:"\u5bbd\u5ea6",ref:v,name:"width",onChange:C,isHalf:!0}),o.a.createElement(d.default.Input,{label:"\u9ad8\u5ea6",ref:m,name:"height",onChange:C,isHalf:!0})),o.a.createElement("div",{className:"fx"},o.a.createElement(d.default.Input,{label:"\u5b57\u4f53",ref:y,name:"fontSize",onChange:C,isHalf:!0}),o.a.createElement(d.default.Input,{label:"\u989c\u8272",ref:b,name:"lineColor",onChange:C,isHalf:!0})),o.a.createElement("div",{className:"fx"},o.a.createElement(d.default.Switch,{label:"\u5185\u5bb9",ref:g,name:"displayValue",onChange:C,isHalf:!0})),o.a.createElement("div",null,o.a.createElement(d.default.Button,{label:"",text:"\u751f\u6210\u6761\u5f62\u7801",onClick:O})))}}}]);