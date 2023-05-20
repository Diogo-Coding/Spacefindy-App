import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'
// import { bulmaConfig } from '@oruga-ui/theme-bulma'

createApp(App)
  .use(store)
  .use(router)
  .use(Oruga)
  .mount('#app')
