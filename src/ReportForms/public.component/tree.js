import React from 'react'
import Checkbox from '@antd/checkbox'

const { $fn } = window
// ===================================================================== page component
const Tree = ({ data, checkData, layer, url, onSelect, loop }) => {
	const [ result, setResult ] = React.useState({})
	const index = isNaN(layer) ? 0 : layer
	React.useEffect(()=>{
		
		if($fn.hasArray(data)){
			setResult(data[0])
		}else if($fn.hasObject(data)){
			setResult(data)
		}else if(data !== null && data !== undefined){
			setResult(data)
		}
		
	},[ data, checkData ])
	const onClick = React.useCallback( (url,checked) => {
		// currentList.checked = !currentList.checked
		onSelect && onSelect(url, checked)
	},[onSelect])
	
	return (
		<ul layer={ index }>
			{
				$fn.hasObject(result) && Object.keys(result).sort().map(( v, i ) => {
					let num = $fn.hasArray(result[v]) ? '/0' : ''
					let urls = url + '/' + v + num
					if(index === 0 && $fn.hasArray(data)){
						urls = url + num + '/0/' + v
					}
					const TypeComponent = e => {
						if($fn.hasArray(result[v])){
							return <i className='c0'>[ ]</i>
						}else if($fn.hasObject(result[v])){
							return <i className='c0'>｛ ｝</i>
						}else{
							return null
						}
					}
					let disabled = false
					// const disabled = $fn.hasArray(result[v]) || $fn.hasObject(result[v])  // 禁用数组
					if( +loop === 1 ){
						disabled = !$fn.hasArray(result[v]) || $fn.hasObject(result[v])
					}else{
						disabled = urls.indexOf('0') >= 0 || $fn.hasObject(result[v])
					}
					return (
						<li key={ i } style={ index === 0 ? {} : {marginLeft:'2em'} }>
							<div className={`fx ${disabled?'':'tap cp'}`} onClick={disabled ? null : onClick.bind(null, urls, checkData[v].checked,)}>
								<Checkbox value={checkData[v].checked} disabled={disabled} />
								<div className='ml5 ex f13'>{ v } {<TypeComponent />}</div>
								{
									typeof(result[v]) === 'string' && <div className='ml5 g9 f12 omits-1'>{ result[v] }</div>
								}
							</div>
							{
								typeof( result[v] ) === 'object' && (
									<Tree 
										data		= { result[v] } 
										checkData	= { checkData[v] } 
										layer		= { index + 1 } 
										url			= { urls }
										onSelect	= { onSelect }
										loop		= { loop }
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