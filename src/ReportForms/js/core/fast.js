/**
 * 快捷键
 * */
export default {
	init(_this){
		// 监听键盘按键
		document.addEventListener('keyup',e=>{
			const { keyCode } = e
			if((keyCode === 8 || keyCode === 110) && !_this.stop){
				this.del(_this)
			}
		})
		document.querySelector('#del').addEventListener('click',e=>this.del(_this))
		document.querySelector('#delAll').addEventListener('click',e=>this.delAll(_this))
		
	},
	// 删除选中的拖动元素
	del(_this){
		if(_this.node && _this.node.parentNode){
			_this.node.parentNode.removeChild(_this.node)
			_this.node = null
			_this.setState({hasNode:null, node:null})
		}else{
			window.$fn.toast('未选中目标')
		}
	},
	// 删除全部
	delAll(_this){
		// [].slice.call(document.querySelectorAll('.drag')).forEach(v=>v.parentNode.removeChild(v))
		// _this.node = null
		// _this.setState({hasNode:null, node:null})
		_this.$drag.innerHTML = ''
		window.$fn.remove('html')
	}
}