const Router = require('koa-router')
const router = new Router()


router.get('/test',async ctx => {
	const body = ctx.request.body
	ctx.body = body
})

module.exports = router