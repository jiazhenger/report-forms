const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf')

// fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf'))

module.exports = {
	make({ header, main, footer, headerHeight, footerHeight }){
		let option = {
			format: 'A4', 
			border: {
				top: '0',
				bottom:'0',
				right:'10px',
				left:'10px'
			},
			// base: `http://127.0.0.1:3005`,
			// type: 'pdf',
			// orientation: 'landscape'
		}
		if(header){
			option= {
				...option,
				header: {
					height:'200px',
				    contents: {
						default: `<div>{{page}}/{{pages}} 页</div><div>123</div><div>123</div>`
					}
				}
			}
		}
		if(footer){
			option = {
				...option,
				footer: {
					height:footerHeight,
					contents: footer
				}
			}
		}
		const p = path.join(__dirname, '../pdf/report.pdf')
		
		fs.exists(p, exists => {
			if(exists){
				console.log('文件存在')
				fs.unlink(p,()=>{
					pdf.create(main,option).toFile(p,(err,res)=>{ })
				})
			}else{
				pdf.create(main,option).toFile(p,(err,res)=>{ })
			}
		})
		
		/*
		pdf.create(main,option).toStream( (err, stream) => {
			
			fs.exists(p, exists => {
				if(exists){
					console.log('文件存在')
					fs.unlink(p,()=>{
						stream.pipe( fs.createWriteStream(p) )
					})
				}else{
					stream.pipe( fs.createWriteStream(p) )
				}
			})
			
		})*/
	}
}

