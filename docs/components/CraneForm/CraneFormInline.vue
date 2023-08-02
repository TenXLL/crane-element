<template>
  <CraneForm :schema="schema" mode="inline" @formSubmit="submit" />
</template>

<script setup lang="ts">
import { CraneSchema } from '../../../packages/components/CraneForm/types';
import CraneForm from '../../../packages/components/CraneForm/CraneForm.vue';

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
  }
};

function submit(e: any) {
  console.log(e);
}
</script>

<style scoped></style>
