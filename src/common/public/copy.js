import { message } from 'antd'
export default (el,content) => {
	el.select()
	document.execCommand('copy')
	message.success('复制成功')
}