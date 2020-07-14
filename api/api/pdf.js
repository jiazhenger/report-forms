const Router = require('koa-router')
const send = require('koa-send')
const path = require('path')
const router = new Router()
const pdf = require('../core/puppeteer')
// 生成 pdf

router.post('/pdf',async ctx => {
	await pdf.make(ctx.request.body)
	ctx.body = {
		code: 200,
		msg: 'ok',
		data:null
	}
})
// 下载 pdf
router.get('/downloadPdf', async ctx => {
	const src = `./api/pdf/${ctx.query.name||'report'}.pdf`
    ctx.attachment(src)
	ctx.body = {
		code: 200,
		msg: 'ok',
		data:null
	}
    await send(ctx, src)
})

module.exports = router