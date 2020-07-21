/**
 * 快捷键
 * */
export default {
	init(_this){
		// 监听键盘按键
		document.addEventListener('keyup',e=>{
			const { keyCode } = e
			if((keyCode === 46 || keyCode === 110) && !_this.stop){
				this.del(_this)
			}
			if(_this.node){
				_this.node.onclick = null
			}
		})
		document.querySelector('#del').addEventListener('click',e=>this.del(_this))
		document.querySelector('#delAll').addEventListener('click',e=>this.delAll(_this))
		
		document.addEventListener('keydown',e=>{
			// if(e.ctrlKey && _this.node){
			// 	_this.node.onclick = e => this.copy(_this)
			// }
		})
	},
	copy(_this){
		const clone = _this.node.cloneNode(true)
		_this.node.parentElement.appendChild(clone)
	},
	// 删除选中的拖动元素
	del(_this){
		const _node = _this.state.node
		if(_node){
			_node.remove()
			_this.node = null
			_this._node = null
			_this.setState({hasNode:null, node:null, _node:null })
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
		window.$fn.remove('myHeight')
		window.$fn.remove('myWidth')
		window.$fn.remove('paper')
		window.location.reload()
	}
}