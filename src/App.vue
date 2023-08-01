<template>
  <CraneForm :schema="schema" mode="default" @formSubmit="submit" />
  <CraneTable
    :pages="data.pages"
    data="/api/v1.0/menu/menuList"
    :column="data.column"
  />
</template>

<script setup lang="ts">
import CraneForm from '../packages/components/CraneForm/CraneForm.vue';
import { CraneSchema } from '../packages/components/CraneForm/types.ts';
import CraneTable from '../packages/components/CraneTable/CraneTable.vue';
import { reactive } from 'vue';
import { TableColumn } from '../packages/components/CraneTable/types.ts';

const schema: CraneSchema = {
  properties: {
    phone: {
      type: 'string',
      title: '手机号',
      format: 'mobile'
    },
    password: {
      type: 'password',
      title: '密码'
    },
    email: {
      type: 'string',
      title: '邮箱',
      format: 'email'
    },
    name: {
      type: 'string',
      title: '姓名'
    }
  },
  required: ['phone']
};

const data = reactive({
  column: [
    {
      title: '序号',
      width: 120,
      type: 'index'
    },
    {
      title: '菜单名称',
      key: 'name',
      align: 'center'
    },
    {
      title: '路径',
      key: 'path'
    },
    {
      title: '排序',
      key: 'orderNumber'
    },
    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          click: (row: any) => {
            console.log(row);
          }
        },
        {
          text: '修改',
          type: 'primary',
          click: (row: any) => {
            console.log(row);
          }
        },
        {
          text: '删除',
          type: 'danger',
          confirm: '是否删除？',
          click: (row: any) => {
            console.log(row);
          }
        }
      ]
    }
  ] as TableColumn[],
  pages: { pageNum: 1, pageSize: 5 }
});

function submit(e: any) {
  console.log(e);
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
