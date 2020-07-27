import _ from './jzer'
import Dom from './dom'
import { tableConfig } from '../../js/public/config'
// 绑定属性
const addAttr = ( el, { className, style, attr } ) => {
	// 添加 class
	if(className){ el.className += className }
	// 添加 style 样式 
	if(_.isObject(style)){ for(let i in style){ el.style[i] = style[i] } }
	// 添加属性
	if(_.isObject(attr)){ for(let i in attr){ el.setAttribute(i, attr[i]) } }
}
/*
const col = [
	{ field: 'name', title:'姓名', width:100, align:'center', style:{color:'red'}, render:(text,row)=> text, sort:true },
	{ field: 'age', title:'年龄', width:100, align:'left', style:{color:'blue'}, sort:true },
	{ field: 'phone', title:'电话', width:100, align:'right', render:(text,row)=> row.name + row.phone, style:{color:'green'}, sort:true }
]

const data = [
	{ name: '小明', age:'123', phone:'1584567894' },
	{ name: '小明', age:'123', phone:'1584567894' },
	{ name: '小明', age:'123', phone:'1584567894' },
]
*/

export default {
	create(option){
		const opt = {
			/*
			col:2,
			row:2,
			wraper:{ },
			colgroup:{ cols:[200, 300, 400] },
			thead:{
				tr:{
					style:{},
					attr:{},
					className:'',
				},
				th:{
					style:{padding:'2px 5px'},
					attr:{},
					className:'',
					text:''
				}
			},
			tbody:{
				tr:{
					style:{color:'red'},
					attr:{},
					className:'tbody',
				},
				td:{
					style:{padding:'2px 5px'},
					attr:{},
					className:'',
					text:''
				}
			},
			*/
			...option
		}
		
		const table = document.createElement('table')
		const fragment = document.createDocumentFragment()
		fragment.appendChild( this.createTbody({ col:opt.col, row:opt.row, ...opt.tbody}) )
		table.style.cssText = 'width:100%;border-collapse:collapse;border-spacing:0'
		
		if(opt.colgroup){  fragment.appendChild( this.createColgroup(opt.colgroup) ) }
		if(opt.thead){ fragment.appendChild( this.createThead({ col:opt.col, ...opt.thead}) )  }
		if(opt.tfoot){ fragment.appendChild( this.createTbody({ col:2, row:2, ...opt.tfoot},true) ) }
		
		table.appendChild(fragment)
		
		if(opt.wraper){  
			const wraper = document.createElement('div')
			addAttr( wraper,{ className:wraper.className, style: wraper.style, attr: wraper.attr } )
			wraper.appendChild(table)
			return wraper
		}else{
			return table
		}
	},
	// 创建 tbody
	createTbody(option, isFoot){
		const opt = {
			row:2,
			col:2,
			tr:{ },
			td:{ },
			...option
		}
		
		const tbody = document.createElement( isFoot ? 'tfoot' : 'tbody' )
		const trFragment = document.createDocumentFragment()
		
		if({ }.toString.call(opt.row) === '[object Array]' && { }.toString.call(opt.col) === '[object Array]'){
			opt.row.forEach(v => {
				const tr = document.createElement('tr')
				const tdFragment = document.createDocumentFragment()
				addAttr(tr,{className:opt.tr.className, style: opt.tr.style, attr: opt.tr.attr})
				opt.col.forEach(p => {
					const td = document.createElement('td')
					addAttr(td,{className:opt.td.className, style: opt.td.style, attr: opt.td.attr}) // 默认样式
					addAttr(td,{style: p.style}) // 数据上的样式
					
					if(p.align){ td.style.textAlign = p.align }
					
					if(p.render){
						td.innerHTML = p.render(v[p.field], v)
					}else{
						td.textContent = v[p.field]
					}
					tdFragment.appendChild(td)
				})
				tr.appendChild(tdFragment)
				trFragment.appendChild(tr)
			})
		}else{
			const row = opt.row || 0
			const col = opt.col || 0
			// 创建 tr
			for(let i=0; i< row; i++){
				const tr = document.createElement('tr')
				const tdFragment = document.createDocumentFragment()
				addAttr(tr,{className:opt.tr.className, style: opt.tr.style, attr: opt.tr.attr})
				// 创建 td
				for(let j=0; j<col; j++){
					const td = document.createElement('td')
					addAttr(td,{className:opt.td.className, style: opt.td.style, attr: opt.td.attr})
					// td 添加内容
					if(opt.td.text){ td.textContent = opt.td.text }
					
					tdFragment.appendChild(td)
				}
				tr.appendChild(tdFragment)
				trFragment.appendChild(tr)
			}
		}
		tbody.appendChild(trFragment)
		return tbody
	},
	// 创建 thead
	createThead(option){
		const opt = {
			col:2,
			tr:{ },
			th:{ },
			...option
		}
		
		const thead = document.createElement('thead')
		const tr = document.createElement('tr')
		const thFragment = document.createDocumentFragment()
		addAttr(tr,{className:opt.tr.className, style: opt.tr.style, attr: opt.tr.attr})
		if({ }.toString.call(opt.col) === '[object Array]'){
			opt.col.forEach(p => {
				const th = document.createElement('th')
				addAttr(th,{className:opt.th.className, style: opt.th.style, attr: opt.th.attr}) // 默认样式
				addAttr(th,{style: p.style}) // 数据上的样式
				
				if(p.align){ th.style.textAlign = p.align }
				
				th.textContent = p.title
				
				thFragment.appendChild(th)
			})
		}else{
			const col = opt.col || 0
			// 创建 tr
			for(let j=0; j<col; j++){
				const th = document.createElement('th')
				addAttr(th,{className:opt.th.className, style: opt.th.style, attr: opt.th.attr}) // 默认样式
				// th 添加内容
				if(opt.th.text){ th.textContent = opt.th.text }
				
				thFragment.appendChild(th)
			}
			tr.appendChild(thFragment)
		}
		tr.appendChild(thFragment)
		thead.appendChild(tr)
		return thead
	},
	// 创建 colgroup
	createColgroup(option){
		const opt = {
			cols:[],
			...option
		}
		const colgroup = document.createElement('colgroup')
		const colFragment = document.createDocumentFragment()
		opt.cols.forEach(v=>{
			const col = document.createElement('col')
			col.style.width = isNaN(+v) ? v : v + 'px'
			colFragment.appendChild(col)
		})
		colgroup.appendChild(colFragment)
		return colgroup
	},
	// 添加行
	addRow(_table,option){
		const opt = {
			last:true,
			tr:{ },
			td:{ },
			...option
		}
		const _tbody = _table.find('tbody')
		const trLen = _tbody.children().length()
		if(trLen > 0){
			const tdLen = _tbody.find('tr').children().length()
			const tr = document.createElement('tr')
			const tdFragment = document.createDocumentFragment()
			addAttr(tr,{className:opt.tr.className, style: opt.tr.style, attr: opt.tr.attr}) // 默认样式
			for(let j=0; j<tdLen; j++){
				const td = document.createElement('td')
				addAttr(td,{className:opt.td.className, style: opt.td.style, attr: opt.td.attr})
				if(opt.td.text){ td.textContent = opt.td.text } // td 添加内容
				tdFragment.appendChild(td)
			}
			tr.appendChild(tdFragment)
			if(opt.last){
				_tbody.append(tr)
			}
			return tr
		}else{
			return false
		}
	},
	// 添加列
	addCol(_table,option){
		const opt = {
			last:true,
			tbody:{
				tr:{ },
				td:{ },
			},
			thead:{
				tr:{ },
				td:{ },
			},
			...option
		}
		const _tbody = _table.find('tbody')
		const _trs = _tbody.children()
		const trLen = _trs.length()
		const tdLen = _tbody.find('tr').children().length()
		if(trLen > 0 && tdLen > 0){
			_trs.each(v=>{
				const td = document.createElement('td')
				addAttr(td,{className:opt.tbody.td.className, style: opt.tbody.td.style, attr: opt.tbody.td.attr})
				if(opt.tbody.td.text){ td.textContent = opt.tbody.td.text } // td 添加内容
				if(opt.last){ v.append(td) }
			})
			
			const _thead = _table.find('thead')
			if(_thead.el){
				const th = document.createElement('th')
				addAttr(th,{className:opt.thead.th.className, style: opt.thead.th.style, attr: opt.thead.th.attr})
				
				if(opt.last){
					_thead.find('tr').append(th)
				}
			}
		}
	},
	// 删除行
	delRow(_table){
		const _tbody = _table.find('tbody')
		const trLen =  _tbody.children().length()
		const tdLen = _tbody.find('tr').children().length()
		console.log(tdLen)
		if(trLen >1){
			_tbody.last().remove()
		}else{
			window.$fn.toast('无法删除')
		}
	},
	// 删除列
	delCol(_table){
		const _tbody = _table.find('tbody')
		const trLen = _tbody.children().length()
		const tdLen = _tbody.find('tr').children().length()
		if(trLen > 0 && tdLen > 1){
			_table.finds('tr').each(v=>{
				v.last().remove()
			})
		}else{
			window.$fn.toast('无法删除')
		}
	},
	// 设置边框颜色
	setBorderColor(_node, color){
		_node.finds('th').borderColor( color )
		_node.finds('td').borderColor( color )
		return this
	},
	// 设置下边框
	setBottomBorder(_table, borderStyle, color, checked){
		const style = {
			border: 0,
			borderBottom: '1px '+ borderStyle + ' ' + (color || '#ddd')
		}
		_table.finds('th').style(style)
		_table.finds('td').style(style)
		return this
	},
	// 设置表格边框
	showHideBorder(_table, checked, color){
		color = color || '#ddd'
		if(_table){
			if(checked){
				_table.finds('th').border('1px solid ' + color)
				_table.finds('td').border('1px solid ' + color)
			}else{
				_table.finds('th').border(0)
				_table.finds('td').border(0)
			}
		}
	},
	// 绑定列数据
	bindData(_td, _drag, data, name, url, isContent){
		const row = isContent ? data.length : 1
		const index = _td.index()
		const _tbody = _td.parent('tbody')
		const trLen = _tbody.children().length()
		const col = _tbody.find('tr').children().length()
		
		if(row !== trLen){
			const tbody = this.createTbody({
				row,
				col,
				td:{
					style:tableConfig.style,
					className:'loopNode x-bind-table',
					attr:{ type:'text' }
				}
			})
			_tbody.html(tbody.innerHTML)
		}
		if(isContent){
			if(row.lenth > 5){
				_drag.height(20 * 5)
			}else{
				_drag.removeStyle('height')
			}
			data.forEach((v,i) => {
				_tbody.children(i).children(index).text(v[name])
				_tbody.children(i).children(index).attr({url})
			})
		}else{
			_drag.removeStyle('height')
			_tbody.find('tr').children(index).html(Dom.bindField(name))
			_tbody.find('tr').children(index).attr({url})
		}
	},
	// 切换数据
	changeData(_td, _drag, data, name, url, isContent){
		const index = _td.index()
		const _tbody = _td.parent('tbody')
		
		if(isContent){
			_drag.height(20 * 5)
			data.forEach((v,i) => {
				_tbody.children(i).children(index).text(v[name])
				_tbody.children(i).children(index).attr({url})
			})
		}else{
			_drag.removeStyle('height')
			_tbody.find('tr').children(index).html(Dom.bindField(name))
			_tbody.find('tr').children(index).attr({url})
		}
	},
	// 重置数据绑定
	resetData(td){
		const index = td.index()
		const _tbody = td.parent('tbody')
		_tbody.finds('tr').each(v=>{
			v.children(index).html('')
		})
	},
	// 合并行
	mergeRow(_table){
		let rowspan = 0
		_table.finds('.tableSpan').each(v=>{
			let span = v.attr('rowspan')
			if(span){
				rowspan += +span
			}else{
				rowspan += 1
			}
		})
		
		_table.finds('.tableSpan').each((v,i)=>{
			if(i === 0){
				v.attr('rowspan', rowspan)
			}else{
				v.remove()
			}
			v.removeClass('tableSpan')
		})
	},
	// 合并列
	mergeCol(_table){
		const _tr = _table.finds('tr')
		_tr.each( _trv => {
			let colspan = 0
			_trv.finds('.tableSpan').each(v=>{
				let span = v.attr('colspan')
				if(span){
					colspan += +span
				}else{
					colspan += 1
				}
			})
		
			_trv.finds('.tableSpan').each((v,i)=>{
				if(i === 0){
					v.attr('colspan', colspan)
				}else{
					v.remove()
				}
				v.removeClass('tableSpan')
			})
		})
	},
}