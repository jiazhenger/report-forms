(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[15,47,52,58,83,84],{164:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,l=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(o){r=!0,l=o}finally{try{n||null==c.return||c.return()}finally{if(r)throw l}}return a}}(e,t)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(t,"a",(function(){return r}))},46:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return k}));var n=a(12),r=a(13),l=a(15),i=a(14),c=a(0),o=a.n(c),u=a(30),s=a(47),f=(a(151),a(154)),d=a(7),h=a(5),p=function(e){Object(l.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).state={},e.onChange=function(t){var a=e.props,n=a.onChange,r=a.name;e.setState({value:t.target.value},(function(){n&&n(r?Object(h.a)({},r,e.state.value):e.state.value,e.state.value)}))},e.onSearch=function(t){var a=e.props,n=a.onChange,r=a.name;n&&n(r?Object(h.a)({},r,e.state.value):e.state.value,e.state.value)},e.setValue=function(t){null===t&&(t=""),e.setState({value:t})},e.clear=function(){return e.setValue("")},e.getRef=function(){return e.refs.inputRef.input},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.p,a=e.type,n=e.width,r=e.size,l=e.isP,i=e.clear,c=e.style,u=e.isCenter,s=e.readOnly,h=e.className,p=e.mode,b=e.loading,v=e.disabled,g=void 0===this.state.value?this.props.value:this.state.value,m=u?{textAlign:"center"}:null,y={};return"x"===r&&(y={height:"44px",fontSize:"16px"}),o.a.createElement(o.a.Fragment,null,"search"===p&&o.a.createElement(f.a.Search,{ref:"inputRef",className:h||"",allowClear:!1!==i,type:a,size:r||"large",onChange:this.onChange,onSearch:this.onSearch,value:g,style:Object(d.a)(Object(d.a)(Object(d.a)({width:n},y),m),c),placeholder:l?"\u8bf7\u8f93\u5165"+t:t,readOnly:s,disabled:v,loading:b}),!p&&o.a.createElement(f.a,{ref:"inputRef",className:h||"",allowClear:!1!==i,type:a,size:r||"large",onChange:this.onChange,value:g,style:Object(d.a)(Object(d.a)(Object(d.a)({width:n},y),m),c),placeholder:l?"\u8bf7\u8f93\u5165"+t:t,readOnly:s,disabled:v}))}}]),a}(o.a.Component);p.Search=function(e){return o.a.createElement(p,Object.assign({},e,{mode:"search"}))};a(155);var b=a(153),v=window.$fn,g=function(e){Object(l.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).state={data:[]},e.onChange=function(t,a){var n=e.props,r=n.onChange,l=n.name;e.setState({value:t},(function(){r&&r(l?Object(h.a)({},l,t):t,a)}))},e.setValue=function(t){null===t&&(t=""),e.setState({value:t})},e.clear=function(){return e.setState({value:"",key:e.state.key+1})},e.onDropdownVisibleChange=function(){setTimeout((function(){Array.prototype.slice.call(document.querySelectorAll(".ant-select-dropdown"),0).forEach((function(e){e.addEventListener("mouseup",(function(e){return e.stopPropagation()}))}))}),10)},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.data,a=e.idStr,n=e.nameStr,r=e.p,l=e.width,i=e.size,c=e.style,u=e.isP,s=e.className,f=e.mode,h=e.disabled,p=this.state.key,g=t||this.state.data,m=n||"label",y=a||"value",O=r||"",j=void 0===this.state.value?this.props.value:this.state.value;return o.a.createElement(b.a,{key:p,size:i||"large",onChange:this.onChange,style:Object(d.a)(Object(d.a)({width:l},{}),c),value:j,className:s||"w",placeholder:u?"\u8bf7\u9009\u62e9"+O:O,disabled:!v.hasArray(g)||h,mode:f,onDropdownVisibleChange:this.onDropdownVisibleChange,showSearch:!0,allowClear:!0},v.hasArray(g)&&g.map((function(e,t){return o.a.createElement(o.a.Fragment,{key:t},e.group?o.a.createElement(b.a.OptGroup,{key:t,label:e.group},v.hasArray(e.children)&&e.children.map((function(e,t){return o.a.createElement(b.a.Option,{key:e[y],value:e[y],style:{marginRight:"20px"}},e[m])}))):o.a.createElement(b.a.Option,{key:t,value:e[y],style:{marginRight:"20px"}},e[m]))})))}}]),a}(o.a.Component),m=(a(152),a(156)),y=function(e){Object(l.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).state={},e.onChange=function(t){var a=e.props,n=a.onChange,r=a.name,l=a.bool;e.setState({value:t},(function(){var a=l?t:e.state.value;n&&n(r?Object(h.a)({},r,a):a)}))},e.setValue=function(t){return e.setState({value:t})},e.clear=function(){return e.setValue(!1)},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.size,a=e.disabled,n=e.onClick,r=e.loading,l=e.bool,i=void 0===this.state.value?this.props.value:this.state.value,c=null;return c=l?i:0===i||!0===i,o.a.createElement(m.a,{size:t||"large",onChange:n?null:this.onChange,onClick:n,checked:c,disabled:a,loading:r})}}]),a}(o.a.Component),O=Object(u.a)((function(){return a.e(82).then(a.bind(null,273))})),j=function(e){Object(l.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).setValue=function(t){return e.refs.switch.setValue(t)},e.getValue=function(){return e.refs.switch.state.value},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.value,n=e.name,r=e.onChange,l=e.disabled;return o.a.createElement(s.default,{label:t},o.a.createElement(y,{ref:"switch",size:"small",name:n,value:a,onChange:r,disabled:l}))}}]),a}(o.a.Component),C=function(e){Object(l.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).setValue=function(t){return e.refs.select.setValue(t)},e.getValue=function(){return e.refs.select.state.value},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.value,n=e.name,r=e.onChange,l=e.disabled,i=e.isHalf,c=e.p,u=e.data;return o.a.createElement(s.default,{isHalf:i,label:t},o.a.createElement(g,{ref:"select",data:u,p:c,size:"small",name:n,value:a,onChange:r,disabled:l}))}}]),a}(o.a.Component),w=function(e){Object(l.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).setValue=function(t){return e.refs.input.setValue(t)},e.clear=function(t){return e.refs.input.clear()},e.getValue=function(){return e.refs.input.state.value},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.value,n=e.name,r=e.onChange,l=e.disabled,i=e.readOnly,c=e.isHalf,u=e.labelWidth,f=e.size,d=e.suffix,h=e.p;return o.a.createElement(s.default,{isHalf:c,label:t,labelWidth:u,suffix:d},o.a.createElement(p,{ref:"input",p:h,size:f||"small",name:n,value:a,onChange:r,disabled:l,readOnly:i}))}}]),a}(o.a.Component),k=function(e){Object(l.a)(a,e);var t=Object(i.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.value;return o.a.createElement(s.default,{label:t,value:a})}}]),a}(o.a.Component);k.Switch=j,k.Input=w,k.Select=C,k.Button=function(e){var t=e.label,a=e.name,n=e.onClick,r=e.isHalf,l=e.text,i=e.disabled,c=e.width;return o.a.createElement(s.default,{isHalf:r,label:t},o.a.createElement(O,{size:"small",width:c,name:a,label:l,onClick:n,disabled:i}))}},47:function(e,t,a){"use strict";a.r(t);var n=a(7),r=a(0),l=a.n(r);t.default=function(e){var t=e.label,a=e.children,r=(e.onClick,e.suffix),i=e.isHalf,c=e.labelWidth,o=i?{width:"50%"}:{};return l.a.createElement("div",{className:"ns-list fxm",style:Object(n.a)({padding:"2px 0"},o)},(t||""===t)&&l.a.createElement("h3",{className:"mr5 tr f12",style:{width:c||"45px"}},t),l.a.createElement("span",{className:t?"":"vh"},":"),l.a.createElement("aside",{className:"ml5 ex"},a),r&&l.a.createElement("div",{className:"ml5"},r))}},57:function(e,t,a){"use strict";a.r(t);var n=a(5),r=a(7),l=a(44),i=a(43),c=a(48),o=a(45),u=window.$fn;t.default={formatData:function(e,t,a,n){var l=this,i=0;return function e(c,o,s){s=s||t;var f=!1;return 0===i&&(f=!!u.hasArray(c)&&"/0",i++),c=u.hasArray(c)?c[0]:c,u.hasObject(c)&&Object.keys(c).forEach((function(i,d){var h=u.hasArray(c[i])?"/0":"",p=f?s+f+"/"+i+h:s+"/"+i+h,b={name:i,url:p,root:t,checked:a===p};b.parentUrl=l.getParentUrl(p),o[d]="object"===typeof c[i]?Object(r.a)(Object(r.a)({},b),{},{children:[]}):Object(r.a)(Object(r.a)({},b),{},{value:c[i],isString:1}),"table"===n||("ul"===n?"object"!==typeof c[i]&&(o[d].disabled=!0):("object"===typeof c[i]&&(o[d].disabled=!0),l.isArray(p)&&(o[d].disabled=!0))),"object"===typeof c[i]&&(u.isArray(c[i])?o[d].isArray=1:u.isObject(c[i])&&(o[d].isObject=1),e(c[i],o[d].children,p))})),o}(e,[])},formatCheckedData:function(e,t,a){return function e(t,n){return t.forEach((function(t,r){t.url===n?t.checked=1:t.checked=0,u.hasArray(t.children)&&(a&&(t.disabled=!0),e(t.children,n))})),t}(e,t.url)},getField:function(e){return"string"===typeof e?e.split("/"):null},getData:function(e,t){if("string"===typeof t){var a=t.split("/"),n=e;return a.forEach((function(e){n=n[e]})),n}return null},parse:function(e,t){if("string"===typeof t){var a=t.split("/");isNaN(+a[a.length-1])||a.pop();for(var n=0;n<a.length;){var r=a[n];r=isNaN(+r)?r:+r,"object"===typeof e&&(e=e[r]),n++}return e}return null},parseParent:function(e,t){if("string"===typeof t){var a=t.split("/");(a=a.filter((function(e){return isNaN(+e)}))).shift(),a.pop();for(var n=0;n<a.length;){e=e[a[n]]||{},n++}return e}return{}},isArray:function(e){var t=e.split("/"),a=t.length;return!isNaN(t[a-1])},isArrayChild:function(e){var t=e.split("/"),a=t.length;return!isNaN(t[a-2])},getParentUrl:function(e){if(i.default.isString(e)){var t=e.split("/");return this.isArray(e)?(t=t.filter((function(e){return isNaN(+e)}))).pop():t.pop(),t.join("/")}return""},getUrlField:function(e){if(i.default.isString(e)){var t=e.split("/");return t[t.length-1]}return""},getRootUrl:function(e){return i.default.isString(e)?e.split("/")[0]:""},getUrlData:function(e,t){var a=Object(r.a)({rootUrl:null,data:[],callback:null},t),l=a.rootUrl,c=a.data,o=e.attr("url");if(i.default.isString(o)){var u=o.split("/");u[0]=l,o=u.join("/"),e.attr({url:o});var s=this.parse(Object(n.a)({},l,c),this.getParentUrl(o)),f=this.parse(Object(n.a)({},l,c),o);(i.default.hasArray(s)||i.default.hasObject(s))&&a.callback&&a.callback(f,s,o)}},isContent:function(e){return 0===e.finds("code").length()},renderData:function(e,t,a,n){var r=this;return a.finds(".x-bind-url").each((function(a){r.getUrlData(a,{data:e,rootUrl:t,callback:function(e,t,i){var c=a.attr("type");"text"===c?n?a.text(e):a.html(l.default.bindField(r.getUrlField(i))):"img"===c?a.find("img").src(e):"barcode"===c?l.default.createBarcode(a,e):"qrcode"===c?l.default.createQrcode(a,e):"checkbox"===c&&l.default.createCheckbox(a,e)}})})),a.finds("table").each((function(a){if(0!==a.finds(".x-bind-table").length()||0!==a.finds("code").length()){a.parent(".drag").removeStyle("height");var u=a.find("tbody"),s=[];u.finds("td").each((function(e){e.attr("url")&&s.push(e.attr("url"))})),r.getUrlData(u.find("td"),{data:e,rootUrl:t,isParent:!0,callback:function(e,t,r){var l=u.find("tr").children().length(),s=u.children().length();if(i.default.hasArray(t)){var f=n?t.length:1,d=o.tableConfig.style;if(0===+a.attr("border")&&delete d.border,f!==s){var h=c.default.createTbody({row:f,col:l,td:{style:d,className:"loopNode x-bind-table",attr:{type:"text"}}});u.html(h.innerHTML)}}}}),u.finds("tr").each((function(a,i){a.children().each((function(a,c){a.hasClass("x-bind-table")&&(a.attr("url",s[c]),r.getUrlData(a,{data:e,rootUrl:t,callback:function(e,t,c){var o=r.getUrlField(c);if(n){var u=t[i];u&&a.text(u[o])}else a.html(l.default.bindField(o))}}))}))}))}})),a.finds(".drag").each((function(e){e.attr("rootUrl")&&e.attr({rootUrl:t})})),a}}},58:function(e,t,a){"use strict";a.r(t);var n=a(164),r=a(0),l=a.n(r),i=a(44),c=a(57),o=a(46),u=window.$fn;t.default=function(e){var t=e._node,a=l.a.useState(!1),r=Object(n.a)(a,2),s=r[0],f=r[1],d=l.a.useRef();l.a.useEffect((function(){i.default.getNodeInfo(t,!1).then((function(e){e.rootUrl;var t=e.url,a=u.local("dataSource");if(a){var n=c.default.parse(a,t);d.current&&d.current.setValue(n)}t&&f(!0)}))}),[t]);var h=l.a.useCallback((function(e){i.default.getNodeInfo(t).then((function(e){e.rootUrl,e.url}))}),[t]);return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",null,l.a.createElement(o.default.Input,{ref:d,label:"\u6570\u636e",p:"\u65e0\u6570\u636e",readOnly:s,onChange:h})))}}}]);