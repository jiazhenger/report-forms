const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf')

// fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf'))

module.exports = {
	make({ header, main, footer }){
		const option = {
			format: 'A4',
			header: {
			    contents: header
			},
			footer: {
				contents: {
					// default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>'
					default: footer
				}
			},
			'border': '10px'
		}
		pdf.create(main,option).toStream( (err, stream) => {
			stream.pipe( fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf')) )
		})
	}
}

