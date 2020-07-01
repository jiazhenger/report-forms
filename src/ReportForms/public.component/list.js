import React from 'react'
import Async from '@com/async'
// ===================================================================== public component
import Li from './li'
import Input from '@antd/input'
import Select from '@antd/select'
import Switch from '@antd/switch'
// const Input  =  Async(()=>import('@antd/input'))
// const Select  =  Async(()=>import('@antd/select'))
// const Switch  =  Async(()=>import('@antd/switch'))
const Button  =  Async(()=>import('@antd/button'))
// ===================================================================== page component
// const StaticSwitch = ({ label, value, name, onChange, disabled }) => <Li label={label}><Switch size='small' name={name} value={value} onChange={onChange} disabled={disabled}/></Li>
// const StaticInput = ({ label, value, name, onChange, disabled, isHalf }) =>  <Li isHalf={isHalf} label={label}><Input size='small' name={name} value={value} onChange={onChange}  disabled={disabled}/></Li>
// const StaticSelet = ({ label, value, name, onChange, data, p, isHalf, disabled }) =>  <Li isHalf={isHalf} label={label}><Select data={data} p={p} size='small' name={name} value={value} onChange={onChange}  disabled={disabled}/></Li>
const StaticButton = ({ label, name, onClick, isHalf, text, disabled }) =>  <Li isHalf={isHalf} label={label}><Button size='small' name={name} label={text} onClick={onClick}  disabled={disabled}/></Li>

class StaticSwitch extends React.Component{
	setValue = v => this.refs.switch.setValue(v)
	render(){
		const { label, value, name, onChange, disabled } = this.props
		return  <Li label={label}><Switch ref='switch' size='small' name={name} value={value} onChange={onChange} disabled={disabled}/></Li>
	}
}

class StaticSelet extends React.Component{
	setValue = v => this.refs.select.setValue(v)
	
	render(){
		const { label, value, name, onChange, disabled, isHalf, p, data } = this.props
		return  <Li isHalf={isHalf} label={label}><Select ref='select' data={data} p={p} size='small' name={name} value={value} onChange={onChange}  disabled={disabled}/></Li>
	}
}

class StaticInput extends React.Component{
	setValue = v => this.refs.input.setValue(v)
	getValue = () => this.refs.input.state.value
	render(){
		const { label, value, name, onChange, disabled, isHalf, labelWidth, size, suffix } = this.props
		return  <Li isHalf={isHalf} label={label} labelWidth={labelWidth} suffix={suffix}><Input ref='input' size={size||'small'} name={name} value={value} onChange={onChange}  disabled={disabled}/></Li>
	}
}

export default class extends React.Component{
	static Switch = StaticSwitch
	static Input = StaticInput
	static Select = StaticSelet
	static Button = StaticButton
	render(){
		const { label, value } = this.props
		return <Li label={label} value={value} />
	}
}