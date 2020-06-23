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
// await page.addStyleTag({ path: 'views/index.css' })
	await page.pdf({
		format: 'A4',
		path: path.join(__dirname, '../pdf/'+ (new Date()).valueOf() + '.pdf'),
		margin:{ top:20, bottom:20, left:20, right:20 }
	});
	await browser.close();
}

router.get('/pdf',async ctx => {
	await ctx.render(
		'index',
		{ title: '1132'}
	)
	create(ctx.body)
})
// 下载 pdf
router.get('/download', async ctx => {
	let src = './api/pdf/1592876131051.pdf'
    ctx.attachment(src)
    await send(ctx, src)
})

module.exports = router