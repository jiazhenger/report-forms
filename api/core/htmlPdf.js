const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf')

// fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf'))

module.exports = {
	make(html){
		const option = {
			format: 'A4',
			header: {
			    contents: `<div style='text-align: center;'>Author: Marc Bachmann</div>`
			},
			footer: {
				contents: {
					default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>'
				}
			},
			'border': '10px'
		}
		pdf.create(html,option).toStream( (err, stream) => {
			stream.pipe( fs.createWriteStream(path.join(__dirname, '../pdf/report.pdf')) )
		})
	}
}

