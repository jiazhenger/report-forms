import React from 'react'
import Async from '@com/async'
// ===================================================================== public component
import Li from './li'
const Input  =  Async(()=>import('@antd/input'))
const Select  =  Async(()=>import('@antd/select'))
const Switch  =  Async(()=>import('@antd/switch'))
// import Button from '@antd/button'
// ===================================================================== page component
const StaticSwitch = ({ label, value, name, onChange, disabled }) => <Li label={label}><Switch size='small' name={name} value={value} onChange={onChange} disabled={disabled}/></Li>
const StaticInput = ({ label, value, name, onChange, disabled, isHalf }) =>  <Li isHalf={isHalf} label={label}><Input size='small' name={name} value={value} onChange={onChange}  disabled={disabled}/></Li>
const StaticSelet = ({ label, value, name, onChange, data, p, isHalf, disabled }) =>  <Li isHalf={isHalf} label={label}><Select data={data} p={p} size='small' name={name} value={value} onChange={onChange}  disabled={disabled}/></Li>
// Input
export default class extends React.Component{
	static Switch = StaticSwitch
	static Input = StaticInput
	static Select = StaticSelet
	render(){
		const { label, value } = this.props
		return <Li label={label} value={value} />
	}
}