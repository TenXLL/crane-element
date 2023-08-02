<template>
  <CraneTable
    :pages="data.pages"
    :data="data.tableData"
    :column="data.column"
  />
</template>

<script setup lang="ts">
import CraneTable from '../../../packages/components/CraneTable/CraneTable.vue';
import { reactive } from 'vue';
import { TableColumn } from '../../../packages/components/CraneTable/types';

const data = reactive({
  column: [
    {
      title: '序号',
      width: 80,
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
        }
      ]
    }
  ] as TableColumn[],
  pages: { pageNum: 1, pageSize: 5 },
  tableData: [
    {
      name: '张三',
      path: '/zhang-san',
      orderNumber: 1
    },
    {
      name: '李四',
      path: '/li-si',
      orderNumber: 2
    },
    {
      name: '李四',
      path: '/li-si',
      orderNumber: 2
    },
    {
      name: '李四',
      path: '/li-si',
      orderNumber: 2
    }
  ]
});
</script>

<style scoped></style>
