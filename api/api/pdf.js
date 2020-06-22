const Router = require('koa-router')
const router = new Router()

router.post('/pdf',async ctx => {
	ctx.response.body = {
		a:0
	}
})

module.exports = router