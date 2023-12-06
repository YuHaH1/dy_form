<script setup lang="ts">
import { dynamicForm } from './components/DyForm/DyForm';
import { useDyFormConfig, UserForm } from './utils/constant'
const {DyForm} = dynamicForm()

const dyForm = ref(null)
const { dyFormConfig }  = useDyFormConfig(dyForm)
const form = ref<UserForm>({
    name: '',
    organization: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    personInfo:''
});

const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  delivery: [
    {
      required: true,
      message: 'Please select delivery',
      trigger: 'change',
    },
  ],
  organization: [
    {
      required: true,
      message: 'Please select organization',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
}

const formConfig = reactive({
  labelWidth: '130px',
  rules
})

</script>

<template>
    <DyForm ref="dyForm" v-model="form" :dyFormConfig="dyFormConfig" :formConfig="formConfig" />
</template>

<style scoped>
#app,
html,
body {
    width: 100vw;
    height: 100vh;
}

</style>
