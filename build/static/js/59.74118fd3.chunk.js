(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[59],{64:function(e,t,a){"use strict";a.r(t);var o=a(43),r=a(42),s=a(44),l=window.$fn;t.default={init:function(e){var t=this,a=e.__scroll,d=e.__control,f=e.__drag,n=e.__axes,i=0,c=0,p=0,u=0,h=function(e){return Object(r.default)(t.sizeNode).hasClass(e)},g=function(t){var o=r.default.mouse.getCoord(t),s=o.x,l=o.y,d=a.getInfo(),f=d.scrollTop,n=d.scrollLeft;if(e.dragNode){var i=Object(r.default)(e.dragNode),c=i.parent(".drag").getInfo(),p=c.offsetLeft,u=c.offsetTop,g=i.getInfo(),v=g.offsetLeft,b=g.offsetTop,m=g.width,w=g.height,x=g.left,C=g.top;if((h("rc-w")||h("rt-wh")||h("rb-wh"))&&i.width(s-v+n),h("lc-w")||h("lt-wh")||h("lb-wh")){var S=s+n;x>=0&&i.width(v-S+m).left(S-p)}if((h("rb-wh")||h("lb-wh")||h("bc-h"))&&i.height(l-b+f),h("tc-h")||h("rt-wh")||h("lt-wh")){var N=l+f;C>=0&&i.height(b-N+w).top(N-u)}}},v=function(t){var a=r.default.mouse.getCoord(t),s=a.x,l=a.y,d=e._node,n=f.getInfo(),h=d.parent(".drag").getInfo(),g=h.offsetLeft,v=h.offsetTop,b=h.width,m=h.height,w=d.getInfo(),x=w.width,C=w.height;if(d.el){var S=s-i-g,N=l-c-v;if("relative"===d.style("position")){var y=d.parent(".drag").getInfo();N=l-c-u,((S=s-i-p)<0&&Math.abs(S)<=p-g||S>0&&S<=b-(p-g)-x)&&d.left(S),(N<0&&Math.abs(N)<=u-v||N>0&&N<=m-(u-v)-C)&&d.top(N),o.default.setMark(e,".axesY",S+(g-n.offsetLeft)+(p-y.offsetLeft)),o.default.setMark(e,".axesX",N+(v-n.offsetTop)+(u-y.offsetTop))}else S>=0&&S<=b-x&&d.left(S),N>=0&&N<=m-C&&d.top(N),o.default.setMark(e,".axesY",S+(g-n.offsetLeft)),o.default.setMark(e,".axesX",N+(v-n.offsetTop));o.default.clearMark(d),d.addClass("drag-move")}};f.bind("mousedown",(function(a){var o=a.target,s=r.default.mouse.getCoord(a),l=s.x,d=s.y,n=Object(r.default)(o).parents(".drag"),h=n.find(".template");if(a.stopPropagation(),(!h.el||!h.attr("contentEditable"))&&!n.attr("id")&&!n.hasClass("lock")&&"none"!==n.children(".point-mark").style("display")){if(o.className.indexOf("dir")>=0)return e.dragNode=n.el,t.sizeNode=o,f.bind("mousemove",g);if(n.el){e.node=n.el,e._node=n;var b=n.getInfo();i=l-b.offsetLeft,c=d-b.offsetTop,p=b.offsetLeft,u=b.offsetTop,f.bind("mousemove",v)}}})).bind("mouseup",(function(t){if(e.dragNode){var a=Object(r.default)(e.dragNode),o=a.getInfo(),l=o.left,d=o.top,f=o.width,n=o.height,i=s.axesSpace;return(h("rc-w")||h("rt-wh")||h("rb-wh"))&&a.width(f-f%s.axesSpace+(f%s.axesSpace>0?s.axesSpace:0)),(h("lc-w")||h("lt-wh")||h("lb-wh"))&&a.width(f-f%s.axesSpace+(f%s.axesSpace>0?s.axesSpace:0)).left(l-l%s.axesSpace),(h("rb-wh")||h("lb-wh")||h("bc-h"))&&a.height(n-n%i+(n%i>0?i:0)),(h("tc-h")||h("rt-wh")||h("lt-wh"))&&a.height(n-n%i+(n%i>0?i:0)).top(d-d%i),!1}if(e._node){var c=e._node;c.style("zIndex",1);var p=c.getInfo(),u=p.left,g=p.top,v=p.offsetTop;if("relative"===c.style("position")){if(c.removeStyle("left,top"),Boolean(c.attr("center"))){var b=c.parent(".drag").outerWidth(),m=c.outerWidth(),w=(b-m)/2,x=w%s.axesSpace;c.left(w-x).width(m-(x?10:0))}if(c.hasClass("drag-move")){var C=c.parent().children(),S=C.length();C.each((function(e,t){if(!c.isSame(e)&&"relative"===e.style("position")){var a=e.getInfo(),o=v>a.offsetTop,r=v<a.offsetBottom;(t===S-1?o:o&&r)&&(g<0?e.before(c):g>0&&c.before(e))}}))}}else"devider"===c.attr("type")?c.left(u).top(g):c.left(u-u%s.axesSpace).top(g-g%s.axesSpace)}})).click(!0,(function(t){var a=t.target,s=Object(r.default)(a),l=s.parents(".drag");if(o.default.showMark(f,l),l.el&&!l.attr("id")){var d=s.parents(".loopNode");if(l.hasClass("hide")){var n=l.attr("mergeTable"),i=document.querySelectorAll(".loopNode"),c=Object(r.default)(i);i.length>0&&(d.el?(c.removeClass("activeLoop"),n?d.hasClass("tableSpan")?d.removeClass("tableSpan"):d.addClass("tableSpan"):d.addClass("activeLoop")):c.removeClass("activeLoop")),e._node=d}else e._node=l;e.setState({node:e._node.el,_node:e._node,hasNode:!0},(function(){e.runNode()}))}})).dblclick((function(e){var t=e.target,a=Object(r.default)(t),o=a.parents(".drag");if(o&&o.el){var s=o.attr("type"),l=o.attr("group"),d=o.attr("rooturl");if(!l&&d)return;var f=o.find(".template");if("table"!==s&&"ul"!==s&&"text"!==s&&"pages"!==s||o.addClass("hide"),a.parent(".drag").attr("group")&&(s=(f=a.parents(".loopNode")).attr("type"),l&&f.hasClass("x-bind-table")))return;if("text"===s||"pages"===s){if(o.attr("mergeTable"))return;f.contentEditable(!0).focus().once("blur",(function(e){Object(r.default)(this).removeAttr("contentEditable")}))}}})),Object(r.default)(document.body).once("mouseup",(function(a){var d=a.target,i=Object(r.default)(d).parents(".drag"),c=Object(r.default)(d).parents(".move").el,p=i.el&&!i.attr("id");if(e.dragNode||p||(e.stop=!1,f.finds(".drag").each((function(e){e.removeClass("hide"),o.default.clearMark(e)}))),p||c);else{var u=f.finds(".drag"),h=!1;u.length()>0&&(h=[].slice.call(u.el).some((function(e){return"block"===e.style.display}))),h||l.leak((function(){e.setState({node:null,_node:null,target:null,hasNode:null},(function(){e.cancelNode()}))}))();var b=f.finds(".loopNode");b.length()>0&&(b.removeClass("activeLoop").removeClass("tableSpan"),u.removeClass("hide").removeAttr("mergeTable")),o.default.resetBorder(f)}f.find(".drag-add").removeClass("drag-add"),f.find(".drag-move").removeClass("drag-move"),n.finds("i").each((function(e){e.background(s.axesColor)})),f.unbind("mousemove",v).unbind("mousemove",g),t.sizeNode=null,e.dragNode=null})),d.bind("mouseup",!0).bind("keyup",!0)}}}}]);