import React from 'react'
// ===================================================================== public component
import Content from './cpt/content'
// ===================================================================== antd
import { SlackOutlined } from '@ant-design/icons'
// ===================================================================== image
import QuitImage from '@img/icon/quit.png'
import TableImage from '@img/icon/table.png'
import ImgImage from '@img/icon/img.png'
import TextImage from '@img/icon/text.png'
// ===================================================================== declare
// ===================================================================== template
const IconButton = ({ icon, label}) => (
	<li className='tap cp h fxmc' style={{width:'50px'}}>
		<div>
			<div className='fxc f15'><img style={{width:'18px',height:'18px'}} src={icon} alt=''/></div>
			<h3 className='f12 tc'>{label}</h3>
		</div>
	</li>
)
const IconButton2 = ({ icon, label, isR, onDragStart, onDrop, onDragOver }) => (
	<li className='tap cp ptb10 bor1 r5px' draggable={true} onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver} style={{width:'46%',margin:'0 2% 10px',background:'#f9f9f9'}}>
		<div className='fxmc f15'><img draggable={false} style={{width:'25px',height:'25px'}} src={icon} alt=''/></div>
		<h3 className='tc mt5 f12'>{label}</h3>
	</li>
)
// ===================================================================== component
export default class extends React.Component {	
	componentDidMount(){
		
	}
	onDragStart(e){
		e.dataTransfer.setData('data', 'text');
	}
	onDrop(e){
		var data = e.dataTransfer.getData('data')					// 获取发送的数据
		e.target.appendChild(document.getElementById(data))			// 将获取的数据添加到这本元素里
		e.preventDefault()
	}
	onDragOver(e){
		e.preventDefault()
	}
	render( ) {
		return (
			<div className='wh fv'>
				{/* header */}
				<header className='fxm plr10 bcf bbor1' style={{height:'50px'}}>
					<SlackOutlined className='c0 f30' />
					<h5 className='f16 b ml5 c0'>报表编辑器</h5>
					<div className='ex h'>
						<ul className='fxmc h'>
							<IconButton icon={QuitImage} label='退出' />
						</ul>
					</div>
				</header>
				<section className='ex fx'>
					{/*  左侧操作 */}
					<nav className='bcf rel' style={{width:'200px'}}>
						<div className='abs_full scroll'>
							<ul className='fxw plr10 pt10'>
								<IconButton2 icon={TextImage} label='文本' onDragStart={this.onDragStart}/>
								<IconButton2 icon={ImgImage} label='图片' />
								<IconButton2 icon={TableImage} label='表格' />
							</ul>
						</div>
					</nav>
					{/*  中心展示 */}
					<section className='ex rel'>
						<div className='abs_full scroll' style={{padding:'15px'}}>
							<Content onDrop={this.onDrop}  onDragOver={this.onDragOver}/>
						</div>
					</section>
					{/*  控制面版 */}
					<div className='fv bcf' style={{width:'300px'}}>
						<header className='h40 bbor1 plr10 fx'>
							<span className='cp'>样式</span>
						</header>
						<div className='ex  plr10'>
							
						</div>
					</div>
				</section>
				
				{/* template */}
				<div className='vh'>
					<div className='abs red h40' id='text'>45646</div>
				</div>
			</div>
		)
	}
}