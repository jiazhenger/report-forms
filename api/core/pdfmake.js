const fs = require('fs')
const path = require('path')
// const pdfMake = require('pdfmake/build/pdfmake')
// const pdfFonts = require('pdfmake/build/vfs_fonts')

const fontPath = path.join(__dirname, '../core/fonts/yahei.ttf')
const fonts = {
	Roboto: {
		normal: fontPath,
		bold: fontPath,
		italics: fontPath,
		bolditalics: fontPath
	}
}

const PdfPrinter = require('pdfmake/src/printer');
const printer = new PdfPrinter(fonts);

module.exports = {
	make(){
		var dd = {
			info: {
			title: 'awesome Document',
			author: 'j+2',
			subject: 'subject of document',
			keywords: 'keywords for document',
		  },
			background: function(currentPage, pageSize) {
				
			},
			header:(currentPage, pageCount, pageSize)=>{
				return [
					'header',
					`${currentPage}/${pageCount}`
				]
			},
		    content: [
		        {
					text:'选科分析',
					margin:0
				}
		    ],
			footer:[
				
			],
			styles:{
				header:{ fontSize:16 },
				content:{ padding:0 }
			}
		}
		
		var pdfDoc = printer.createPdfKitDocument(dd);
		pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf'))).on('finish',function(){
		   console.log('456')
		})
		
		pdfDoc.end();
	}
}