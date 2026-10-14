import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Pede ao navegador para não descartar o localStorage (configurações) por falta de espaço.
navigator.storage
  ?.persisted()
  .then((persisted) => persisted || navigator.storage.persist())
  .catch(() => {})
