import React from 'react'
// ===================================================================== component
export default ({ width, height }) => (
	<div id='paper' className='paper' style={{background:'#fff',padding:'20px',width:width || '810px',height:height||'1160px',margin:'0 auto',boxShadow:'0 0 8px #ccc'}}>
		<div id='axes' className='rel wh'>
			<section id='dragContent' className='abs_lt wh i10'>
				
			</section>
		</div>
	</div>
)