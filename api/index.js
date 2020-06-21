const Koa = require('koa')

const app = new Koa()
const port = 3005

app.use( async ( ctx ) => {
	ctx.body = 'hello koa21232'
})

app.listen(port, ()=>{
	console.log('localhost:',3005)
})