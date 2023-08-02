<template>
  <el-form
    ref="ruleFormRef"
    :model="data.formData"
    :inline="mode !== 'default'"
    :label-width="labelWidth"
    :rules="data.rules"
  >
    <template v-for="(property, key) in schema.properties" :key="key">
      <el-form-item :label="property.title" :prop="key.toString()">
        <template v-if="property.ui?.widget === 'select' && property.enum">
          <el-select
            v-model="data.formData[key]"
            class="m-2"
            :placeholder="property.ui?.placeholder"
          >
            <el-option
              v-for="item in property.enum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template
          v-if="property.type === 'boolean' && property.ui?.widget === 'switch'"
        >
          <el-switch v-model="data.formData[key]" />
        </template>
        <template
          v-else-if="property.ui?.widget === 'select' && property.ui.asyncData"
        >
          <el-select
            v-model="data.formData[key]"
            class="m-2"
            :placeholder="property.ui?.placeholder"
          >
            <el-option
              v-for="item in data.options[key]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template v-else-if="property.ui?.widget === 'date-time'">
          <el-date-picker
            v-model="data.formData[key]"
            type="datetime"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template v-else-if="property.ui?.widget === 'textarea'">
          <el-input
            v-model="data.formData[key]"
            :maxlength="property.ui?.maxCount"
            :placeholder="property.ui?.placeholder"
            show-word-limit
            type="textarea"
          />
        </template>
        <template
          v-else-if="property.type === 'string' && !property.ui?.widget"
        >
          <el-input
            v-model="data.formData[key]"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template
          v-else-if="property.type === 'number' && !property.ui?.widget"
        >
          <el-input-number
            v-model="data.formData[key]"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template
          v-else-if="property.type === 'password' && !property.ui?.widget"
        >
          <el-input
            v-model="data.formData[key]"
            type="password"
            :placeholder="property.ui?.placeholder"
          />
        </template>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="handleValidateButtonClick">
        提交
      </el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount, PropType, reactive, ref } from 'vue';
import { CraneSchema, Mode, RuleItem, SpecialFormat } from './types';
import { FormInstance } from 'element-plus';

defineExpose({
  formData: getData
});

const ruleFormRef = ref<FormInstance>();

const emits = defineEmits(['formSubmit']);

const data = reactive({
  formData: {} as any,
  options: {} as Record<string, any>,
  rules: {} as { [key: string]: any }
});

const props = defineProps({
  mode: {
    type: String as PropType<Mode>,
    default: 'default'
  },
  schema: {
    type: Object as PropType<CraneSchema>,
    required: true
  },
  enableButton: {
    type: Boolean,
    default: true
  },
  labelWidth: {
    type: String,
    default: '80px'
  }
});

onBeforeMount(() => {
  getPropertyOptions();
  nextTick(() => {
    setRules();
  }).then(() => {
    setTimeout(() => {
      reset();
    }, 0);
  });
});

/**
 * 异步数据处理函数
 */
const getPropertyOptions = () => {
  for (const key in props.schema?.properties) {
    if (props.schema?.properties[key].ui) {
      const asyncData = props.schema?.properties[key].ui?.asyncData;
      if (asyncData) {
        asyncData
          .then((res) => {
            data.options[key] = res;
          })
          .catch((error) => {
            console.error(error); // 处理异步请求失败的情况
          });
      }
    }
  }
};

const setRules = async (): Promise<any> => {
  const required = props.schema?.required;
  const properties = props.schema?.properties;

  for (const key in props.schema?.properties) {
    // 首先挑选出特定的几个校验项设置校验规则
    if (props.schema?.properties[key]?.format) {
      await getSpecificVerificationMap(
        props.schema?.properties[key]?.format as SpecialFormat,
        key
      );
    }
    // 正则设置
    if (props.schema?.properties[key]?.pattern) {
      await setPattern(props.schema?.properties[key]?.pattern as RegExp, key);
    }
    // 其他条件设置
    if (props.schema?.properties[key]?.otherRules) {
      await setOtherRules(
        props.schema?.properties[key]?.otherRules as RuleItem[],
        key
      );
    }
  }

  required?.forEach((item) => {
    if (!props.schema?.properties[item]) {
      return;
    }
    if (!data.rules[item]) {
      if (properties) {
        data.rules[item] = [
          {
            required: true,
            message: `请输入${properties[item].title}`,
            trigger: 'blur'
          }
        ];
      }
    } else if (properties) {
      data.rules[item].push({
        required: true,
        message: `请输入${properties[item].title}`,
        trigger: 'blur'
      });
    }
  });
};

/**
 * 针对特定的几个参数校验
 * @param param
 * @param key
 * @param result
 */
async function getSpecificVerificationMap(param: SpecialFormat, key: string) {
  if (!data.rules[key]) {
    data.rules[key] = [];
  }
  if (param === 'mobile') {
    const rule = {
      validator: (_: any, value: any, callback: any) => {
        const regExp = /^1[3456789]\d{9}$/;
        if (!value) {
          callback(new Error('请输入手机号'));
        }
        if (!regExp.test(value)) {
          callback(new Error('手机号格式不正确'));
        }
        callback();
      },
      trigger: 'change'
    };
    data.rules[key].push(rule);
  }
  if (param === 'email') {
    const rule = {
      validator: (_: any, value: any, callback: any) => {
        const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          callback(new Error('请输入邮箱'));
        }
        if (!regExp.test(value)) {
          callback(new Error('邮箱格式不正确'));
        }
        callback();
      },
      trigger: 'change'
    };
    data.rules[key].push(rule);
  }
}

/**
 * 针对正则设置校验
 * @param pattern
 * @param key
 * @param result
 */
async function setPattern(pattern: RegExp, key: string) {
  if (!data.rules[key]) {
    data.rules[key] = [];
  }
  const rule = {
    validator: (_: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error('请输入内容'));
      }
      if (!pattern.test(value)) {
        callback(new Error('格式不正确'));
      }
      callback();
    },
    trigger: 'change'
  };
  data.rules[key].push(rule);
}

/**
 * 设置其他表单
 * @param otherRules
 * @param key
 */
async function setOtherRules(otherRules: RuleItem[], key: string) {
  if (!data.rules[key]) {
    data.rules[key] = [];
  }
  data.rules[key].push(...otherRules);
}

/**
 * 获取表单数据
 */
function getData() {
  const keys = Object.keys(data.formData);
  const form: { [key: string]: any } = {};
  // 遍历每个属性，获取对应的值
  keys.forEach((key) => {
    form[key] = data.formData[key];
  });
  return form;
}

/**
 * 提交
 * @param e
 */
function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();

  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      const keys = Object.keys(data.formData);
      const form: { [key: string]: any } = {};
      keys.forEach((key) => {
        form[key] = data.formData[key];
      });
      emits('formSubmit', form);
    }
  });
}

/**
 * 重置
 */
function reset() {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
}
</script>

<style scoped></style>
