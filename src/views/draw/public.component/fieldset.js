import React from 'react'
// ===================================================================== page component
export default ({ title, children, first }) => {
	const style = first ? {} : {borderTop:'1px solid #eee'}
	return (
		<fieldset style={style}>
			<legend style={{display:'block'}} className='f12 tc plr10 c0'>{title}</legend>
			{children}
		</fieldset>
	)
}