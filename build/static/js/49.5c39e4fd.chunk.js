(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[49],{65:function(e,t,a){"use strict";a.r(t);var o=a(44),r=a(43),d=a(45),l=window.$fn;t.default={init:function(e){var t=this,a=e.__scroll,s=e.__control,n=e.__drag,f=e.__axes,i=0,c=0,u=0,p=0,h=function(e){return Object(r.default)(t.sizeNode).hasClass(e)},g=function(t){var o=r.default.mouse.getCoord(t),d=o.x,l=o.y,s=a.getInfo(),n=s.scrollTop,f=s.scrollLeft;if(e.dragNode){var i=Object(r.default)(e.dragNode),c=i.parent(".drag").getInfo(),u=c.offsetLeft,p=c.offsetTop,g=i.getInfo(),v=g.offsetLeft,b=g.offsetTop,m=g.width,w=g.height,x=g.left,C=g.top;if((h("rc-w")||h("rt-wh")||h("rb-wh"))&&i.width(d-v+f),h("lc-w")||h("lt-wh")||h("lb-wh")){var y=d+f;x>=0&&i.width(v-y+m).left(y-u)}if((h("rb-wh")||h("lb-wh")||h("bc-h"))&&i.height(l-b+n),h("tc-h")||h("rt-wh")||h("lt-wh")){var N=l+n;C>=0&&i.height(b-N+w).top(N-p)}}},v=function(t){var a=r.default.mouse.getCoord(t),d=a.x,l=a.y,s=e._node,f=n.getInfo(),h=s.parent(".drag").getInfo(),g=h.offsetLeft,v=h.offsetTop,b=h.width,m=h.height,w=s.getInfo(),x=w.width,C=w.height;if(s.el){var y=d-i-g,N=l-c-v;if("relative"===s.style("position")){var S=s.parent(".drag").getInfo();N=l-c-p,((y=d-i-u)<0&&Math.abs(y)<=u-g||y>0&&y<=b-(u-g)-x)&&s.left(y),(N<0&&Math.abs(N)<=p-v||N>0&&N<=m-(p-v)-C)&&s.top(N),o.default.setMark(e,".axesY",y+(g-f.offsetLeft)+(u-S.offsetLeft)),o.default.setMark(e,".axesX",N+(v-f.offsetTop)+(p-S.offsetTop))}else y>=0&&y<=b-x&&s.left(y),N>=0&&N<=m-C&&s.top(N),o.default.setMark(e,".axesY",y+(g-f.offsetLeft)),o.default.setMark(e,".axesX",N+(v-f.offsetTop));o.default.clearMark(s),s.addClass("drag-move")}};n.bind("mousedown",(function(a){var o=a.target,d=r.default.mouse.getCoord(a),l=d.x,s=d.y,f=Object(r.default)(o).parents(".drag"),h=f.find(".template");if(a.stopPropagation(),(!h.el||!h.attr("contentEditable"))&&!f.attr("id")&&!f.hasClass("lock")&&"none"!==f.children(".point-mark").style("display")){if(o.className.indexOf("dir")>=0)return e.dragNode=f.el,t.sizeNode=o,n.bind("mousemove",g);if(f.el){e.node=f.el,e._node=f;var b=f.getInfo();i=l-b.offsetLeft,c=s-b.offsetTop,u=b.offsetLeft,p=b.offsetTop,n.bind("mousemove",v)}}})).bind("mouseup",(function(t){if(e.dragNode){var a=Object(r.default)(e.dragNode),o=a.getInfo(),l=o.left,s=o.top,n=o.width,f=o.height,i=d.axesSpace;return"img"===a.attr("type")&&(i=0),(h("rc-w")||h("rt-wh")||h("rb-wh"))&&a.width(n-n%d.axesSpace+(n%d.axesSpace>0?d.axesSpace:0)),(h("lc-w")||h("lt-wh")||h("lb-wh"))&&a.width(n-n%d.axesSpace+(n%d.axesSpace>0?d.axesSpace:0)).left(l-l%d.axesSpace),(h("rb-wh")||h("lb-wh")||h("bc-h"))&&a.height(f-f%i+(f%i>0?i:0)),(h("tc-h")||h("rt-wh")||h("lt-wh"))&&a.height(f-f%i+(f%i>0?i:0)).top(s-s%i),!1}if(e._node){var c=e._node;c.style("zIndex",1);var u=c.getInfo(),p=u.left,g=u.top;if("relative"===c.style("position")){if(c.removeStyle("left,top"),Boolean(c.attr("center"))){var v=c.parent(".drag").outerWidth(),b=c.outerWidth(),m=(v-b)/2,w=m%d.axesSpace;c.left(m-w).width(b-(w?10:0))}}else"devider"===c.attr("type")||"img"===c.attr("type")?c.left(p).top(g):c.left(p-p%d.axesSpace).top(g-g%d.axesSpace)}})).click(!0,(function(t){var a=t.target,d=Object(r.default)(a),l=d.parents(".drag");if(o.default.showMark(n,l),l.el&&!l.attr("id")){var s=d.parents(".loopNode");if(l.hasClass("hide")){var f=l.attr("mergeTable"),i=document.querySelectorAll(".loopNode"),c=Object(r.default)(i);i.length>0&&(s.el?(c.removeClass("activeLoop"),f?s.hasClass("tableSpan")?s.removeClass("tableSpan"):s.addClass("tableSpan"):s.addClass("activeLoop")):c.removeClass("activeLoop")),e._node=s}else e._node=l;e.setState({node:e._node.el,_node:e._node,hasNode:!0},(function(){e.runNode()}))}})).dblclick((function(e){var t=e.target,a=Object(r.default)(t),o=a.parents(".drag");if(o&&o.el){var d=o.attr("type"),l=o.attr("group"),s=o.attr("rooturl");if(!l&&s)return;var n=o.find(".template");if("table"!==d&&"ul"!==d&&"text"!==d&&"pages"!==d||o.addClass("hide"),a.parent(".drag").attr("group")&&(d=(n=a.parents(".loopNode")).attr("type"),l&&n.hasClass("x-bind-table")))return;if("text"===d||"pages"===d){if(o.attr("mergeTable"))return;n.contentEditable(!0).focus().once("blur",(function(e){Object(r.default)(this).removeAttr("contentEditable")}))}}})),Object(r.default)(document.body).once("mouseup",(function(a){var s=a.target,i=Object(r.default)(s).parents(".drag"),c=Object(r.default)(s).parents(".move").el,u=i.el&&!i.attr("id");if(e.dragNode||u||(e.stop=!1,n.finds(".drag").each((function(e){e.removeClass("hide"),o.default.clearMark(e)}))),u||c);else{var p=n.finds(".drag"),h=!1;p.length()>0&&(h=[].slice.call(p.el).some((function(e){return"block"===e.style.display}))),h||l.leak((function(){e.setState({node:null,_node:null,target:null,hasNode:null},(function(){e.cancelNode()}))}))();var b=n.finds(".loopNode");b.length()>0&&(b.removeClass("activeLoop").removeClass("tableSpan"),p.removeClass("hide").removeAttr("mergeTable")),o.default.resetBorder(n)}n.find(".drag-add").removeClass("drag-add"),n.find(".drag-move").removeClass("drag-move"),n.find(".drag-current").removeClass("drag-current"),n.find(".border-parent").removeClass("drag-parent"),f.finds("i").each((function(e){e.background(d.axesColor)})),n.unbind("mousemove",v).unbind("mousemove",g),t.sizeNode=null,e.dragNode=null})),s.bind("mouseup",!0).bind("keyup",!0)}}}}]);