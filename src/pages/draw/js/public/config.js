module.exports =  {
	// 组件配置
	differ: 10,			// 鼠标在组件拖动时的起点位置
	// axes 配置
	axesColor: '#eee',
	axesActiveColor: '#000',
	axesSpace: 10,
	// 拖动滚动
	scrollSpace:10,
	// 条形码
	barcode:{
		lineColor:'black',
		width:5,
		height:100,
		fontSize:32,
		displayValue:true
	},
	// 二维码
	qrcode:{
		type: 'image/png',
		colorDark:'#000', // 前景色
		colorLight:'#fff', // 背景色
		errorCorrectionLevel:'H',
		// version: 2,
		margin:1
	},
	tableConfig:{
		style:{ padding:'2px 5px', height:'20px', boxSizing:'content-box', border:'1px solid #ddd'}
	},
	paperParam: {
		format: 'A4',
		width:'810px',
		height:'1160px',
		name:'报表'
	}
}