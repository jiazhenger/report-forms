const Router = require('koa-router')
const send = require('koa-send')
const path = require('path')
const router = new Router()
const pdf = require('../core/puppeteer')
const fs = require('fs')

async function createSource({source,name}) {
	await fs.writeFile(path.join(__dirname, `../files/${name||'report'}.txt`), source, { 'flag': 'w' }, function(err) {
	    if (err) {
	        throw err;
	    }else{
			console.log('create txt success')
		}
	});
}
// 生成 pdf
router.post('/pdf',async ctx => {
	await pdf.make(ctx.request.body)
	await createSource(ctx.request.body)
	ctx.body = {
		code: 200,
		msg: 'ok',
		data:null
	}
})
// 下载 pdf
router.get('/downloadPdf', async ctx => {
	const src = `./api/files/${ctx.query.name||'report'}.pdf`
    ctx.attachment(src)
	ctx.body = {
		code: 200,
		msg: 'ok',
		data:null
	}
    await send(ctx, src)
})

module.exports = router