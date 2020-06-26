const Router = require('koa-router')
const puppeteer = require('puppeteer')
const send = require('koa-send')
const path = require('path')
const router = new Router()
// 生成 pdf
async function create(pdf_string) {
	const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage', '--no-sandbox'] })
	const page = await browser.newPage()
	await page.setContent(pdf_string)
	// await page.addStyleTag({ path: path.join(__dirname, '../pdf/public.css') })
	await page.pdf({
		format: 'A4',
		// path: path.join(__dirname, '../pdf/'+ (new Date()).valueOf() + '.pdf'),
		path: path.join(__dirname, '../pdf/report.pdf'),
		margin:{ top:20, bottom:20, left:20, right:20 }
	});
	await browser.close();
}

router.post('/pdf',async ctx => {
	create(ctx.request.body.html)
	ctx.body = {
		code: 200,
		msg: 'ok',
		data:null
	}
})
// 下载 pdf
router.get('/downloadPdf', async ctx => {
	let src = './api/pdf/report.pdf'
    ctx.attachment(src)
	ctx.body = {
		code: 200,
		msg: 'ok',
		data:null
	}
    await send(ctx, src)
})

module.exports = router