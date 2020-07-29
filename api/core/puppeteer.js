const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

// fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf'))
module.exports = {
	async conversion(path,{header, main, footer, headerHeight, footerHeight, format}){
		console.log(format)
		const browser = await puppeteer.launch({ 
			headless:true, 				// true 关闭浏览器界面启动
			ignoreDefaultArgs: ['--disable-extensions'],
			args: [
				'--disable-dev-shm-usage', 	// 解决 Docker 中 /dev/shm 共享内存太小不足以支持 Chromium 运行的问题
				'--no-sandbox',				// 为了避免 Chromium 在 Linux 内核中由 sandbox 导致的启动问题
				'--disable-setuid-sandbox'
			]
		})
		const page = await browser.newPage()
		await page.setContent(main)
		// await page.addStyleTag({ path: path.join(__dirname, '../pdf/public.css') })
		let sol = {
			format: 'A4',
		}
		if(format === 'A5'){
			sol = {
				format
			}
		}
		
		const style = `
			*{margin:0;padding:0;box-sizing:border-box;}
			body{font:12px/20px Microsoft YaHei;color:#333;}
			img{border:0;display:block}
			table{border:0;width:100%;border-collapse:collapse;border-spacing:0;font-size:inherit}
			.fxmc{display:flex;align-items: center;justify-content: center}
			th,td{line-height:20px}
			th{text-align:inherit}
		`
		await page.addStyleTag({
			/*
			// 隐藏封面页眉页脚
			content:`
				@page:first {margin-top: 0} 
				body {margin-top: 100px }
			`*/
			// 规避封面因为margin：0 导致的后面 margin-bottom 失效
			content:style
		})
		
		await page.pdf({
			format: sol.format,
			path,
			printBackground: true,					// 打印导出背景图及背景色
			'-webkit-print-color-adjust': 'exact', //
			pageRanges:'', 		// 只导出第几页，第1页为封面页
			margin: 0,
			// preferCSSPageSize: true
		});
		await browser.close();
	},
	make(param){
		const p = path.join(__dirname, `../files/${param.name||'report'}.pdf`)
		fs.exists(p, exists => {
			if(exists){
				console.log('文件存在')
				fs.unlink(p,()=>{
					this.conversion(p,param)
				})
			}else{
				this.conversion(p,param)
			}
		})
	}
}

