(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[3],{12:function(t,n,e){"use strict";var o=e(5),r=e(6),a=e(7),i=e(8),c=e(0),s=e.n(c);n.a=function(t){return function(n){Object(i.a)(c,n);var e=Object(a.a)(c);function c(){var t;Object(o.a)(this,c);for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))).state={component:null},t}return Object(r.a)(c,[{key:"componentDidMount",value:function(){var n=this;t().then((function(t){n.setState({component:t.default})}))}},{key:"render",value:function(){var t=this.state.component;return t?s.a.createElement(t,this.props):null}}]),c}(c.Component)}},23:function(t,n,e){t.exports=e(46)},24:function(t,n,e){},25:function(t,n,e){},3:function(t,n){var e=function(t){return window.location.host.indexOf(t)>=0},o="http://t.ubzyw.com/tpc/api/",r="http://localhost:3005/";e("//testt.ubzyw.com/")?o=r:e("//:preapi.ubzyw.com")&&(o="http://t.ubzyw.com/"),t.exports={api:o,env:!1,contentType:0}},46:function(t,n,e){"use strict";e.r(n);e(24),e(25);var o=function(t,n){var e=n;(i.isObject(e)||i.isArray(e))&&(e=JSON.stringify(e)),localStorage.setItem(t,e)},r=function(t){var n=localStorage.getItem(t);return!!i.isValid(n)&&(n.indexOf("}")>=0||n.indexOf("[")>=0?JSON.parse(n):n)},a=function(t){i.hasArray(t)?t.each((function(t,n){localStorage.removeItem(t)})):localStorage.removeItem(t)},i={c0:"#ee7158",c1:"#FF5218",searchWidth:"250px",isObject:function(t){return"[object Object]"==={}.toString.call(t)},hasObject:function(t){return this.isObject(t)&&Object.keys(t).length>0},isFunction:function(t){return"[object Function]"==={}.toString.call(t)},isArray:function(t){return"[object Array]"==={}.toString.call(t)},hasArray:function(t){return this.isArray(t)&&t.length>0},isString:function(t){return"[object String]"==={}.toString.call(t)},isNumber:function(t){return"[object Number]"==={}.toString.call(t)},isEmpty:function(t){return null===t||void 0===t||""===t},isValid:function(t){return!this.isEmpty(t)||0===t||!1===t},stop:function(t){t.stopPropagation()},loading:function(t,n){var e=document.querySelector("#ubLoading");t?(e.querySelector(".ub-loading-msg").innerHTML=n||"\u6570\u636e\u52a0\u8f7d\u4e2d",e.style.display="block"):e.style.display="none"},toast:function(t,n){var e=document.querySelector("#ubToast");e.style.display="block",e.querySelector(".ub-toast").innerHTML=t,setTimeout((function(){e.style.display="none"}),1500),n&&n()},go:function(t){var n=t||"/login",e=80===window.location.port?"":":"+window.location.port,o=window.location.protocol+"//"+window.location.hostname+e+window.location.pathname+"#"+n;window.location.replace(o)},local:function(t,n){var e=t||"user";if(!this.isValid(n))return r(e);o(e,n)},remove:function(t){a(t||"user")},getQuery:function(t){var n=window.location.search||window.location.hash,e={};if(-1!==n.indexOf("?")){var o=n.split("?");(o=o[1].split("&")).forEach((function(t,n){var o=t.split("=");"undefined"!==o[1]&&"null"!==o[1]&&""!==o[1]&&(e[o[0]]=o[1])}))}return t?e[t]:e},getToken:function(t){var n=this.getQuery("token"),e=this.getUser(),o=null;return n?o=n:e.token&&(o=e.token),o},getUser:function(){var t=r("user");return this.hasObject(t)?t:{}},setTitle:function(t){window.document.title=t},loginTo:function(t){if(t){var n=this.local("loginToPage");return!!n&&decodeURIComponent(n).replace("#","")}this.local("loginToPage",encodeURIComponent(window.location.hash))},toNum:function(t){return t?parseInt(t):0},toBool:function(t,n){return t===n},leak:function(t){var n;return function(e){clearTimeout(n),n=setTimeout((function(){t()}),e||200)}}},c=e(2),s=e(10),u=e(11),l=e.n(u),d=e(3),p=e.n(d),f=function(t,n){p.a.env&&console.log(t,n)},m=function(t,n){if(!i.hasObject(t))return"";var e=t,o="";for(var r in e)i.isValid(e[r])&&(o+=r+"="+e[r]+"&");return"&"===o.charAt(o.length-1)&&(o=o.slice(0,o.length-1)),o=n?o:"?"+o,encodeURI(o)},g=function(t,n){if(t){var e=t[n];return e=i.isArray(e)?[]:i.isObject(e)?{}:"",i.isValid(n)&&(t[n]=e),e}},h=function(t,n,e,o){var r=o||{},a=-1!==t.indexOf("http")?t:p.a.api,c=function(t){return i.isFunction(t)?t():t}(n);c=1===r.type?m(c,!0):c;var s,u=m(c),d=function(t){var n=["application/json;charset=utf-8","application/x-www-form-urlencoded","multipart/form-data"][i.isValid(t.type)?t.type:p.a.contentType],e=(t.noToken,{"Content-Type":n});return{baseURL:t.api,headers:e,timeout:3e4}}({type:r.type,upload:r.upload,noToken:r.noToken,api:a});return i.isFunction(r.onStart)&&r.onStart(),"get"===e?(s=l.a.get(t+u,d),f("%c"+e+" === "+a+t+u,"color:blue")):(s=l.a.post(t,c,d),f("%c"+e+" === "+a+t+JSON.stringify(c),"color:blue")),new Promise((function(n,e){s.then((function(o){var a=o.data,c=a.code;200===c?(n(a.data),f(t+"===",a.data)):501===c?(i.toast(a.msg),i.remove(),i.loginTo(),setTimeout((function(){return i.go("/")}))):(e(a),i.isFunction(r.onError)&&r.onError(a),i.isFunction(r.onFail)&&r.onFail(a),r.onMsg?i.isFunction(r.onMsg)&&r.onMsg(a):i.toast(a.msg,r.onError),f(t+"===",a)),i.isFunction(r.onEnd)&&r.onEnd(a),i.isFunction(r.onSuccess)&&r.onSuccess(a)}),(function(t){r.noError||i.toast("\u670d\u52a1\u5668\u6216\u7f51\u7edc\u51fa\u9519"),i.isFunction(r.onNet)&&r.onNet(),i.isFunction(r.onError)&&r.onError(),i.isFunction(r.onEnd)&&r.onEnd()}))}))},b={submit:function(t,n,e){var o=Object(s.a)({param:{},loadingText:"\u6570\u636e\u63d0\u4ea4\u4e2d...",successText:"",succeedFn:null,errorText:"",submitLoading:"submitLoading",loading:!0,runFirst:!0,type:p.a.contentType},e);t&&t.setState(Object(c.a)({},o.submitLoading,!0)),o.loading&&i.loading(!0,o.loadingText);var r=function(){t&&(o.replace&&t.props.history.replace(o.replace),o.push&&t.props.history.push(o.push)),o.onSuccess&&o.onSuccess()};return new Promise((function(e,a){var s,u,l;(s=n,u=o.param,l={onStart:function(){o.onStart&&o.onStart(!0)},onEnd:function(){t&&t.setState(Object(c.a)({},o.submitLoading,!1)),o.loading&&i.loading(!1),o.onEnd&&o.onEnd(!1)},onMsg:o.onMsg&&function(t){i.isFunction(o.onMsg)&&o.onMsg(t)},noError:o.noError,onError:o.onError,upload:o.upload,noToken:o.noToken,isBody:o.isBody,type:o.type},h(s,u,"post",l)).then((function(t){e(t),o.successText?o.runFirst?(i.toast(o.successText),r()):i.toast(o.successText,r):r()}),(function(n){a(n),o.closeToast&&t.refs.toast&&t.refs.toast.open({text:n.info})}))}))},pull:function(t,n,e){var o,r=Object(s.a)({dataName:"data",loading:!0,param:{},pullLoading:"pullLoading",loadingText:"\u6570\u636e\u52a0\u8f7d\u4e2d..."},e);t&&i.isValid(r.isFirst)?t.setState((o={},Object(c.a)(o,r.pullLoading,!0),Object(c.a)(o,"isFirst",r.isFirst),o)):t&&t.setState(Object(c.a)({},r.pullLoading,!0));return r.isFirst||r.loading&&i.loading(!0,r.loadingText),new Promise((function(e,o){var a,s,u;(a=n,s=r.param,u={onStart:function(){r.onStart&&r.onStart(!0)},onEnd:function(){t&&t.setState(Object(c.a)({},r.pullLoading,!1)),r.loading&&i.loading(!1),r.onEnd&&r.onEnd(!1)},onMsg:r.onMsg&&function(t){i.isFunction(r.onMsg)&&r.onMsg(t)},noError:r.noError,onError:function(){g(t,r.dataName),r.onError&&r.onError(),r.loading||i.loading(!1)},noToken:r.noToken},h(a,s,"get",u)).then((function(n){if(i.isValid(n))i.isFunction(r.onSuccess)&&(n=r.onSuccess(n)),i.isValid(r.dataName)&&t&&t.setState(Object(c.a)({},r.dataName,n)),e(n);else{var o=g(t,r.dataName);e(o)}}))}))}};window.$fn=i,window.$http=b,window.$config=p.a;var y=e(0),v=e.n(y),E=e(4),w=e.n(E),S=e(12),x=e(5),O=e(6),T=e(9),j=e(7),k=e(8),F=function(t){Object(k.a)(e,t);var n=Object(j.a)(e);function e(){var t;Object(x.a)(this,e);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(t=n.call.apply(n,[this].concat(r))).getNode=function(){var n=t.props.el;return n?document.querySelector(n):document.body},t.retContainer=function(){if(!t.el){var n=document.createElement(t.props.tag||"div");n.setAttribute("name",t.props.name),t.el=n,t.getNode().appendChild(t.el)}return t.el},t.retContent=function(){return v.a.createElement(v.a.Fragment,null,t.props.children)},t.renderSubtree=function(){w.a.unstable_renderSubtreeIntoContainer(Object(T.a)(t),t.retContent(),t.retContainer())},t}return Object(O.a)(e,[{key:"componentDidMount",value:function(){this.props.isUpdate||this.renderSubtree()}},{key:"componentDidUpdate",value:function(){this.props.isUpdate&&this.renderSubtree()}},{key:"componentWillUnmount",value:function(){this.el&&this.getNode().removeChild(this.el)}},{key:"render",value:function(){return null}}]),e}(v.a.Component),N=function(){return v.a.createElement(F,{name:"toast"},v.a.createElement("div",{id:"ubToast",className:"ub-toast fix_lt wh tc dn",style:{zIndex:2e3}},v.a.createElement("div",{className:"fxmc wh xplr"},v.a.createElement("p",{className:"ub-toast r5px cf p10 f13",style:{background:"rgba(0,0,0,0.6)"}}))))},M=window.$fn,C=function(t){var n=t.color,e=t.size;return v.a.createElement("svg",{width:e,height:e,viewBox:"0 0 100 100"},v.a.createElement("circle",{fill:"none",stroke:"#fff",strokeWidth:"4",cx:"50",cy:"50",r:"44",style:{opacity:.6}}),v.a.createElement("circle",{fill:"#fff",stroke:n||M.c0,strokeWidth:"3",cx:"8",cy:"54",r:"6",transform:"rotate(56.0809 50 48.6231)"},v.a.createElement("animateTransform",{attributeName:"transform",dur:"2s",type:"rotate",from:"0 50 48",to:"360 50 52",repeatCount:"indefinite"})))},L=function(){return v.a.createElement(F,{name:"data-loading"},v.a.createElement("div",{id:"ubLoading",className:"fix_lt wh tc dn",style:{zIndex:1999}},v.a.createElement("div",{className:"fxmc wh"},v.a.createElement("div",{className:"r8px",style:{background:"rgba(0,0,0,.8)",minWidth:"90px",padding:"8px 12px"}},v.a.createElement("div",{className:"fxmc"},v.a.createElement(C,{size:"60px"})),v.a.createElement("div",{className:"cf f12 lh20 mt5 ub-loading-msg"})))))},A=Object(S.a)((function(){return Promise.all([e.e(5),e.e(7)]).then(e.bind(null,301))})),I=function(){return v.a.createElement(v.a.Fragment,null,v.a.createElement(A,null),v.a.createElement(N,null),v.a.createElement(L,null))};w.a.render(v.a.createElement(I,null),document.querySelector("#app-root")),document.body.removeChild(document.querySelector("#app-loading"))}},[[23,4,6]]]);