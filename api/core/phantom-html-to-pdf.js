const fs = require('fs')
const path = require('path')
const pdf = require('phantom-html-to-pdf')({ phantomPath: require('phantomjs-prebuilt').path })

// fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf'))

module.exports = {
	conversion(p,{header, main, footer, headerHeight, footerHeight}){
		pdf({
			header:header,
			html:main,
			footer:footer,
			paperSize:{
				
			}
		},(err,pdf)=>{
			pdf.stream.pipe(fs.createWriteStream(p))
		})
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

