import React from 'react'
import Dom from '../js/public/dom'
// ===================================================================== antd
import { Collapse } from 'antd'
import Position from './tp/position'
import MergeTable from './tp/merge-table'
// ===================================================================== global
const { $async } = window
// ===================================================================== style component
const Font  =  $async(()=>import('./tp/font'))
const Layout  =  $async(()=>import('./tp/layout'))
const Lock  =  $async(()=>import('./tp/lock'))
const Border  =  $async(()=>import('./tp/border'))
const Data  =  $async(()=>import('./tp/data'))
const Flex  =  $async(()=>import('./tp/flex'))
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
			<Collapse bordered={false} defaultActiveKey={['0','1','2','3','4','5']}>
				<Panel header='常规选项'>
					<Data _node={_node}/>
					<Lock _node={_node}/>
				</Panel>
				<Panel header='文本字体'><Font _node={_node}/></Panel>
				{ td && <Panel header='表格单元格'><MergeTable _node={_node}/></Panel> }
				{ !td && <Panel header='边框'><Border _node={_node}/></Panel> }
				<Panel header='页面布局'><Layout _node={_node}/></Panel>
				{ !td && <Panel header='位置 && 大小'><Position _node={_node}/></Panel> }
				{ _node.parent().style('display') === 'flex' && <Panel header='排版'><Flex _node={_node} /></Panel> }
			</Collapse>
		</div>
	)
}