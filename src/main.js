import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import VueMask from '@devindex/vue-mask'; 
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueMask);
app.use(router)

app.mount('#app')
