import React from 'react'
// ===================================================================== component
export default ({ width, height }) => (
	<div id='paper' className='paper' style={{background:'#fff',fontSize:'13px',padding:'20px',minHeight:'500px',width:'810px',height:'1160px',margin:'0 auto',boxShadow:'0 0 8px #ccc'}}>
		<div id='axes' className='rel wh'>
			<section id='dragContent' className='drag abs_lt wh i10'>
				
			</section>
		</div>
	</div>
)