export default {
	// 默认执行
	init(_this){
		const del = () => {
			if(_this.node){
				_this.node.parentNode.removeChild(_this.node)
				_this.node = null
				_this.setState({hasNode:null, node:null})
			}else{
				window.$fn.toast('未选中目标')
			}
		}
		// 快捷键处理
		document.body.addEventListener('keyup',e=>{
			const { keyCode } = e
			if((keyCode === 8 || keyCode === 110) && !_this.stop){
				del()
			}
		})
		
		// 删除
		document.querySelector('#del').addEventListener('click',del)
	}
}