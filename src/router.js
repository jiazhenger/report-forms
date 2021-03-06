/* ====================================== 模块子路由配置  ====================================== */
import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
// ===================================================================== 异步加载
import Import from '@com/bundle'
// ===================================================================== 同步路由
export default () => (
	<Switch>
		<Route path='/' component={ Import('index') } exact />
		<Route path='/preview' component={ Import('preview') } exact />
		{/* 重定向 */}
		<Route path='/' children={<Redirect to='/index' />} exact />
		{/* 404 */}
		{/*<Route component={ Import('404') } />*/}
	</Switch>
)
