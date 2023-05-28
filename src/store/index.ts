import { createPinia } from 'pinia'
// eslint-disable-next-line import/no-extraneous-dependencies
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
