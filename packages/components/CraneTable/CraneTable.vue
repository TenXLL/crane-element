<template>
  <el-table :data="param.data" border stripe style="width: 100%">
    <template v-for="(item, index) in param.columns" :key="index">
      <el-table-column
        :type="item.type"
        :prop="item.key"
        :label="item.title"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="item.buttons">
            <template v-for="(it, i) in item.buttons" :key="i">
              <el-button
                v-if="!it.confirm"
                :type="it.type"
                size="small"
                @click="it.click(scope.row)"
              >
                {{ it.text }}
              </el-button>
              <el-popconfirm
                v-if="it.confirm"
                width="220"
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon-color="#626AEF"
                :title="it.confirm"
                @confirm="it.click(scope.row)"
              >
                <template #reference>
                  <el-button :type="it.type" size="small">
                    {{ it.text }}
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { CraneData, Pages, TableColumn } from './types';
import { reactive, onMounted } from 'vue';

import { ElButton, ElPopconfirm } from 'element-plus';

async function getService() {
  try {
    const module = await import('@/CraneTable');
    return module.default;
  } catch (error) {
    console.error('Failed to import CraneTable module:', error);
    // 进行容错处理，例如使用默认值或者给出错误提示
    return null;
  }
}

const param = reactive({
  data: [] as CraneData[],
  columns: [] as any[],
  pages: { pageNum: 1, pageSize: 5, total: 0 } as Pages,
  showPage: false
});

const props = defineProps<{
  data: string | CraneData[];
  column: TableColumn[];
  pages: Pages;
}>();

onMounted(() => {
  prepareData();
  prepareColumns();
  preparePage();
});

const prepareData = () => {
  if (typeof props.data === 'string') {
    // 在其他地方调用异步函数获取模块
    getService().then((service) => {
      // 在这里可以使用获取到的模块
      if (!service) {
        return;
      }
      service.post(<string>props.data, props.pages).then((res) => {
        if (res.data.records) {
          param.data = res.data.records;
          param.pages.total = res.data.total;
          param.showPage = true;
        } else {
          param.data = res.data;
        }
      });
    });
  } else {
    param.data = props.data;
  }
};

const prepareColumns = () => {
  const columns = props.column;
  const prepare = [] as any[];
  columns.forEach((item) => {
    if (item.buttons) {
      const itemData = {
        title: item.title,
        key: item.title,
        buttons: item.buttons
      };
      prepare.push(itemData);
    } else {
      prepare.push(item);
    }
  });

  param.columns = prepare;
};

function preparePage() {
  param.pages = props.pages;
}
</script>

<style scoped></style>
