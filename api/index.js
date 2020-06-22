const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
// api
const pdf = require('./api/pdf')
const news = require('./api/news')
// declare
const app = new Koa()
// config
const port = 3005
// 跨域配置
app.use( async (ctx,next) => {
	ctx.set('Access-Control-Allow-Origin', '*')
	ctx.set('Content-type', 'application/json;charset=utf-8')
	ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
	await next( )
})
// 使用模板
app.use( 
	views( path.join(__dirname, './views'), { extension: 'ejs' } )
)
// 路由
app.use(pdf.routes()).use(pdf.allowedMethods())
app.use(news.routes()).use(news.allowedMethods())
// 服务
app.listen(port, ()=>{
	console.log('localhost:',3005)
})