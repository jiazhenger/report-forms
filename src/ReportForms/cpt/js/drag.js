/**
 * 拖动元素
 * 
 */
export default {
	//  获取元素顶边距离页面左边与上边的距离
	getPos : function(ele){	
		var top=ele.offsetTop;	
		var left=ele.offsetLeft;
		var offsetEle=ele.offsetParent;
		while(offsetEle){
			top+=offsetEle.offsetTop;
			var bWidth=0;	
			if( bWidth = parseInt(offsetEle.style.borderTopWidth) ){		
				top+=bWidth;
			}
			left+=offsetEle.offsetLeft;
			offsetEle=offsetEle.offsetParent;	
		}	
		return {
			left:left,
			top:top
		}
	},
	// 获取元素位置信息
	getRect: function(boxId){
		var box = boxId.getBoundingClientRect();
		var value = {
			width: box.width,	// 宽度
			height: box.height,	// 高度
			
			left: parseInt(box.left),		// 元素左边距离页面左边的距离
			//top:top
			//top: $(boxId).offset().top,	// 元素顶边距离页面上边的距离
			
			top:this.getPos(boxId).top 		// 元素顶边距离页面上边的距离
		};
		
		return value;
	},
	// 获取鼠标信息
	getMouse: function(e){
		var pageX = e.pageX || e.x || e.screenX || e.clientX;
		var pageY = e.pageY || e.y || e.screenY || e.clientY;
		
		return {x:pageX,y:pageY}
	},
	// 获取元素相对位置
	getSite: function(e,boxId){
		var m = this.getMouse(e);
		var r = this.getRect(boxId);
		
		return { x: m.x-r.left, y: m.y - r.top }
	},
	move: function(boxIdSize,moveIdSize,coord,beyond){
		var boxSize = boxIdSize;	// 拖动范围盒子的尺寸
		var moveSize = moveIdSize/2;// 被拖动的元素的尺寸
		var x = coord;				// 当前纵坐标或横坐标
		var mx = 0;					// 计算能移动位置的坐标
		
		if(!beyond){
			if(x < moveSize){
				mx = 0
			}else if(x > boxSize-moveSize){
				mx = boxSize - moveSize*2
			}else{
				mx = x - moveSize
			}
		}else{
			if(x < 0){
				mx = -moveSize;
			}else if(x > boxSize){
				mx = boxSize - moveSize;
			}else{
				mx = x - moveSize
			}
		}
		return mx;
	},
	// 横向移动
	moveX: function(e,boxId,moveId,beyond,mw,mh,callback){
		var bs = boxId.clientWidth;
		var ms = moveId.clientWidth;
		var x = this.getSite(e,boxId).x;
		var left = this.move(bs,ms,x,beyond);
		var mw = mw || -(outerWidth/2)
		
		if(left <= mw){ return false; }
		
		moveId.style.left = left + 'px';
		
		var result = {x:x,left:left,centerX:left+ms/2,outerWidth:bs,innerWidth:ms};
		callback && callback(result);
		return result;
	},
	// 纵向移动
	moveY: function(e,boxId,moveId,beyond,mw,mh,callback){
		var bs = boxId.clientHeight;
		var ms = moveId.clientHeight;
		var y = this.getSite(e,boxId).y;
		var top = this.move(bs,ms,y,beyond);
		var mh = mh || -(outerHeight/2);
		if(top <= mh){ return false; }
		
		moveId.style.top = top + 'px';
		
		var result = {y:y,top:top,centerY:top+ms/2,outerHeight:bs,innerHeight:ms};
		callback && callback(result)
		return result
	},
	// 移动元素
	moveXY: function(e,boxId,moveId,beyond,mw,mh,callback){
		var sx = this.moveX(e,boxId,moveId,beyond,mw,mh);
		var sy = this.moveY(e,boxId,moveId,beyond,mw,mh);
		
		for(var i in sx){
			sy[i] = sx[i]
		}
		
		callback && callback(sy);
		
		return sy;
	},
	/*
	 * 最终 moveXY
	 * 
	 * @{ boxId }  # 拖动范围 id
	 * @{ moveId } # 拖动元素 id
	 * @{ dir }    # 拖动方向 moveX|moveY|moveXY
	 * #{ beyond } # 拖动是否会超出边界 true：不超出；false: 超出
	 * 
	 * */
	bindMoveXY: function(opt){
		var _this = this;
		var boxId = opt.boxId;
		var moveId = opt.moveId;
		var dir = opt.dir;
		var beyond = opt.beyond === undefined ? true : opt.beyond;
		var callback = opt.callback;
		var onlyDrag = opt.onlyDrag === undefined ? false : opt.onlyDrag;
		var mh = opt.mh;
		var mw = opt.mw;
		
		const move = e => {
			this[dir](e,boxId,moveId,beyond,mw,mh,callback)
		
		(!onlyDrag ? boxId : moveId).addEventListener('mousedown', function(e){
			if(!onlyDrag){ _this[dir](e,this,moveId,beyond,mw,mh,callback) }
			document.removeEventListener('mousemove',move)
		})
		
		window.addEventListener('mouseup', e=>{
			document.removeEventListener('mousemove',move)
		})
	}
}
/*
 * 使用
bindMoveXY({
	boxId: $color,
	moveId: b,
	dir: 'moveXY',
	callback: function(result){
		
	}
})
*/
