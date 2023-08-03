import { defineConfig } from 'vitepress'
import demo_block from 'vitepress-demoblock';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CraneElement",
  description: "一个基于ElementPlus的二次封装动态组件库",
  head:[
    ['link', { rel: 'icon', href: '../assets/crane.ico' }]
  ],
  themeConfig: {
    logo: '../assets/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '基础',
        items: [
          { text: '动态表单', link: '/components/CraneForm/CraneForm' },
          { text: '动态表格', link: '/components/CraneTable/CraneTable' }
        ]
      }
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present Ten.X",
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    // ...
    config: (md) => {
      md.use(demo_block)
    }
  }
})
