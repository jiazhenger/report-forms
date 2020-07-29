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
			margin:'0 8px',
			left: 13,
			right:13
		}
		if(format === 'A5'){
			sol = {
				format,
				margin:'0 10px',
				left: 14,
				right:15
			}
		}
		
		const style = `
			*{margin:0;padding:0;box-sizing:border-box;zoom:1!important; transfrom:scale(1)!important;}
			body,.wraper{font:12px/20px Microsoft YaHei;color:#333;}
			img{border:0;display:block}
			table{border:0;width:100%;border-collapse:collapse;border-spacing:0;font-size:inherit}
			.fxmc{display:flex;align-items: center;justify-content: center}
			.wraper{width:100%;margin:${sol.margin};}
			th{text-align:inherit}
			.header,.footer { 
				transform: scale(0.75); 
			    transform-origin: top left;
			}
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
		const headerStyle = `<style>${style}</style>`
		const displayHeaderFooter = (header || footer ) ? true : false
		const top = headerHeight ? (headerHeight + headerHeight*0.2) : 0
		const bottom = footerHeight ? (footerHeight + footerHeight*0.37) : 15
		const headerTemplate = header ? `${headerStyle}<div class='wraper'>${header}</div>` : ''
		const footerTemplate = footer ? `${headerStyle}<div class='wraper' style='position:relative;top:${footerHeight*0.43}px'>${footer}</div>` : ''
		
		await page.pdf({
			format: sol.format,
			path,
			displayHeaderFooter,
			headerTemplate,
			footerTemplate,
			scale:0.99,								// 主体内容缩放
			printBackground: true,					// 打印导出背景图及背景色
			'-webkit-print-color-adjust': 'exact', //
			pageRanges:'', 		// 只导出第几页，第1页为封面页
			margin: { top, bottom, left:sol.left, right:sol.right},
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

