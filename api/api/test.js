const Router = require('koa-router')
const router = new Router()


router.post('/test',async ctx => {
	const body = ctx.request.body
	ctx.body = body
	
	console.log(body)
})

module.exports = router