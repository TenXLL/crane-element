# Crane-Element 🏗️

Crane-Element 是一个基于 Vue 3、Vite、TypeScript 和 Element Plus 的二次封装项目。它提供了动态表单、动态表格、命令式弹窗和命令式抽屉（drawer）等功能，并为这些功能提供了各类动画效果。

## 功能特点

- 💡 提供动态表单功能，让表单创建更加灵活和便捷。
- 📊 提供动态表格功能，使表格的展示和操作更加动态化。
- 📢 提供命令式弹窗和命令式抽屉功能，方便进行信息提示和展示。
- 🎨 提供各类动画效果，为用户界面带来更好的体验。

## 安装

1. 确保已安装 Vue 3 和 Vite。
2. 克隆项目并进入项目目录。
3. 运行 `npm install` 命令安装依赖。
4. 运行 `npm run dev` 命令启动开发服务器。
5. 在浏览器中打开 `http://localhost:3000`，即可查看项目效果。

## 使用方法

```vue
<template>
  <div>
    <!-- 动态表单 -->
    <ce-form :schema="formSchema" @submit="handleSubmit" />

    <!-- 动态表格 -->
    <ce-table :data="tableData" />

    <!-- 命令式弹窗 -->
    <ce-button @click="showDialog">打开弹窗</ce-button>

    <!-- 命令式抽屉 -->
    <ce-drawer :visible="showDrawer" @close="closeDrawer">
      <h2>抽屉内容</h2>
      <p>这是一个命令式抽屉的示例。</p>
    </ce-drawer>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { FormSchema, TableData } from 'crane-element';

export default defineComponent({
  setup() {
    const formSchema: FormSchema = {
      // 表单的配置项
    };

    const tableData: TableData[] = [
      // 表格数据
    ];

    const showDrawer = ref(false);

    const handleSubmit = () => {
      // 处理表单提交逻辑
    };

    const showDialog = () => {
      // 打开弹窗逻辑
    };

    const closeDrawer = () => {
      // 关闭抽屉逻辑
    };

    return {
      formSchema,
      tableData,
      showDrawer,
      handleSubmit,
      showDialog,
      closeDrawer,
    };
  },
});
</script>
```