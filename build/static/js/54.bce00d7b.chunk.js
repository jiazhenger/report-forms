(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[54],{43:function(t,e,n){"use strict";n.r(e);var r=n(5),i=n(7);function s(t,e){return new l(t,e)}function o(t){var e=s(t);return e.el=t,e}function l(t,e){if(s.isString(t)){var n=e?document.querySelectorAll(t):document.querySelector(t);n&&(this.el=n)}else this.el=t}s.listener=function(t,e){return t?e(t):l.prototype},s.getKeyValue=function(t){var e={};for(var n in t)e={key:n,value:t[n]};return e},s.getNum=function(t,e){var n=parseInt(t);return isNaN(n)?e?t:0:n},s.toLine=function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()},s.toNode=function(t){var e=document.createElement("div");return e.innerHTML=t,o(e)},s.mouse={getCoord:function(t){return{x:t.pageX||t.x||t.screenX||t.clientX,y:t.pageY||t.y||t.screenY||t.clientY}}},["String","Number","Array","Object","Boolean","Function","Undefined"].forEach((function(t){s["is"+t]=function(e){return{}.toString.call(e)==="[object "+t+"]"}})),s.hasArray=function(t){return s.isArray(t)&&t.length>0},s.hasObject=function(t){return s.isObject(t)&&Object.keys(t).length>0},s.isHtmlNodeList=function(t){return t instanceof HTMLCollection||t instanceof NodeList},s.isNode=function(t){return t instanceof Node},s.isElement=function(t){return t instanceof HTMLElement},s.isInit=function(t){return t instanceof l};var u={hasClass:function(t){return s.listener(this.el,(function(e){var n=e.className;return"[object String]"==={}.toString.call(n)&&-1!==n.indexOf(t)}))},addClass:function(t,e){var n=this;return s.listener(this.el,(function(r){return e?r.className=t:s(r).hasClass(t)||(r.className&&""!==r.className?r.className+=" "+t:r.className=t),n}))},removeClass:function(t){var e=this;return s.listener(this.el,(function(n){if(-1===t.indexOf(",")){if(s.isHtmlNodeList(n))s(n).each((function(e,n,r){var i=r.className;e.hasClass(t)&&(r.className=i.replace(" "+t,""))}));else if(s(n).hasClass(t)){var r=n.className.replace(" "+t,"");n.className=r}}else t.split(",").forEach((function(t){if(s.isHtmlNodeList(n))s(n).each((function(e,n,r){var i=r.className;e.hasClass(t)&&(r.className=i.replace(" "+t,""))}));else if(s(n).hasClass(t)){var e=n.className.replace(" "+t,"");n.className=e}}));return e}))}},c={getStyle:function(t){return s.listener(this.el,(function(e){return t&&document.defaultView?document.defaultView.getComputedStyle(e,null):e.style}))},hasStyle:function(t){return s.listener(this.el,(function(e){return!!e.style[t]}))},style:function(t,e){var n=arguments,r=this;return s.listener(this.el,(function(i){if(0===n.length)return i.style;if(1===n.length){if(s.isString(t))return i.style[t];if(s.isObject(t)){if(s.isHtmlNodeList(i))s(i).each((function(e,n,r){for(var i in t)r.style[i]=t[i]}));else for(var o in t)i.style[o]=t[o];return r}}else if(2===n.length)return s.isHtmlNodeList(i)?s(i).each((function(n,r,i){return i.style[t]=e})):i.style[t]=e,r}))},cssText:function(t){var e=arguments,n=this;return s.listener(this.el,(function(r){return 0===e.length?r.style.cssText:(r.style.cssText=t,n)}))},removeStyle:function(t){var e=this;return s.listener(this.el,(function(n){-1===t.indexOf(",")?s.isHtmlNodeList(n)?s(n).each((function(e,n,r){return r.style.removeProperty(s.toLine(t))})):n.style.removeProperty(s.toLine(t)):t.split(",").forEach((function(t){s.isHtmlNodeList(n)?s(n).each((function(e,n,r){return r.style.removeProperty(s.toLine(t))})):n.style.removeProperty(s.toLine(t))}));return e}))}};["width","height","lineHeight","left","top","letterSpacing","fontSize","marginTop","marginLeft"].forEach((function(t){c[t]=function(e){var n=arguments,r=this;return s.listener(this.el,(function(i){return 0===n.length?s.getNum(r.style(t)):1===n.length?(s.isNumber(parseInt(e))&&(e=isNaN(+e)?e:e+"px",r.style(t,e)),r):void 0}))}})),["background","border","borderColor","color"].forEach((function(t){c[t]=function(e){var n=arguments,r=this;return s.listener(this.el,(function(i){return 0===n.length?r.style(t):1===n.length?(r.style(t,e),r):void 0}))}}));var f={hasAttr:function(t){return s.listener(this.el,(function(e){return e.hasAttribute(t)}))},attr:function(t,e){var n=arguments,o=this;return s.listener(this.el,(function(s){if(0===n.length);else if(1===n.length){if(t.constructor===String){if(-1===t.indexOf(","))return s.getAttribute(t);t=t.split(",");var l={};return t.forEach((function(t){l=Object(i.a)(Object(i.a)({},l),{},Object(r.a)({},t,s.getAttribute(t)))})),l}if(t.constructor===Object){for(var u in t)s.setAttribute(u,t[u]);return o}}else if(2===n.length)return s.setAttribute(t,e),o}))},prop:function(t,e){var n=arguments,r=this;return s.listener(this.el,(function(i){return 1===n.length?i[t]:2===n.length?(i[t]=e,r):void 0}))},removeAttr:function(t){var e=this;return s.listener(this.el,(function(n){return-1===t.indexOf(",")?s.isHtmlNodeList(n)?s(n).each((function(e,n,r){return r.removeAttribute(t)})):n.removeAttribute(t):(t=t.split(",")).forEach((function(t){s.isHtmlNodeList(n)?s(n).each((function(e,n,r){return r.removeAttribute(t)})):n.removeAttribute(t)})),e}))}};["src","href","contentEditable","draggable","id"].forEach((function(t){f[t]=function(e){var n=arguments,r=this;return s.listener(this.el,(function(i){return 0===n.length?i[t]:1===n.length?(i[t]=e,r):void 0}))}}));var a={tag:function(t){var e=arguments;return s.listener(this.el,(function(n){return 0===e.length?n.tagName.toLowerCase():n.tagName.toLowerCase()===t}))},parent:function(t,e){var n=arguments,r=this;return s.listener(this.el,(function(i){if(0===n.length)return o(i.parentElement);var l=i.parentElement;if(-1!==t.indexOf(".")){if(t=t.replace(".",""),s(i).hasClass(t)&&e)return r;for(;!s(l).hasClass(t)&&l!==document.body&&null!==l;)l=l.parentElement}else{if(s(i).tag(t)&&e)return r;for(;!s(l).tag(t)&&l!==document.body&&null!==l;)l=l.parentElement}return o(l===document.body?null:l)}))},parents:function(t){return this.parent(t,!0)},find:function(t,e){return s.listener(this.el,(function(n){return o(e?n.querySelectorAll(t):n.querySelector(t))}))},finds:function(t){return this.find(t,!0)},each:function(t){var e=this;return s.listener(this.el,(function(n){return s.isHtmlNodeList(n)&&Array.prototype.slice.call(n).forEach((function(e,n){var r=o(e);t(r,n,r.el)})),e}))},children:function(t){var e=arguments;return s.listener(this.el,(function(n){if(0===e.length)return o(n.children);if(1===e.length){if(s.isString(t)){t=t.replace(".","");var r=null;return s(n.children).each((function(e){e.hasClass(t)&&(r=e)})),r||o()}if(s.isNumber(t))return o(n.children[t])}}))},first:function(){return s.listener(this.el,(function(t){return o(t.firstElementChild)}))},last:function(){return s.listener(this.el,(function(t){return o(t.lastElementChild)}))},index:function(){var t=arguments,e=this;return s.listener(this.el,(function(n){if(0===t.length){var r=0;return s(n).parent().children().each((function(t,n,i){i.isSameNode(e.el)&&(r=n)})),r}return o(n.children)}))},length:function(){return s.listener(this.el,(function(t){return t.length}))},clone:function(){return s.listener(this.el,(function(t){return o(t.cloneNode(!0))}))},hasChild:function(){return s.listener(this.el,(function(t){return t.hasChildNodes()}))},isSame:function(t){return s.listener(this.el,(function(e){return s.isNode(t)?e.isEqualNode(t):s.isInit(t)&&t.el?e.isEqualNode(t.el):void 0}))}},h={clear:function(){var t=this;return s.listener(this.el,(function(e){return e.innerHTML="",t}))},html:function(t){var e=arguments,n=this;return s.listener(this.el,(function(r){return 0===e.length?r.innerHTML:(r.innerHTML=t,n)}))},htmls:function(){return s.listener(this.el,(function(t){var e=document.createElement("div");return e.appendChild(t),e.innerHTML}))},text:function(t){var e=arguments,n=this;return s.listener(this.el,(function(r){return 0===e.length?r.textContent:(r.textContent=t,n)}))}},d={show:function(){var t=this;return s.listener(this.el,(function(e){return s(e).style("display","block"),t}))},hide:function(){var t=this;return s.listener(this.el,(function(e){return s(e).style("display","none"),t}))}},p={getOffset:function(){return s.listener(this.el,(function(t){for(var e=t.offsetTop,n=t.offsetLeft,r=t.offsetParent;r;)e+=r.offsetTop,n+=r.offsetLeft,r=r.offsetParent;return{offsetTop:e,offsetLeft:n}}))},getPos:function(){return s.listener(this.el,(function(t){return{left:s(t).left(),top:s(t).top()}}))},getInfo:function(t){var e=this;return s.listener(this.el,(function(t){var n=t.getBoundingClientRect(),r=e.getOffset();return{offsetTop:r.offsetTop,offsetLeft:r.offsetLeft,offsetRight:n.right,offsetBottom:n.bottom,width:n.width,height:n.height,clientWidth:t.clientWidth,clientHeight:t.clientHeight,offsetWidth:t.offsetWidth,offsetHeight:t.offsetHeight,scrollWidth:t.scrollWidth,scrollHeight:t.scrollHeight,scrollLeft:t.scrollLeft,scrollTop:t.scrollTop,posTop:t.offsetTop,posLeft:t.offsetLeft,left:t.style.left?parseInt(t.style.left):0,top:t.style.top?parseInt(t.style.top):0}}))},innerWidth:function(){return s.listener(this.el,(function(t){return t.clientWidth}))},innerHeight:function(){return s.listener(this.el,(function(t){return t.clientHeight}))},outerWidth:function(){return s.listener(this.el,(function(t){return t.offsetWidth}))},outerHeight:function(){return s.listener(this.el,(function(t){return t.offsetHeight}))}},v={appendTo:function(t){var e=this;return s.listener(this.el,(function(n){return s.isNode(t)?t.appendChild(n):s.isInit(t)&&t.el&&t.el.appendChild(n),e}))},append:function(t){var e=this;return s.listener(this.el,(function(n){return s.isNode(t)?n.appendChild(t):s.isInit(t)&&t.el&&n.appendChild(t.el),e}))},before:function(t){var e=this;return s.listener(this.el,(function(n){return s.isNode(t)?n.parentElement.insertBefore(t,n):s.isInit(t)&&t.el&&n.parentElement.insertBefore(t.el,n),e}))},remove:function(){var t=this;return s.listener(this.el,(function(e){return s.isHtmlNodeList(e)?s(e).each((function(t,e,n){n.parentElement&&n.parentElement.removeChild(n)})):e.parentElement&&e.parentElement.removeChild(e),t}))},replace:function(t){var e=this;return s.listener(this.el,(function(n){return n.parentElement.replaceChild(t,n),e}))}};s.stopEvent=function(t,e,n){e&&t.stopPropagation(),n&&t.preventDefault()},s.getRunEvent=function(){var t,e,n,r=arguments[0],i=arguments[1],o=arguments[2];return s.isFunction(r)?t=r:s.isBoolean(r)?(e=r,n=o,t=i):s.isObject(r)&&(e=r.stop,n=r.prevent,t=o),{callback:t,stop:e,prevent:n}};var m={bind:function(t){var e=arguments,n=this;return s.listener(this.el,(function(r){var i=s.getRunEvent(e[1],e[2],e[3]),o=i.callback,l=i.stop,u=i.prevent;return l||u?r.addEventListener(t,(function(t){o&&o.call(this,t),s.stopEvent(t,l,u)})):r.addEventListener(t,o),n}))},unbind:function(t,e){var n=this;return s.listener(this.el,(function(r){return r.removeEventListener(t,e),n}))},focus:function(){var t=this;return s.listener(this.el,(function(e){return e.focus(),t}))},blur:function(){var t=this;return s.listener(this.el,(function(e){return e.blur(),t}))},once:function(t){var e=arguments,n=this;return s.listener(this.el,(function(r){var i=s.getRunEvent(e[1],e[2],e[3]),o=i.callback,l=i.stop,u=i.prevent;return r["on"+t]=function(t){o&&o.call(this,t),s.stopEvent(t,l,u)},n}))},unonce:function(t){var e=this;return s.listener(this.el,(function(n){return n["on"+t]=null,e}))}};["click","mouseup","mousedown","submit","mousemove","dblclick"].forEach((function(t){m[t]=function(){var e=arguments,n=this;return s.listener(this.el,(function(r){return s(r).bind(t,e[0],e[1],e[2]),n}))}}));var g={isElement:function(){return this.el instanceof HTMLElement},isNodeList:function(){return this.el instanceof NodeList},isHtmlNodeList:function(){return this.el instanceof HTMLCollection||this.el instanceof NodeList}};l.prototype=Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)({},l.prototype),u),c),f),a),h),d),v),m),p),g),e.default=s}}]);