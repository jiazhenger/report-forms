const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

// fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf'))

module.exports = {
	async conversion(path,{header, main, footer, headerHeight, footerHeight}){
		const browser = await puppeteer.launch({ headless:true, args: ['--disable-dev-shm-usage', '--no-sandbox'] })
		const page = await browser.newPage()
		await page.setContent(main)
		// await page.addStyleTag({ path: path.join(__dirname, '../pdf/public.css') })
		await page.addStyleTag({
			/*
			// 隐藏封面页眉页脚
			content:`
				@page:first {margin-top: 0} 
				body {margin-top: 100px }
			`*/
			// 规避封面因为margin：0 导致的后面 margin-bottom 失效
			content: `
				*{margin:0;padding:0;box-sizing:border-box}
				body{font:12px/20px Microsoft YaHei;color:#333;}
				img{border:0;display:block}
				table{border:0,width:100%;border-collapse:collapse;border-spacing:0;}
				.fxmc{display:flex;align-items: center;justify-content: center}
			`
		})
		const displayHeaderFooter = (header || footer ) ? true : false
		const top = headerHeight ? (headerHeight + headerHeight*0.43) : 20
		const bottom = footerHeight ? footerHeight + footerHeight*0.43 : 20
		const headerTemplate = header ? `<div style='width:100%;padding:0 10px;font:10px/20px Microsoft YaHei;'>${header}</div>` : ''
		const footerTemplate = footer ? `<div style='width:100%;padding:0 10px;font:10px/20px Microsoft YaHei;position:relative;z-index:100'>${footer}</div>` : ''
		
		await page.pdf({
			format: 'A4',
			path,
			displayHeaderFooter,
			headerTemplate,
			footerTemplate,
			printBackground: true,					// 打印导出背景图及背景色
			// scale:1,								// 主体内容缩放
			'-webkit-print-color-adjust': 'exact', //
			pageRanges:'', 		// 只导出第几页，第1页为封面页
			margin: { top, bottom, left:10, right:10 }
		});
		await browser.close();
	},
	make(param){
		const p = path.join(__dirname, '../pdf/report.pdf')
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

