<script lang="tsx">
import { defineComponent, onMounted, ref, unref, reactive } from 'vue'
import NForm from '../nForm/index.vue'
import createFn from '../nComponent/createForm'
export default defineComponent({
  name: 'NFormDialog',
  components: {},
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const dialogRef = ref<any>()
    const { option } = reactive({ ...props })
    option.defaultSlot = () => {
      return <NForm ref={dialogRef} option={option.formOption} />
    }
    option.sureFn = () => {
      validForm().then((res) => {
        option
          .apiFn(res)
          .then(() => {
            option.visible = false
          })
          .finally(() => {
            option.btnLoading = false
          })
      })
    }
    const validForm = () => {
      return new Promise((resolve, reject) => {
        unref(dialogRef)
          ?.validForm()
          .then((res: object) => {
            resolve(res)
          })
          .catch((err: object) => {
            option.btnLoading = false
            reject(err)
          })
      })
    }
    const resetForm = () => {
      unref(dialogRef)?.resetForm()
    }
    const clearValidate = () => {
      unref(dialogRef)?.clearValidate()
    }
    const init = (data: any) => {
      option.visible = true
      option.btnLoading = false
      resetForm()
      const modelData = Object.assign({}, data)
      Object.keys(option.formOption.formModel).forEach((item) => {
        option.formOption.formModel[item] = modelData[item]
      })
    }
    ctx.expose({
      // 暴露组件方法
      option,
      init,
      resetForm,
      clearValidate,
      validForm
    })
    onMounted(() => {})
    // return {
    //   option,
    //   init,
    //   resetForm,
    //   clearValidate,
    //   validForm
    // }
  },
  render() {
    return <div class="n-form_dialog">{createFn.dialog(this.option)}</div>
  }
})
</script>
