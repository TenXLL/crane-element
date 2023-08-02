import { App } from 'vue';
import components from './components/components';
// 所有组件
export * from './components/components';

// 完整引入组件
const install = (app: App) => {
  components.forEach((component) => {
    app.use(component as unknown as { install: () => any });
  });
};

export default {
  install
};
