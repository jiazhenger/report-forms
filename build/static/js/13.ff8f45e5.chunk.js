(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[13,57,59,60,63],{19:function(e,t,o){"use strict";o.r(t);var a=o(62),r=o(63),n=o(64),l=o(65),d=o(66);t.default={init:function(e){a.default.init(),r.default.init(e),n.default.init(e),l.default.init(e),d.default.init(e)},DragStart:function(e,t,o){r.default.DragStart(e,t,o)},axes:function(){a.default.init()}}},60:function(e,t,o){"use strict";o.r(t),t.default={text:"<div style='word-wrap:break-word;'></div>",img:"<div><img src='./assets/images/img.png' style='width:100%;height:100%' draggable='false'/></div>",table:"<div><img src='./assets/images/table.png' style='width:50px;height:50px;margin:0 auto' draggable='false'/></div>",ul:"<div style='min-height:30px'><img src='./assets/images/list.png' style='width:50px;height:50px;margin:0 auto' draggable='false'/></div>",checkbox:"<div class='fxm'><img src='./assets/images/checkbox.png' style='height:100%' draggable='false'/><span type='text' class='loopNode fxm' style='margin-left:5px;flex:1;height:100%'>\u5185\u5bb9</span></div>",devider:"<div class='fxm'><img src='./assets/images/devider.png' style='width:100%;height:100%' draggable='false'/></div>",pages:"<div><span class='pageNumber'></span>/<span class='totalPages'></span> \u9875</div>",barcode:"<div class='fxmc'><img src='./assets/images/img.png' style='width:40px;height:40px' draggable='false'/></div>",qrcode:"<div><img src='./assets/images/img.png' style='width:100%;height:100%' draggable='false'/></div>"}},62:function(e,t,o){"use strict";o.r(t);var a=o(44),r=function(e,t,o,r,n){for(var l="",d=n?t/r:o/r,s=0;s<d+1;s++){l+=n?"<i class='abs' value='".concat(s*r,"' style='width:1px;height:").concat(o,"px;background:").concat(a.axesColor,";top:0;left:").concat(s*r,"px'></i>"):"<i class='abs w' value='".concat(s*r,"' style='height:1px;background:").concat(a.axesColor,";left:0;top:").concat(s*r,"px'></i>")}var i=document.createElement("div");i.className=(n?"axesY":"axesX")+" rel",i.style.zIndex="-1",i.innerHTML=l,e.appendChild(i)};t.default={init:function(){var e=document.querySelector("#axes"),t=e.querySelector(".axesX"),o=e.querySelector(".axesY");t&&t.remove(),o&&o.remove();var n=function(){var t=e.clientWidth,o=e.clientHeight;r(e,t,o,a.axesSpace,!0),r(e,t,o,a.axesSpace)};n(),window.addEventListener("resize",(function(t){e.querySelector(".axesX").remove(),e.querySelector(".axesY").remove(),n()}))}}},63:function(e,t,o){"use strict";o.r(t);var a=o(43),r=o(60),n=o(42),l=o(44),d=function(e,t,o){var a=t.$drag,r=t.$scroll,l=t.$paper,d=n.default.mouse.getCoord(e),s=d.x,i=d.y,f=Object(n.default)(r).getInfo(),c=f.scrollTop,u=f.scrollLeft,p=f.scrollWidth,h=f.scrollHeight,g=f.offsetTop,m=f.offsetLeft,v=f.clientWidth,b=f.clientHeight,w=parseInt(r.style.padding),x=parseInt(l.style.padding),y=w+x,S=Object(n.default)(a).getInfo(),C=S.offsetLeft,L=S.offsetTop,k=S.clientWidth,N=S.height,T=p-u-v,_=h-c-b,I=u<=y&&s>C-u||u>y&&s>m,$=v===p&&s<C+k||v<p&&(T>=x&&s<m+v||T<x&&s<m+v-(x-T)),O=c<=y&&i>L-c||c>y&&i>g,j=b===h&&i<L+N||b<h&&(_>=y&&i<g+b||_<y&&i<g+b-(y-_));return new Promise((function(e){I&&$&&O&&j?o.onDrag&&o.onDrag({$drag:a,dragInfo:S,$scroll:r,scrollInfo:f}):o.onFail&&o.onFail({$drag:a,dragInfo:S,$scroll:r,scrollInfo:f})}))};t.default={init:function(e){var t=this,o=Object(n.default)(e.$drag);this.setHtmlPosition=function(t){var o=n.default.mouse.getCoord(t),r=o.x,s=o.y;e._node&&e._node.style({left:r-l.differ+"px",top:s-l.differ+"px"}),d(t,e,{onDrag:function(t){t.$drag;var o=t.dragInfo,n=(t.$scroll,t.scrollInfo),d=r-(o.offsetLeft-n.scrollLeft)-l.differ,i=s-(o.offsetTop-n.scrollTop)-l.differ;if(a.default.setMark(e,".axesY",d),a.default.setMark(e,".axesX",i),e.prevNode){var f=e.prevNode.getInfo(),c=r-l.differ>=f.offsetLeft&&r<=f.offsetRight,u=s-l.differ>=f.offsetTop&&s<=f.offsetBottom;c&&u?e.prevNode.addClass("drag-add"):e.prevNode.removeClass("drag-add")}},onFail:function(){}})},this.setNewPosition=function(r){var s=e._node;if(s){var i=n.default.mouse.getCoord(r),f=i.x,c=i.y;d(r,e,{onDrag:function(r){var n=r.$drag,d=r.dragInfo,i=(r.$scroll,r.scrollInfo);document.body.removeEventListener("mousemove",t.setHtmlPosition),document.body.removeEventListener("mouseup",t.setNewPosition),s.addClass("drag",!0);var u=f-(d.offsetLeft-i.scrollLeft)-l.differ,p=c-(d.offsetTop-i.scrollTop)-l.differ;u-=u%l.axesSpace,p-=p%l.axesSpace,s.left(u).top(p),s.find(".point-mark").addClass("mark-show");var h=s.attr("type");e.isLayout=!1;if(function(t,o,a){if(o&&o.hasClass("x-layout")){var r=t.top(),s=t.left(),u=o.getInfo(),p=u.offsetTop-d.offsetTop,h=u.offsetLeft-d.offsetLeft,g=o.outerHeight(),m=o.outerWidth();if(r>=p&&r<p+g&&(s>=h&&s<h+m)){if(["header","footer","main"].includes(a))return t.remove(),window.$fn.toast("\u65e0\u6cd5\u653e\u7f6e");t.appendTo(o.el);var v=c-(d.offsetTop-i.scrollTop)-l.differ-p,b=f-(d.offsetLeft-i.scrollLeft)-l.differ-h;v-=v%l.axesSpace,b-=b%l.axesSpace,t.top(v).left(b)}else t.appendTo(n);e.isLayout=!0}}(s,e.prevNode,h),"table"===h)s.style({left:0,width:"100%"});else if("ul"===h)s.style({left:0,width:"100%"});else if("devider"===h)s.style({left:0,width:"100%",height:"10px"}),s.find(".template").html("<div></div>").children(0).cssText("width:100%;height:0; border-top:1px solid #ddd;");else if("checkbox"===h)s.removeStyle("width");else if("barcode"===h)s.style({width:"200px",height:"auto"});else if("qrcode"===h)s.style({width:"80px",height:"80px"});else if("flexbox"===h)s.height(100);else if(["header","footer","main"].includes(h)&&("header"===h?s.style("top",0):"main"===h&&s.style("height","200px"),n.querySelector("."+h))){var g=null;return"header"===h?g="\u9875\u7709":"main"===h?g="\u4e3b\u4f53":"footer"===h&&(g="\u9875\u811a"),s.remove(),window.$fn.toast(g+"\u5df2\u5b58\u5728")}["header","footer","main","flexbox"].includes(h)?s.style({left:0,width:"100%"}).addClass(h).addClass("x-layout").find(".point-mark").removeStyle("background"):s.addClass("drag-elem"),s.parent().children(".point-mark").removeClass("mark-show"),e.isLayout||s.appendTo(n),a.default.setParentBorder(o,s),e.setState({hasNode:!0,node:s.el,_node:s},(function(){e.runNode()}))},onFail:function(){!function(){var e=document.querySelector(".move");e&&document.body.removeChild(e)}(),e._node=null,e.node=null,e.setState({hasNode:null,node:null,_node:null})}})}}},DragStart:function(e,t,o){var l=n.default.mouse.getCoord(e),d=l.x,s=l.y;if(o)if(document.querySelector(".move"));else{t.prevNode=t._node;var i=document.createElement("div"),f=Object(n.default)(i).attr({type:o}).addClass("move").left(d-10).top(s-10).width(50).style({position:"absolute",zIndex:1});if(r.default[o]){f.html(r.default[o]).children(0).addClass("template");var c=i.querySelector(".template");Object(n.default)(c).cssText("width:100%;height:100%;background:#fff;overflow:hidden"),"text"===o?f.width(100).height(20).lineHeight(20):"img"===o?f.height(50):"table"===o||"ul"===o?f.attr("group",1):"devider"===o?(f.width(50).height(10),Object(n.default)(c).removeStyle("background")):"checkbox"===o?f.width(20).height(20).find("img").attr("temp",1):"pages"===o&&f.width(50).height(20).lineHeight(20).style("textAlign","center")}else f.width(100).height(100);a.default.createPointMark(f),t._node=f,t.node=i,document.body.appendChild(i),document.body.addEventListener("mousemove",this.setHtmlPosition),document.body.addEventListener("mouseup",this.setNewPosition)}}}},64:function(e,t,o){"use strict";o.r(t);var a=o(43),r=o(42),n=o(44),l=window.$fn;t.default={init:function(e){var t=this,o=e.__scroll,d=e.__control,s=e.__drag,i=e.__axes,f=0,c=0,u=0,p=0,h=function(e){return Object(r.default)(t.sizeNode).hasClass(e)},g=function(t){var a=r.default.mouse.getCoord(t),n=a.x,l=a.y,d=o.getInfo(),s=d.scrollTop,i=d.scrollLeft;if(e.dragNode){var f=Object(r.default)(e.dragNode),c=f.parent(".drag").getInfo(),u=c.offsetLeft,p=c.offsetTop,g=f.getInfo(),m=g.offsetLeft,v=g.offsetTop,b=g.width,w=g.height,x=g.left,y=g.top;if((h("rc-w")||h("rt-wh")||h("rb-wh"))&&f.width(n-m+i),h("lc-w")||h("lt-wh")||h("lb-wh")){var S=n+i;x>=0&&f.width(m-S+b).left(S-u)}if((h("rb-wh")||h("lb-wh")||h("bc-h"))&&f.height(l-v+s),h("tc-h")||h("rt-wh")||h("lt-wh")){var C=l+s;y>=0&&f.height(v-C+w).top(C-p)}}},m=function(t){var o=r.default.mouse.getCoord(t),n=o.x,l=o.y,d=e._node,i=s.getInfo(),h=d.parent(".drag").getInfo(),g=h.offsetLeft,m=h.offsetTop,v=h.width,b=h.height,w=d.getInfo(),x=w.width,y=w.height;if(d.el){var S=n-f-g,C=l-c-m;if("relative"===d.style("position")){var L=d.parent(".drag").getInfo();C=l-c-p,((S=n-f-u)<0&&Math.abs(S)<=u-g||S>0&&S<=v-(u-g)-x)&&d.left(S),(C<0&&Math.abs(C)<=p-m||C>0&&C<=b-(p-m)-y)&&d.top(C),a.default.setMark(e,".axesY",S+(g-i.offsetLeft)+(u-L.offsetLeft)),a.default.setMark(e,".axesX",C+(m-i.offsetTop)+(p-L.offsetTop))}else S>=0&&S<=v-x&&d.left(S),C>=0&&C<=b-y&&d.top(C),a.default.setMark(e,".axesY",S+(g-i.offsetLeft)),a.default.setMark(e,".axesX",C+(m-i.offsetTop));a.default.clearMark(d),d.addClass("drag-move").removeClass("no-border")}};s.bind("mousedown",(function(o){var a=o.target,n=r.default.mouse.getCoord(o),l=n.x,d=n.y,i=Object(r.default)(a).parents(".drag"),h=i.find(".template");if(o.stopPropagation(),(!h.el||!h.attr("contentEditable"))&&!i.attr("id")&&!i.hasClass("lock")&&i.children(".point-mark").hasClass("mark-show")){if(a.className.indexOf("dir")>=0)return e.dragNode=i.el,t.sizeNode=a,s.bind("mousemove",g);if(i.el){e.node=i.el,e._node=i;var v=i.getInfo();f=l-v.offsetLeft,c=d-v.offsetTop,u=v.offsetLeft,p=v.offsetTop,s.bind("mousemove",m)}}})).bind("mouseup",(function(t){if(e.dragNode){var o=Object(r.default)(e.dragNode),a=o.getInfo(),l=a.left,d=a.top,s=a.width,i=a.height,f=n.axesSpace;return(h("rc-w")||h("rt-wh")||h("rb-wh"))&&o.width(s-s%n.axesSpace+(s%n.axesSpace>0?n.axesSpace:0)),(h("lc-w")||h("lt-wh")||h("lb-wh"))&&o.width(s-s%n.axesSpace+(s%n.axesSpace>0?n.axesSpace:0)).left(l-l%n.axesSpace),(h("rb-wh")||h("lb-wh")||h("bc-h"))&&o.height(i-i%f+(i%f>0?f:0)),(h("tc-h")||h("rt-wh")||h("lt-wh"))&&o.height(i-i%f+(i%f>0?f:0)).top(d-d%f),!1}if(e._node){var c=e._node;c.style("zIndex",1);var u=c.getPos(),p=u.left,g=u.top;if("relative"===c.style("position")){if(c.removeStyle("left,top"),Boolean(c.attr("center"))){var m=c.parent(".drag").outerWidth(),v=c.outerWidth(),b=(m-v)/2,w=b%n.axesSpace;c.left(b-w).width(v-(w?10:0))}}else"devider"===c.attr("type")?c.left(p).top(g):c.left(p-p%n.axesSpace).top(g-g%n.axesSpace)}})).click(!0,(function(t){var o=t.target,n=Object(r.default)(o),l=n.parents(".drag");if(a.default.showMark(s,l),l.el&&!l.attr("id")){var d=n.parents(".loopNode");if(l.hasClass("hide")){var i=l.attr("mergeTable"),f=document.querySelectorAll(".loopNode"),c=Object(r.default)(f);f.length>0&&(d.el?(c.removeClass("activeLoop"),i?d.hasClass("tableSpan")?d.removeClass("tableSpan"):d.addClass("tableSpan"):d.addClass("activeLoop")):c.removeClass("activeLoop")),e._node=d}else e._node=l;e.setState({node:e._node.el,_node:e._node,hasNode:!0},(function(){e.runNode()}))}})).dblclick((function(e){var t=e.target,o=Object(r.default)(t),a=o.parents(".drag");if(a&&a.el){var n=a.attr("type"),l=a.attr("group"),d=a.attr("rooturl");if(!l&&d)return;var s=a.find(".template");if("table"!==n&&"ul"!==n&&"text"!==n||a.addClass("hide"),o.parent(".drag").attr("group")&&(n=(s=o.parents(".loopNode")).attr("type"),l&&s.hasClass("x-bind-table")))return;if("text"===n){if(a.attr("mergeTable"))return;s.contentEditable(!0).focus().once("blur",(function(e){Object(r.default)(this).removeAttr("contentEditable")}))}}})),Object(r.default)(document.body).once("mouseup",(function(o){var d=o.target,f=Object(r.default)(d).parents(".drag"),c=Object(r.default)(d).parents(".move").el,u=f.el&&!f.attr("id");if(e.dragNode||u||(e.stop=!1,s.finds(".drag").each((function(e){e.removeClass("hide"),a.default.clearMark(e)}))),u||c);else{var p=s.finds(".drag"),h=!1;p.length()>0&&(h=[].slice.call(p.el).some((function(e){return"block"===e.style.display}))),h||l.leak((function(){e.setState({node:null,_node:null,target:null,hasNode:null},(function(){e.cancelNode()}))}))();var v=s.finds(".loopNode");v.length()>0&&(v.removeClass("activeLoop").removeClass("tableSpan"),p.removeClass("hide").removeAttr("mergeTable")),a.default.resetBorder(s)}s.find(".drag-add").removeClass("drag-add"),i.finds("i").each((function(e){e.background(n.axesColor)})),s.unbind("mousemove",m).unbind("mousemove",g),t.sizeNode=null,e.dragNode=null})),d.bind("mouseup",!0).bind("keyup",!0)}}},65:function(e,t,o){"use strict";o.r(t),t.default={init:function(e){var t=this;document.addEventListener("keyup",(function(o){var a=o.keyCode;46!==a&&110!==a||e.stop||t.del(e),e.node&&(e.node.onclick=null)})),document.querySelector("#del").addEventListener("click",(function(o){return t.del(e)})),document.querySelector("#delAll").addEventListener("click",(function(o){return t.delAll(e)})),document.addEventListener("keydown",(function(e){}))},copy:function(e){var t=e.node.cloneNode(!0);e.node.parentElement.appendChild(t)},del:function(e){var t=e.state.node;t?(t.remove(),e.node=null,e._node=null,e.setState({hasNode:null,node:null,_node:null})):window.$fn.toast("\u672a\u9009\u4e2d\u76ee\u6807")},delAll:function(e){e.$drag.innerHTML="",window.$fn.remove("html"),window.$fn.remove("myHeight"),window.$fn.remove("myWidth"),window.$fn.remove("paper"),window.location.reload()}}},66:function(e,t,o){"use strict";o.r(t);var a=o(42),r=o(44),n=0,l=0,d=0,s=0;t.default={init:function(e){var t=e.$scroll,o=Object(a.default)(t),i=function(e){var t=this,i=o.getInfo(),f=i.scrollTop,c=i.scrollLeft;!function(e,t){var o=a.default.mouse.getCoord(e),r=o.x,i=o.y;n=d,l=s,d=r,(s=i)>l?t.down&&t.down(i):s<l&&t.up&&t.up(i),d>n?t.right&&t.right(r):d<n&&t.left&&t.left(r)}(e,{left:function(){t.scrollLeft=c+r.scrollSpace},right:function(){t.scrollLeft=c-r.scrollSpace},up:function(){t.scrollTop=f+r.scrollSpace},down:function(){t.scrollTop=f-r.scrollSpace}})};t.addEventListener("mousedown",(function(e){var t=e.target,r=Object(a.default)(t).parents(".paper");r.el||(r.style("cursor","move"),o.bind("mousemove",i))})),document.addEventListener("mouseup",(function(e){o.removeStyle("cursor").unbind("mousemove",i)})),document.addEventListener("mouseleave",(function(e){o.removeStyle("cursor").unbind("mousemove",i)}))}}}}]);