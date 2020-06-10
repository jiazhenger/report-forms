import React from 'react'
import Async from '@com/async'
// ===================================================================== public component
import Toast from '@cpx/toast'
const ReportForms = Async(()=>import('@/ReportForms'))
// ===================================================================== antd

// ===================================================================== image

// ===================================================================== declare

// ===================================================================== component
export default () => {
	return (
		<>
			<ReportForms />
			<Toast />
		</>
	)
}