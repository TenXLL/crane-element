import { createApp } from 'vue';
import './style.css';
import ElementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';

import Crane from '../packages/index.ts';

const app = createApp(App);
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(ElementPlus);
app.use(Crane);
app.mount('#app');
