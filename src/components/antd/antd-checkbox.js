/* ====================================== toast  ====================================== */
import React from 'react'
import { Switch } from 'antd'
// ===================================================================== Select
export default class Index extends React.Component {
	state = {
		
	}
	onChange = value => {
		const { onChange, name } = this.props
		this.setState({ value },()=>{
			let rs = this.state.value ? 0 : 1
			onChange && onChange( name ? { [name]: rs } : rs )
		})
	}
	setValue = value => this.setState({ value })
	
	clear = () => this.setValue(false)
	
	render(){
		const  { size, disabled, onClick, loading } = this.props
		const value = this.state.value === undefined ? this.props.value : this.state.value
		return (
			<Switch
				size			= { size || 'large' } 
				onChange		= { onClick ? null : this.onChange }
				onClick			= { onClick }
				checked		 	= { value === 0 || value === true ? true : false }
				disabled		= { disabled }
				loading			= { loading }
			/>
		)
	}
}