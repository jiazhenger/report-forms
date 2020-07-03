import React from 'react'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from '../public.component/list'
// import { Ratio, Paper } from '../js/public/paper'
import { Paper } from '../js/public/paper'
// ===================================================================== declare
const { Panel } = Collapse
const { $fn } = window
// const getPx = (mm, ratio) => Math.round(mm/10 * (ratio/2.54))  // 根据分辨与纸张获取元素宽度
// ===================================================================== page component
export default ({ $paper, $drag }) => {
	// const fixedHeaderRef = React.useRef()
	// const fixedFooterRef = React.useRef()
	// const [ ratio, setRatio ] = React.useState(96)
	// const [ paper, setPaper ] = React.useState('0*0')
	// const getSize = React.useCallback(()=>{
	// 	const arr = paper.split('*')
	// 	console.log(paper, ratio)
	// 	if($fn.hasArray(arr)){
	// 		const w = arr[0]
	// 		const h = arr[1]
	// 		const px = [ getPx(w,ratio), getPx(h,ratio)  ]
	// 	}
	// }, [ratio,paper])
	// const onSelectRatio = React.useCallback(v=>{
	// 	setRatio(v)
	// 	setTimeout(()=>getSize())
	// }, [ getSize ])
	const onSelectPaper = React.useCallback(v=>{
		// setPaper(v)
		// setTimeout(()=>getSize())
		const arr = v.split('*')
		if($fn.hasArray(arr)){
			// const w = arr[0]
			// const h = arr[1]
		}
	}, [  ])
	// 固定头
	/*
	const onFixedHeader = React.useCallback(v=>{
		const $drag = document.querySelector('#dragContent')
		let header = $drag.querySelector('header')
		if(v){
			if(header){
				header.parentNode.removeChild(header)
			}
			header = document.createElement('header')
			
			header.style.cssText = 'width:100%;height:300px;border:1px solid red'
			$drag.appendChild(header)
		}else{
			header.parentNode.removeChild(header)
		}
	}, [  ])
	*/
	return (
		<div className='abs_lt wh scroll'>
			<h5 className='control-title'>报表</h5>
			<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
				<Panel header='常规选项'>
					<div>
						{/*<List.Select value={ratio} label='分辨率' data={Ratio} p='选择屏幕分辨率' onChange={onSelectRatio} />*/}
						<List.Select value={'A4'} label='纸张' data={Paper} p='选择纸张' onChange={onSelectPaper} />
					</div>
					{/*
						<div>
							<List.Switch label='页眉' ref={fixedHeaderRef}  onChange={onFixedHeader}/>
							<List.Switch label='页脚' ref={fixedFooterRef}  onChange={onFixedHeader}/>
						</div>
					*/}
				</Panel>
			</Collapse>
		</div>
	)
}