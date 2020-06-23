import React from 'react'

import Checkbox from '@antd/checkbox'

const { $fn } = window
// ===================================================================== page component
const Tree = ({ data, layer, url }) => {
	const [ result, setResult ] = React.useState([])
	const checkbox = React.useRef()
	
	React.useEffect(()=>{
		if($fn.hasArray(data)){
			setResult(data[0])
		}else if($fn.hasObject(data)){
			setResult(data)
		}else if(data !== null && data !== undefined){
			setResult(data)
		}
	},[ data ])
	
	const onClick = React.useCallback( url => {
		console.log(url)
	},[])
	return (
		<ul layer={ layer }>
			{
				$fn.hasObject(result) && Object.keys(result).map(( v, i ) => {
					let num = $fn.hasArray(result[v]) ? '/0' : ''
					let urls = url + '/' + v + num
					return (
						<li key={ i } style={ isNaN(layer) ? {} : {marginLeft:'2em'} }>
							<div className='fx tap cp'  onClick={onClick.bind(null, urls)}>
								<div className='ml5 ex f13'>{ v }</div>
								{
									typeof(result[v]) === 'string' && <div className='ml5 g9 f12 omits-1'>{ result[v] }</div>
								}
							</div>
							{
								typeof( result[v] ) === 'object' && <Tree data={ result[v] } layer={ i+1 } url={urls}/>
							}
						</li>
					)
				})
			}
		</ul>
	)
}

export default  Tree