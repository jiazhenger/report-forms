const Router = require('koa-router')
const fs = require('fs')
const send = require('koa-send')
const path = require('path')
const router = new Router()
// 生成 pdf
async function create({html,name}) {
	await fs.writeFile(path.join(__dirname, `../pdf/${name||'report'}.html`), html, { 'flag': 'w' }, function(err) {
	    if (err) {
	        throw err;
	    }else{
			console.log('create html success')
		}
	});
}

router.post('/html',async ctx => {
	await create(ctx.request.body)
	ctx.body = {
		code: 200,
		msg: 'ok',
		data:null
	}
})
// 下载 pdf
router.get('/downloadHtml', async ctx => {
	const src = `./api/pdf/${ctx.query.name||'report'}.html`
    ctx.attachment(src)
    await send(ctx, src)
})

module.exports = router