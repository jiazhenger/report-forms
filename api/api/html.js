const Router = require('koa-router')
const fs = require('fs')
const send = require('koa-send')
const path = require('path')
const router = new Router()
// 生成 pdf
async function create(html) {
	await fs.writeFile(path.join(__dirname, '../pdf/report.html'), html, { 'flag': 'w' }, function(err) {
	    if (err) {
	        throw err;
	    }else{
			console.log('create html success')
		}
	});
}

router.post('/html',async ctx => {
	await create(ctx.request.body.html)
	ctx.body = {
		code: 200,
		msg: 'ok',
		data:null
	}
})
// 下载 pdf
router.get('/downloadHtml', async ctx => {
	let src = './api/pdf/report.pdf'
    ctx.attachment(src)
    await send(ctx, src)
})

module.exports = router