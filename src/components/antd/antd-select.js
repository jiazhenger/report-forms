/* ====================================== toast  ====================================== */
import React from 'react'
import { Select } from 'antd'
const { $fn } = window
// ===================================================================== Select
export default class Index extends React.Component {
	state = {
		data:[],
	}
	
	onChange = (value, data) => {
		const { onChange, name } = this.props
		this.setState({ value },()=>{
			onChange && onChange( name ? {[name]:value} : value, data)
		})
	}
	
	setValue = value =>  this.setState({ value: value})
	
	clear = () => this.setState({ value: '', key:this.state.key+1 })
	
	render(){
		const { data, idStr, nameStr, p , width, size, style,isP, className, mode } = this.props
		const { key } = this.state
		const xdata = data || this.state.data
		const nStr = nameStr || 'name'
		const iStr = idStr || 'id'
		const t = p ? p : ''
		
		const value = this.state.value === undefined ? this.props.value : this.state.value
		
		let height = {}
		
		return (
			<Select 
				key 		= { key }
				size		= { size || 'large' } 
				onChange	= { this.onChange } 
				style		= {{ width,...height,...style }} 
				value 		= { value }
				className 	= { className||''}
				placeholder	= { isP ? '请选择' + t :  t  }
				disabled 	= { !$fn.hasArray(xdata) }
				mode		= { mode }
				allowClear
			>
				{
					$fn.hasArray(xdata) && xdata.map( (v,i) => <Select.Option key={v[iStr]} value={v[iStr]} style={{marginRight:'20px'}}>{v[nStr]}</Select.Option> )
				}
			</Select>
		)
	}
}