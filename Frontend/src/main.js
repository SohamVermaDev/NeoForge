import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faHome, faUsers, faCubesStacked, faCartShopping, faChartPie, faGear } from '@fortawesome/free-solid-svg-icons' // insert only the needed icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 

library.add(faBars, faHome, faUsers, faCubesStacked, faCartShopping, faChartPie, faGear)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')