import React from 'react'
// ===================================================================== template
import List from './list'
// ===================================================================== upload
const { $fn } = window
const imageType = ['jpg','png','jpeg','gif']
const maxMB = 2
const maxKB = 1024 * 1024 * maxMB 	
const FileReaderUploader = e => {
	const file = e.target.files[0]
	const reader = new FileReader()
	reader.readAsDataURL(file)
	return new Promise(resolve => {
		reader.onload = function (e) {
			resolve(this.result)
		}
	})
}
const getValid = e => {
	if(!(e instanceof Event) || !e.target || !( e.target.files instanceof FileList)){  return $fn.toast('未选择要上传的图片') }
	const files = e.target.files
	let bool = true
	for(var i=0; i<files.length; i++){
		const file = files[i]
		// 判断上传文件格式
		const suffix = file.name.substring(file.name.lastIndexOf('.')+1).toLowerCase()
		if(imageType.indexOf(suffix) === -1){
			$fn.toast( file.name + '的格式必须为png、jpg、jpeg！')
			bool = false
			break
		}
		// 限制图片上传大小
		if(file.size > maxKB){
			$fn.toast( file.name + '文件尺寸超过最大限制' + maxMB + 'M')
			bool = false
			break
		}
	}
	return bool 
}
const Upload = async e => {
	if(getValid(e)){
		return await FileReaderUploader(e)
	}
}
// ===================================================================== page component
export default ({ parent }) => {
	const file = React.useRef()
	const onChange = React.useCallback( (name,value,none) => {
		const drag = parent.node
		if(drag){
			const $img = drag.querySelector('.template').querySelector('img')
			const obj = {}
			for(var i in name){
				obj.label = i
				obj.value = name[i]
			}
			if(obj.value === '') {
				if($img){ $img.parentNode.removeChild($img)}
				return
			}
			if($img){
				$img.setAttribute(obj.label,obj.value)
			}else{
				let imgNode = document.createElement('img')
				imgNode.setAttribute(obj.label,obj.value)
				imgNode.style.cssText = 'width:100%;height:100%'
				imgNode.draggable = false
				drag.querySelector('.template').appendChild(imgNode)
			}
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [ parent ])
	// 打开文件选择目录
	const openUpload = React.useCallback( e => {
		const drag = parent.node
		if(drag){
			file.current.click()
			file.current.onchange = e => {
				Upload(e).then(base64=>{
					const $img = drag.querySelector('.template').querySelector('img')
					
					if($img){
						$img.setAttribute('src',base64)
					}else{
						let imgNode = document.createElement('img')
						imgNode.setAttribute('src',base64)
						imgNode.style.cssText = 'width:100%;height:100%'
						imgNode.draggable = false
						drag.querySelector('.template').appendChild(imgNode)
					}
				})
			}
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [ parent ])
	return (
		<>
			<div>
				<List.Input label='外链' name='src' onChange={onChange} />
				<List.Button label='上传' name='src' text='图片上传' onClick={openUpload} />
			</div>
			<input type='file' ref={file}/>
		</>
	)
}