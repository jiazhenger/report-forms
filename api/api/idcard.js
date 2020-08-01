const Router = require('koa-router')
const router = new Router()


router.post('/idcard',async ctx => {
	const body = ctx.request.body
	ctx.body = body
})

module.exports = router