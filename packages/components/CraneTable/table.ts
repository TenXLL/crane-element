import { App } from 'vue';

import CraneTable from './CraneTable.vue';

CraneTable.install = (app: App) => {
  // 组件注册，按需引入
  app.component('CraneTable', CraneTable);
  return app;
};

export default CraneTable;
