import React from 'react'
import Async from '@com/async'
// ===================================================================== public component
import Toast from '@cpx/toast'
import DataLoading from '@cpx/data-loading'
const Draw = Async(()=>import('@pages/draw'))
// ===================================================================== antd

// ===================================================================== image

// ===================================================================== declare

// ===================================================================== component
export default () => {
	return (
		<>
			<Draw />
			<Toast />
			<DataLoading />
		</>
	)
}