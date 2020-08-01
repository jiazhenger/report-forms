import React from 'react'
// ===================================================================== template
import List from '../../public.component/list'
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
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
export default ({ _node }) => {
	const file = React.useRef()
	const link = React.useRef()
	
	React.useEffect(()=>{
		if(_node.el){
			const src = _node.find('img').src()
			if(src){
				link.current.setValue(src)
			}
		}
		
	},[ _node ])
	
	const onChange = React.useCallback( (name,value,none) => {
		Dom.getNodeInfo(_node).then(({ _temp }) => {
			const _img = _temp.find('img')
			const { key, value } = _.getKeyValue(name) 
			
			if(key === '') {
				_img.remove()
				return
			}
			if(_img.el){
				_img.attr({
					[key]:value,
					temp: 1
				}).cssText('width:100%;height:100%;margin:0')
			}else{
				const imgNode = document.createElement('img')
				_(imgNode).attr({
					[key]:value,
					temp: 1,
					draggable:false
				}).cssText('width:100%;height:100%;margin:0')
				_temp.append(imgNode)
			}
		})
	}, [ _node ])
	// 打开文件选择目录
	const openUpload = React.useCallback( e => {
		Dom.getNodeInfo(_node).then(({ _temp }) => {
			file.current.click()
			file.current.onchange = e => {
				Upload(e).then(base64=>{
					const _img = _temp.find('img')
					if(_img.el){
						_img.attr({
							src:base64,
							temp: 1,
						}).cssText('width:100%;height:100%;margin:0')
					}else{
						const imgNode = document.createElement('img')
						_(imgNode).attr({
							src:base64,
							temp: 1,
							draggable:false
						}).cssText('width:100%;height:100%;margin:0')
						_temp.append(imgNode)
					}
				})
			}
		})
	}, [ _node ])
	return (
		<>
			<div>
				<List.Input label='外链' ref={link} name='src' onChange={onChange} />
				<List.Button label='上传' name='src' text='图片上传' onClick={openUpload} />
			</div>
			<input type='file' ref={file}/>
		</>
	)
}