import Aexes from './core/axes'
import DragFirst from './core/drag-first'
import DragAgain from './core/drag-again'
import Fast from './core/fast'
import DragScroll from './core/drag-scroll'
import Table from './public/table'

export default {
	init(_this){
		// 画坐标
		Aexes.init()
		DragFirst.init(_this)
		DragAgain.init(_this)
		Fast.init(_this)
		DragScroll.init(_this)
		Table.create()
	},
	DragStart(e, _this,type){
		DragFirst.DragStart(e, _this,type)
	},
	axes(){
		Aexes()
	}
}