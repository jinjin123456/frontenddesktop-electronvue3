<script lang="tsx">
import { defineComponent, /*onBeforeMount, onMounted,*/ ref, unref } from 'vue'
import createFn from '@renderer/components/common/nComponent/createForm'
import { formItem } from '@/types'
import type { FormInstance } from 'element-plus'
export default defineComponent({
  name: 'NForm',
  components: {},
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const formRef = ref<FormInstance>()
    const { option } = {
      ...props
    }
    const validForm = () => {
      return new Promise((resolve, reject) => {
        console.log('option.formModel', option.formModel)
        if (!unref(formRef)) return
        unref(formRef)?.validate((valid, fields) => {
          if (valid) {
            resolve(option.formModel)
          } else {
            console.log('error submit!', fields)
            reject(fields)
          }
        })
      })
    }
    const resetForm = () => {
      return new Promise<void>((resolve) => {
        unref(formRef)?.resetFields()
        resolve()
      })
    }
    const clearValidate = () => {
      return new Promise<void>((resolve) => {
        unref(formRef)?.clearValidate()
        resolve()
      })
    }
    // onMounted(() => {
    // })
    // onBeforeMount(() => {
    // })
    const renderIntro = () => {
      return (
        <div class="n-form">
          <el-form
            ref={formRef}
            model={option.formModel}
            rules={option.rules}
            label-width="120px"
            {...option.formProps}
          >
            <el-row gutter={option.formProps?.gutter}>
              {option.formList?.map((item: formItem) => {
                const nodeProps = Object.assign({}, item)
                delete nodeProps.componentType
                delete nodeProps.span
                delete nodeProps.render
                return (
                  <el-col span={item.span || 24} class={item.hidden ? 'hide' : ''}>
                    <el-form-item
                      {...nodeProps}
                      v-slots={{
                        label: item.labelSlot ? item.labelSlot?.() : () => item.label
                      }}
                    >
                      {createFn[item.componentType]
                        ? createFn[item.componentType](item, option.formModel)
                        : item.render?.()}
                    </el-form-item>
                  </el-col>
                )
              })}
            </el-row>
          </el-form>
          {option.showBtn && (
            <div class="align-right">
              <el-button onClick={() => resetForm()}>重置</el-button>
              <el-button type="primary" onClick={() => validForm()}>
                确定
              </el-button>
            </div>
          )}
        </div>
      )
    }
    return {
      // 暴露组件属性与方法
      renderIntro,
      resetForm,
      validForm,
      clearValidate
    }
  },
  render() {
    // 渲染页面
    return <div class="c-form">{this.renderIntro()}</div>
  }
})
</script>

<style lang="scss">
.n-form {
  .el-select,
  .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper,
  .el-cascader {
    width: 100%;
  }
}
</style>
