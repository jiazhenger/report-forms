(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[18],{353:function(e,t,n){"use strict";n(178),n(449)},354:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(125),c=n.n(a),u=n(450),i=n.n(u),l=n(201),s=n.n(l),f=n(222),p=n.n(f),d=n(223),y=n.n(d),b=n(224),v=n.n(b),h=function(e){function t(n){p()(this,t);var r=y()(this,e.call(this,n));r.handleChange=function(e){var t=r.props,n=t.disabled,o=t.onChange;n||("checked"in r.props||r.setState({checked:e.target.checked}),o&&o({target:s()({},r.props,{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},r.saveInput=function(e){r.input=e};var o="checked"in n?n.checked:n.defaultChecked;return r.state={checked:o},r}return v()(t,e),t.getDerivedStateFromProps=function(e,t){return"checked"in e?s()({},t,{checked:e.checked}):null},t.prototype.focus=function(){this.input.focus()},t.prototype.blur=function(){this.input.blur()},t.prototype.render=function(){var e,t=this.props,n=t.prefixCls,r=t.className,a=t.style,u=t.name,l=t.id,f=t.type,p=t.disabled,d=t.readOnly,y=t.tabIndex,b=t.onClick,v=t.onFocus,h=t.onBlur,m=t.autoFocus,g=t.value,O=t.required,k=i()(t,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","autoFocus","value","required"]),x=Object.keys(k).reduce((function(e,t){return"aria-"!==t.substr(0,5)&&"data-"!==t.substr(0,5)&&"role"!==t||(e[t]=k[t]),e}),{}),C=this.state.checked,j=c()(n,r,((e={})[n+"-checked"]=C,e[n+"-disabled"]=p,e));return o.a.createElement("span",{className:j,style:a},o.a.createElement("input",s()({name:u,id:l,type:f,required:O,readOnly:d,disabled:p,tabIndex:y,className:n+"-input",checked:!!C,onClick:b,onFocus:v,onBlur:h,onChange:this.handleChange,autoFocus:m,ref:this.saveInput,value:g},x)),o.a.createElement("span",{className:n+"-inner"}))},t}(r.Component);h.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){}};var m=h,g=n(229),O=n(452);function k(e){return(k="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(){return(x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function C(e){return function(e){if(Array.isArray(e))return j(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(e,t){return(P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=V(e);if(t){var o=V(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return E(this,n)}}function E(e,t){return!t||"object"!==k(t)&&"function"!==typeof t?_(e):t}function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function V(e){return(V=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var N=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},I=r.createContext(null),R=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(u,e);var t,n,o,a=S(u);function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=a.call(this,e)).cancelValue=function(e){t.setState((function(t){return{registeredValues:t.registeredValues.filter((function(t){return t!==e}))}}))},t.registerValue=function(e){t.setState((function(t){var n=t.registeredValues;return{registeredValues:[].concat(C(n),[e])}}))},t.toggleOption=function(e){var n=t.state.registeredValues,r=t.state.value.indexOf(e.value),o=C(t.state.value);-1===r?o.push(e.value):o.splice(r,1),"value"in t.props||t.setState({value:o});var a=t.props.onChange;if(a){var c=t.getOptions();a(o.filter((function(e){return-1!==n.indexOf(e)})).sort((function(e,t){return c.findIndex((function(t){return t.value===e}))-c.findIndex((function(e){return e.value===t}))})))}},t.renderGroup=function(e){var n=e.getPrefixCls,o=e.direction,a=_(t),u=a.props,i=a.state,l=u.prefixCls,s=u.className,f=u.style,p=u.options,d=N(u,["prefixCls","className","style","options"]),y=n("checkbox",l),b="".concat(y,"-group"),v=Object(g.a)(d,["children","defaultValue","value","onChange","disabled"]),h=u.children;p&&p.length>0&&(h=t.getOptions().map((function(e){return r.createElement(X,{prefixCls:y,key:e.value.toString(),disabled:"disabled"in e?e.disabled:u.disabled,value:e.value,checked:-1!==i.value.indexOf(e.value),onChange:e.onChange,className:"".concat(b,"-item"),style:e.style},e.label)})));var m,O,k,C={toggleOption:t.toggleOption,value:t.state.value,disabled:t.props.disabled,name:t.props.name,registerValue:t.registerValue,cancelValue:t.cancelValue},j=c()(b,s,(m={},O="".concat(b,"-rtl"),k="rtl"===o,O in m?Object.defineProperty(m,O,{value:k,enumerable:!0,configurable:!0,writable:!0}):m[O]=k,m));return r.createElement("div",x({className:j,style:f},v),r.createElement(I.Provider,{value:C},h))},t.state={value:e.value||e.defaultValue||[],registeredValues:[]},t}return t=u,o=[{key:"getDerivedStateFromProps",value:function(e){return"value"in e?{value:e.value||[]}:null}}],(n=[{key:"getOptions",value:function(){return this.props.options.map((function(e){return"string"===typeof e?{label:e,value:e}:e}))}},{key:"render",value:function(){return r.createElement(O.a,null,this.renderGroup)}}])&&w(t.prototype,n),o&&w(t,o),u}(r.PureComponent);R.defaultProps={options:[]};var D=R,F=n(210);function M(e){return(M="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function T(){return(T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function B(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function G(e,t){return(G=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=H(e);if(t){var o=H(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return U(this,n)}}function U(e,t){return!t||"object"!==M(t)&&"function"!==typeof t?J(e):t}function J(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function H(e){return(H=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var K=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},W=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&G(e,t)}(u,e);var t,n,o,a=L(u);function u(){var e;return B(this,u),(e=a.apply(this,arguments)).saveCheckbox=function(t){e.rcCheckbox=t},e.renderCheckbox=function(t){var n,o=t.getPrefixCls,a=t.direction,u=J(e),i=u.props,l=u.context,s=i.prefixCls,f=i.className,p=i.children,d=i.indeterminate,y=i.style,b=i.onMouseEnter,v=i.onMouseLeave,h=K(i,["prefixCls","className","children","indeterminate","style","onMouseEnter","onMouseLeave"]),g=l,O=o("checkbox",s),k=T({},h);g&&(k.onChange=function(){h.onChange&&h.onChange.apply(h,arguments),g.toggleOption({label:p,value:i.value})},k.name=g.name,k.checked=-1!==g.value.indexOf(i.value),k.disabled=i.disabled||g.disabled);var x=c()(f,(A(n={},"".concat(O,"-wrapper"),!0),A(n,"".concat(O,"-rtl"),"rtl"===a),A(n,"".concat(O,"-wrapper-checked"),k.checked),A(n,"".concat(O,"-wrapper-disabled"),k.disabled),n)),C=c()(A({},"".concat(O,"-indeterminate"),d));return r.createElement("label",{className:x,style:y,onMouseEnter:b,onMouseLeave:v},r.createElement(m,T({},k,{prefixCls:O,className:C,ref:e.saveCheckbox})),void 0!==p&&r.createElement("span",null,p))},e}return t=u,(n=[{key:"componentDidMount",value:function(){var e,t=this.props.value;null===(e=this.context)||void 0===e||e.registerValue(t),Object(F.a)("checked"in this.props||this.context||!("value"in this.props),"Checkbox","`value` is not a valid prop, do you mean `checked`?")}},{key:"componentDidUpdate",value:function(e){var t,n,r=e.value,o=this.props.value;o!==r&&(null===(t=this.context)||void 0===t||t.cancelValue(r),null===(n=this.context)||void 0===n||n.registerValue(o))}},{key:"componentWillUnmount",value:function(){var e,t=this.props.value;null===(e=this.context)||void 0===e||e.cancelValue(t)}},{key:"focus",value:function(){this.rcCheckbox.focus()}},{key:"blur",value:function(){this.rcCheckbox.blur()}},{key:"render",value:function(){return r.createElement(O.a,null,this.renderCheckbox)}}])&&q(t.prototype,n),o&&q(t,o),u}(r.PureComponent);W.__ANT_CHECKBOX=!0,W.defaultProps={indeterminate:!1},W.contextType=I;var X=W;X.Group=D;t.a=X},449:function(e,t,n){},450:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}}}]);