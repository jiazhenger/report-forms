(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[49],{65:function(e,t,a){"use strict";a.r(t);var o=a(44),r=a(43),s=a(45),l=window.$fn;t.default={init:function(e){var t=this,a=e.__scroll,d=e.__control,n=e.__drag,f=e.__axes,i=0,c=0,p=0,u=0,h=function(e){return Object(r.default)(t.sizeNode).hasClass(e)},g=function(t){var o=r.default.mouse.getCoord(t),s=o.x,l=o.y,d=a.getInfo(),n=d.scrollTop,f=d.scrollLeft;if(e.dragNode){var i=Object(r.default)(e.dragNode),c=i.parent(".drag").getInfo(),p=c.offsetLeft,u=c.offsetTop,g=i.getInfo(),v=g.offsetLeft,b=g.offsetTop,m=g.width,w=g.height,x=g.left,C=g.top;if((h("rc-w")||h("rt-wh")||h("rb-wh"))&&i.width(s-v+f),h("lc-w")||h("lt-wh")||h("lb-wh")){var S=s+f;x>=0&&i.width(v-S+m).left(S-p)}if((h("rb-wh")||h("lb-wh")||h("bc-h"))&&i.height(l-b+n),h("tc-h")||h("rt-wh")||h("lt-wh")){var N=l+n;C>=0&&i.height(b-N+w).top(N-u)}}},v=function(t){var a=r.default.mouse.getCoord(t),s=a.x,l=a.y,d=e._node,f=n.getInfo(),h=d.parent(".drag").getInfo(),g=h.offsetLeft,v=h.offsetTop,b=h.width,m=h.height,w=d.getInfo(),x=w.width,C=w.height;if(d.el){var S=s-i-g,N=l-c-v;if("relative"===d.style("position")){var y=d.parent(".drag").getInfo();N=l-c-u,((S=s-i-p)<0&&Math.abs(S)<=p-g||S>0&&S<=b-(p-g)-x)&&d.left(S),(N<0&&Math.abs(N)<=u-v||N>0&&N<=m-(u-v)-C)&&d.top(N),o.default.setMark(e,".axesY",S+(g-f.offsetLeft)+(p-y.offsetLeft)),o.default.setMark(e,".axesX",N+(v-f.offsetTop)+(u-y.offsetTop))}else S>=0&&S<=b-x&&d.left(S),N>=0&&N<=m-C&&d.top(N),o.default.setMark(e,".axesY",S+(g-f.offsetLeft)),o.default.setMark(e,".axesX",N+(v-f.offsetTop));o.default.clearMark(d),d.addClass("drag-move")}};n.bind("mousedown",(function(a){var o=a.target,s=r.default.mouse.getCoord(a),l=s.x,d=s.y,f=Object(r.default)(o).parents(".drag"),h=f.find(".template");if(a.stopPropagation(),(!h.el||!h.attr("contentEditable"))&&!f.attr("id")&&!f.parents(".lock").el&&"none"!==f.children(".point-mark").style("display")){if(o.className.indexOf("dir")>=0)return e.dragNode=f.el,t.sizeNode=o,n.bind("mousemove",g);if(f.el){e.node=f.el,e._node=f;var b=f.getInfo();i=l-b.offsetLeft,c=d-b.offsetTop,p=b.offsetLeft,u=b.offsetTop,n.bind("mousemove",v)}}})).bind("mouseup",(function(t){if(e.dragNode){var a=Object(r.default)(e.dragNode),o=a.getInfo(),l=o.left,d=o.top,n=o.width,f=o.height,i=s.axesSpace;return(h("rc-w")||h("rt-wh")||h("rb-wh"))&&a.width(n-n%s.axesSpace+(n%s.axesSpace>0?s.axesSpace:0)),(h("lc-w")||h("lt-wh")||h("lb-wh"))&&a.width(n-n%s.axesSpace+(n%s.axesSpace>0?s.axesSpace:0)).left(l-l%s.axesSpace),(h("rb-wh")||h("lb-wh")||h("bc-h"))&&a.height(f-f%i+(f%i>0?i:0)),(h("tc-h")||h("rt-wh")||h("lt-wh"))&&a.height(f-f%i+(f%i>0?i:0)).top(d-d%i),!1}if(e._node){var c=e._node;c.style("zIndex",1);var p=c.getInfo(),u=p.left,g=p.top,v=p.offsetTop;if("relative"===c.style("position")){if(c.removeStyle("left,top"),Boolean(c.attr("center"))){var b=c.parent(".drag").outerWidth(),m=c.outerWidth(),w=(b-m)/2,x=w%s.axesSpace;c.left(w-x).width(m-(x?10:0))}if(c.hasClass("drag-move")){var C=c.parent().children(),S=C.length();C.each((function(e,t){if(!c.isSame(e)&&"relative"===e.style("position")){var a=e.getInfo(),o=v>a.offsetTop,r=v<a.offsetBottom;(t===S-1?o:o&&r)&&(g<0?e.before(c):g>0&&c.before(e))}}))}}else"devider"===c.attr("type")?c.left(u).top(g):c.left(u-u%s.axesSpace).top(g-g%s.axesSpace)}})).click(!0,(function(t){var a=t.target,s=Object(r.default)(a),l=s.parents(".drag");if(o.default.showMark(n,l),l.el&&!l.attr("id")){var d=s.parents(".loopNode");if(l.hasClass("hide")){var f=l.attr("mergeTable"),i=document.querySelectorAll(".loopNode"),c=Object(r.default)(i);i.length>0&&(d.el?(c.removeClass("activeLoop"),f?d.hasClass("tableSpan")?d.removeClass("tableSpan"):d.addClass("tableSpan"):d.addClass("activeLoop")):c.removeClass("activeLoop")),e._node=d}else e._node=l;e.setState({node:e._node.el,_node:e._node,hasNode:!0},(function(){e.runNode()}))}})).dblclick((function(e){var t=e.target,a=Object(r.default)(t),o=a.parents(".drag");if(o&&o.el){var s=o.attr("type"),l=o.attr("group"),d=o.attr("rooturl");if(!l&&d)return;var n=o.find(".template");if("table"!==s&&"ul"!==s&&"text"!==s&&"pages"!==s||o.addClass("hide"),a.parent(".drag").attr("group")&&(s=(n=a.parents(".loopNode")).attr("type"),l&&n.hasClass("x-bind-table")))return;if("text"===s||"pages"===s){if(o.attr("mergeTable"))return;n.contentEditable(!0).focus().once("blur",(function(e){Object(r.default)(this).removeAttr("contentEditable")}))}}})),Object(r.default)(document.body).once("mouseup",(function(a){var d=a.target,i=Object(r.default)(d).parents(".drag"),c=Object(r.default)(d).parents(".move").el,p=i.el&&!i.attr("id");if(e.dragNode||p||(e.stop=!1,n.finds(".drag").each((function(e){e.removeClass("hide"),o.default.clearMark(e)}))),p||c);else{var u=n.finds(".drag"),h=!1;u.length()>0&&(h=[].slice.call(u.el).some((function(e){return"block"===e.style.display}))),h||l.leak((function(){e.setState({node:null,_node:null,target:null,hasNode:null},(function(){e.cancelNode()}))}))();var b=n.finds(".loopNode");b.length()>0&&(b.removeClass("activeLoop").removeClass("tableSpan"),u.removeClass("hide").removeAttr("mergeTable")),o.default.resetBorder(n)}n.find(".drag-add").removeClass("drag-add"),n.find(".drag-move").removeClass("drag-move"),n.find(".drag-current").removeClass("drag-current"),n.find(".border-parent").removeClass("drag-parent"),f.finds("i").each((function(e){e.background(s.axesColor)})),n.unbind("mousemove",v).unbind("mousemove",g),t.sizeNode=null,e.dragNode=null})),d.bind("mouseup",!0).bind("keyup",!0)}}}}]);