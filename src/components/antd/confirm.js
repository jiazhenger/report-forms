/* ====================================== toast  ====================================== */
import React from 'react'
import Modal from './antd-modal'
// ===================================================================== 选择字典表数据
export default class extends React.Component {
    onYes = () => {
    	const { onOk, noClose } = this.props
    	onOk && onOk()
    	if(!noClose){ this.close() }
    }

    open = () => this.refs.modal.open()
    
    close = () => this.refs.modal.close()
    
    render(){
    	const { title, loading, msg, noClose } = this.props
		return (
			<Modal loading={loading} title={title || '提示'} ref='modal' onOk={this.onYes} noClose={noClose} maskClose={false}>
				<p className='tc g2 f16'>{msg || '确认提交？'}</p>
			</Modal>
		)
    }
}