(this["webpackJsonpreact-report-forms"]=this["webpackJsonpreact-report-forms"]||[]).push([[56,61],{44:function(e,o){e.exports={differ:10,axesColor:"#eee",axesActiveColor:"#000",axesSpace:10,scrollSpace:10,barcode:{lineColor:"black",width:5,height:100,fontSize:32,displayValue:!0},qrcode:{type:"image/png",colorDark:"#000",colorLight:"#fff",errorCorrectionLevel:"H",margin:1},tableConfig:{style:{padding:"2px 5px",height:"20px",boxSizing:"content-box",border:"1px solid #ddd"}},paperParam:{format:"A4",width:"810px",height:"1150px",name:"\u62a5\u8868"}}},62:function(e,o,t){"use strict";t.r(o);var a=t(44),r=function(e,o,t,r,c){for(var i="",n=c?o/r:t/r,s=0;s<n+1;s++){i+=c?"<i class='abs' value='".concat(s*r,"' style='width:1px;height:").concat(t,"px;background:").concat(a.axesColor,";top:0;left:").concat(s*r,"px'></i>"):"<i class='abs w' value='".concat(s*r,"' style='height:1px;background:").concat(a.axesColor,";left:0;top:").concat(s*r,"px'></i>")}var l=document.createElement("div");l.className=(c?"axesY":"axesX")+" rel",l.style.zIndex="-1",l.innerHTML=i,e.appendChild(l)};o.default={init:function(){var e=document.querySelector("#axes"),o=e.querySelector(".axesX"),t=e.querySelector(".axesY");o&&o.remove(),t&&t.remove();var c=function(){var o=e.clientWidth,t=e.clientHeight;r(e,o,t,a.axesSpace,!0),r(e,o,t,a.axesSpace)};c(),window.addEventListener("resize",(function(o){e.querySelector(".axesX").remove(),e.querySelector(".axesY").remove(),c()}))}}}}]);