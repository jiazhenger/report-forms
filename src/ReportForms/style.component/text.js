import React from 'react'
import Async from '@com/async'
import Dom from '../js/public/dom'
// ===================================================================== antd
import { Collapse } from 'antd'
import Position from './tp/position'
import MergeTable from './tp/merge-table'
// ===================================================================== template
const Font  =  Async(()=>import('./tp/font'))
// const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Lock  =  Async(()=>import('./tp/lock'))
const Border  =  Async(()=>import('./tp/border'))
const Data  =  Async(()=>import('./tp/data'))
// const MergeTable =  Async(()=>import('./tp/merge-table'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ _node }) => {
	const [ td, setTd ] = React.useState(false)
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { _temp } ) => {
			setTd( _temp.tag('td') || _temp.tag('th') )
		})
	},[ _node ])
	return (
		<div className='abs_lt wh scroll'>
			<h5 className='control-title'>文本框</h5>
			<Collapse bordered={false} defaultActiveKey={['0','1','2','3','4']}>
				<Panel header='常规选项'>
					<Data _node={_node}/>
					<Lock _node={_node}/>
				</Panel>
				<Panel header='文本字体'><Font _node={_node}/></Panel>
				<Panel header='边框'><Border _node={_node}/></Panel>
				<Panel header='页面布局'><Layout _node={_node}/></Panel>
				{
					td 	? <Panel header='合并单元格'><MergeTable _node={_node}/></Panel>
						: <Panel header='位置 && 大小'><Position _node={_node}/></Panel>
				}
			</Collapse>
		</div>
	)
}