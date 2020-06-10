import React from 'react'
// ===================================================================== page component
export default ({ label, children, onClick, suffix, isHalf }) => {
	const style = isHalf ? {width:'50%'} : {}
	return (
		<div className='ns-list fxm' style={{padding:'5px 0',...style}}>
			<h3 className='mr5 tr f12' style={{width:'40px'}}>{label}</h3>:
			<aside className='ml5 ex'>{children}</aside>
			{
				suffix && <div className='ml5'>{suffix}</div>
			}
		</div>
	)
}