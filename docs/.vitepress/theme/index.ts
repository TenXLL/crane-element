// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import ElementPlus from 'element-plus'
import CraneElement from '../../../packages/index'
import 'element-plus/dist/index.css';
import demo from 'vitepress-demoblock/demo.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
    app.use(CraneElement)
    app.component('demo', demo)
  }
}
