import React from 'react'
import Checkbox from '@antd/checkbox'
// ===================================================================== public js
// import Format from '../js/public/format'
const { $fn } = window
// ===================================================================== page component
const Tree = ({ data, layer, url, onSelect,}) => {
	const index = isNaN(layer) ? 0 : layer
	const onClick = React.useCallback( v => {
		onSelect && onSelect(v)
	},[onSelect])
	
	return (
		<ul layer={ index }>
			{
				$fn.hasArray(data) && data.map(( v, i ) => {
					const { name, value, children, checked, url, isArray, isObject, disabled } = v
					const TypeComponent = e => {
						if(isArray){
							return <i className='c0'>[ ]</i>
						}else if(isObject){
							return <i className='c0'>｛ ｝</i>
						}else{
							return null
						}
					}
					return (
						<li key={ i } style={ index === 0 ? {} : {marginLeft:'2em'} } url={url}>
							<h3 className={`fx ${disabled?'':'tap cp'}`} onClick={disabled ? null : onClick.bind(null, v)}>
								<Checkbox value={checked} disabled={disabled} />
								<span className='ml5 ex f13'>{ name } {<TypeComponent />}</span>
								<span className='ml5 g9 f12 omits-1'>{ value }</span>
							</h3>
							{
								$fn.hasArray(children) && (
									<Tree 
										data			= { children }
										layer			= { index + 1 } 
										onSelect		= { onSelect }
									/>
								)
							}
						</li>
					)
				})
			}
		</ul>
	)
}

export default  Tree