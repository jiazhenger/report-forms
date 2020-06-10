import React from 'react'
// ===================================================================== template
import List from './list'
// ===================================================================== data

// ===================================================================== page component
export default ( ) => {
	return (
		<>
			<div className='fx'>
				<List.Input label='左' isHalf />
				<List.Input label='上' isHalf />
			</div>
			<div className='fx'>
				<List.Input label='宽' isHalf />
				<List.Input label='高' isHalf />
			</div>
		</>
	)
}