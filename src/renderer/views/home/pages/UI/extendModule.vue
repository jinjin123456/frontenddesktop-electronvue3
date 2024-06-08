<script lang="tsx">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import createFn from '@renderer/components/common/nComponent/createForm'
import NFormDialog from '@renderer/components/common/nFormDialog/index.vue'
import { ElMessage, FormRules } from 'element-plus'
import BUS from '@renderer/utils/bus'
const {
  electron: { ipcRenderer }
} = window

export default defineComponent({
  name: 'ExtendModule',
  components: {
    NFormDialog
  },
  setup() {
    const saveForm = (data: any) => {
      console.log('saveForm', data)
      return new Promise((resolve) => {
        // 这里就可以放置接口请求的逻辑
        ElMessage({ type: 'success', message: '成功操作' })
        resolve('1')
      })
    }
    const nformDialogRef = ref()
    const dialogOpt = reactive({
      visible: false,
      title: '表单弹窗',
      apiFn: saveForm,
      // 这里其实就是NForm的option配置
      formOption: {
        formProps: {
          labelWidth: '80px'
        },
        formList: [
          {
            componentType: 'input',
            bind: 'roles',
            prop: 'roles',
            clearable: true,
            label: '名称'
          }
        ],
        formModel: {
          roles: ''
        },
        rules: {
          roles: [{ required: true, message: '请输入设备码', trigger: 'blur' }]
        } as FormRules
      }
    })
    const showFormDialog = () => {
      const { formOption } = dialogOpt
      const { formModel } = formOption
      nformDialogRef.value.init(formModel)
    }
    const btnClick = (type: string, data: any) => {
      console.log(type, data)
      switch (type) {
        case 'showFormDialog':
          BUS.emit('test', [1, 2, 3, 4, 5])
          showFormDialog()
          break
        default:
          break
      }
    }
    const buttonOption = reactive({
      componentType: 'button',
      type: 'primary',
      label: '按钮',
      func: 'showFormDialog'
    })
    const handleOpenFile = async () => {
      const filePath = await ipcRenderer.invoke('dialog:openFile')
      ElMessage.info(filePath)
    }
    onMounted(() => {})
    return () => (
      <div>
        <div>表单弹窗：{createFn.button(buttonOption, btnClick)}</div>
        <NFormDialog ref={nformDialogRef} option={dialogOpt} />
        <el-button onClick={handleOpenFile}>点开文件选择框</el-button>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped></style>
