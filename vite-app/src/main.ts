import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import globalRegister from './store/global-register'
import "./public-path.js"
import type { QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import { renderWithQiankun, qiankunWindow, } from 'vite-plugin-qiankun/dist/helper'


// console.log(globalRegister,'globalRegister')
let app: any;
interface Props {
	container?: HTMLElement | null;
	routerBase?: string; // 定义 routerBase，设置为可选属性
	parentActions?: any; // 如果需要，可以扩展为实际的类型
}


function render(props: Props) {
	console.log(props, 'props-----------')
	const { container, routerBase = '/app-vite' } = props
	app = createApp(App)
	app
		.use(router)
		.mount(container ? container.querySelector('#viteApp') : '#viteApp')
	app.config.globalProperties.parentActions = props.parentActions
	//app.use(store).mount(container ? container : '#child')
}

function qianKunControll() {
	renderWithQiankun({
		bootstrap() {
			console.log('888888888----')
		},
		mount(props) {
			// actions.actions.setGlobalState({
			//   parentActions: props
			// })
			console.log(props, 'props----123')

			console.log('[vue] props from main framework', props)
			// globalRegister(store, props)
			render(props)
		},
		unmount() {
			app.unmount()
			app = null
		},
		update: function (props: QiankunProps): void | Promise<void> {
			console.log('woshi chilid upadte----')
		}
	})
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? qianKunControll() : render({})
