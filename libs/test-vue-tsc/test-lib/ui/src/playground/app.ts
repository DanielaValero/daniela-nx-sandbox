import { createApp } from 'vue';
import App from './App.vue';

export function initPlayground() {
  const app = createApp(App);
  app.mount('#app');
}
