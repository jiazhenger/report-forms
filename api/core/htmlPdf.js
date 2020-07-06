const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf')

// fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf'))

module.exports = {
	make({ header, main, footer, headerHeight, footerHeight }){
		let option = { 
			format: 'A4', 
			border: '10px',
		}
		if(header){
			option= {
				...option,
				header: {
					height:headerHeight,
				    contents: header
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
		pdf.create(main,option).toStream( (err, stream) => {
			const p = path.join(__dirname, '../pdf/report.pdf')
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
			
		})
	}
}

