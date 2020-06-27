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
export default ({ $paper }) => {
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
	return (
		<div className='abs_lt wh scroll'>
			<h5 className='control-title'>报表</h5>
			<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
				<Panel header='常规选项'>
					<div>
						{/*<List.Select value={ratio} label='分辨率' data={Ratio} p='选择屏幕分辨率' onChange={onSelectRatio} />*/}
						<List.Select value={'210*297'} label='纸张' data={Paper} p='选择纸张' onChange={onSelectPaper} />
					</div>
				</Panel>
			</Collapse>
		</div>
	)
}