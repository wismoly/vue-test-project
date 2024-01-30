<template>
	<el-dialog v-model="state.dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" destroy-on-close :title="state.title" width="50%">
		<Form ref="formRef" :form-data="state.formData" :form-item="state.formItem" :rules="state.rules" @submitForm="submitForm" />
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="confirm">确定</el-button>
				<el-button @click="cancel">取消</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import { formRules } from '@/utils/config.js'

const state = reactive({
  dialogVisible: false,
  title: '',
  rules: {
    name: formRules('must'),
    phone: formRules('must'),
    userName: formRules('must'),
    password: formRules('must'),
    email: formRules('must'),
    roleId: formRules('must')
  },
  formData: {},
  formItem: [
    {
      label: '姓名',
      type: 'text',
      value: 'name',
      width: 12
    },
    {
      label: '联系电话',
      value: 'phone',
      type: 'text',
      width: 12
    },
    {
      label: '用户名',
      value: 'userName',
      type: 'text',
      width: 12
    },
    {
      label: '密码',
      value: 'password',
      type: 'text',
      width: 12
    },
    {
      label: '性别',
      value: 'sex',
      type: 'select',
      children: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ],
      width: 12
    },
    {
      label: '身份证号',
      value: 'idNo',
      type: 'text',
      width: 12
    },
    {
      label: '邮箱',
      value: 'email',
      type: 'text',
      width: 12
    },
    {
      label: '用户角色',
      value: 'roleId',
      type: 'select',
      children: [],
      width: 12
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑'
    state.formData = data
    console.log(state.formData)
  } else {
    state.title = '新增'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => formRef.value.submitForm()

// 提交数据
const submitForm = (data) => {
  console.log(data)
}
const cancel = () => {
  state.dialogVisible = false
}

defineEmits([''])
defineExpose({ open, edit })
</script>
