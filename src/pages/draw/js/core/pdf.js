import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import html2canvas from 'html2canvas'

const fontPath = window.location.origin + '/assets/fonts/yahei.ttf'
const fonts = {
	Roboto: {
		normal: fontPath,
		bold: fontPath,
		italics: fontPath,
		bolditalics: fontPath
	}
}
pdfMake.fonts = fonts

export default {
	async create({header,content,footer}){
		await html2canvas(header).then( canvas =>{
			const image = canvas.toDataURL();
			this.pdf = pdfMake.createPdf({
				header:[
					{ image }
				],
				content,
				footer
			}).open()
		})
		return this.pdf
	},
	open({header,content,footer}){
		this.create({header,content,footer})
	}
}