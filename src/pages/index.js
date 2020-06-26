import React from 'react'
import Async from '@com/async'
// ===================================================================== public component
import Toast from '@cpx/toast'
import DataLoading from '@cpx/data-loading'
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
			<DataLoading />
		</>
	)
}