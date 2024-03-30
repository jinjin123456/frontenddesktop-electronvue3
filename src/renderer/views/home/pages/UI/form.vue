<script lang="tsx">
import { defineComponent, reactive, onMounted } from 'vue'
import NForm from '@renderer/components/common/nForm/index.vue'
import { FormRules } from 'element-plus'
import { dictItem } from '@/types'

export default defineComponent({
  name: 'UseForm',
  setup() {
    const option = reactive({
      formList: [
        {
          componentType: 'checkbox',
          bind: 'adminTypes',
          span: 12,
          options: [
            {
              id: '1',
              name: '超管'
            },
            {
              id: '2',
              name: '中级管理员'
            }
          ],
          label: '角色'
        },
        {
          componentType: 'radio',
          bind: 'isFlag',
          span: 12,
          options: [
            {
              id: '1',
              name: '是'
            },
            {
              id: '2',
              name: '否'
            }
          ],
          label: '是否子公司'
        },
        {
          componentType: 'radio',
          bind: 'isAdmin',
          type: 'button',
          span: 12,
          options: [
            {
              id: '1',
              name: '是'
            },
            {
              id: '2',
              name: '否'
            }
          ],
          label: '是否是管理员'
        },
        {
          componentType: 'input',
          bind: 'emailHost',
          span: '12',
          label: '设置span为12',
          placeholder: ''
        },
        {
          componentType: 'input',
          bind: 'emailHost',
          prop: 'emailHost', // 绑定rule校验的
          label: '默认全屏',
          placeholder: '',
          hidden: false // 控制显隐
        },
        {
          componentType: 'select',
          bind: 'userId',
          options: [
            {
              name: '空闲',
              id: 'free'
            },
            {
              name: '忙碌',
              id: 'busy'
            },
            {
              name: '离线',
              id: 'offline'
            }
          ],
          label: '下拉框'
          // 支持远程请求
          // options: [],
          // valueKey: 'userId',
          // clearable: true,
          // remote: true,
          // 'remote-method': (query: string) => { handleSelectSearch(query, option.formOption.formList, 'userId') },
          // loading: false,
          // 'render-after-expand': false
        },
        {
          componentType: 'treeSelect',
          bind: 'deptId',
          label: '所属部门',
          data: [
            {
              value: '1',
              label: 'Level one 1',
              children: [
                {
                  value: '1-1',
                  label: 'Level two 1-1',
                  children: [
                    {
                      value: '1-1-1',
                      label: 'Level three 1-1-1'
                    }
                  ]
                }
              ]
            }
          ]
          // 支持设置label value字段
          // props: {
          //   label: 'name',
          //   value: 'deptIdPath',
          //   disabled: (data: treeItem) => !data.selectFlag
          // },
          // data: [],
          // clearable: true,
          // 'render-after-expand': false,
        },
        {
          componentType: 'datePicker',
          bind: 'createTime',
          type: 'daterange',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          label: '日期选择框',
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD',
          unlinkPanels: true
        },
        {
          componentType: 'cascader',
          bind: 'city',
          options: [
            {
              value: 'guide',
              label: 'Guide',
              children: [
                {
                  value: 'disciplines',
                  label: 'Disciplines',
                  children: [
                    {
                      value: 'consistency',
                      label: 'Consistency'
                    },
                    {
                      value: 'feedback',
                      label: 'Feedback'
                    },
                    {
                      value: 'efficiency',
                      label: 'Efficiency'
                    },
                    {
                      value: 'controllability',
                      label: 'Controllability'
                    }
                  ]
                },
                {
                  value: 'navigation',
                  label: 'Navigation',
                  children: [
                    {
                      value: 'side nav',
                      label: 'Side Navigation'
                    },
                    {
                      value: 'top nav',
                      label: 'Top Navigation'
                    }
                  ]
                }
              ]
            },
            {
              value: 'component',
              label: 'Component',
              children: [
                {
                  value: 'basic',
                  label: 'Basic',
                  children: [
                    {
                      value: 'layout',
                      label: 'Layout'
                    },
                    {
                      value: 'color',
                      label: 'Color'
                    },
                    {
                      value: 'typography',
                      label: 'Typography'
                    },
                    {
                      value: 'icon',
                      label: 'Icon'
                    },
                    {
                      value: 'button',
                      label: 'Button'
                    }
                  ]
                },
                {
                  value: 'form',
                  label: 'Form',
                  children: [
                    {
                      value: 'radio',
                      label: 'Radio'
                    },
                    {
                      value: 'checkbox',
                      label: 'Checkbox'
                    },
                    {
                      value: 'input',
                      label: 'Input'
                    },
                    {
                      value: 'input-number',
                      label: 'InputNumber'
                    },
                    {
                      value: 'select',
                      label: 'Select'
                    },
                    {
                      value: 'cascader',
                      label: 'Cascader'
                    },
                    {
                      value: 'switch',
                      label: 'Switch'
                    },
                    {
                      value: 'slider',
                      label: 'Slider'
                    },
                    {
                      value: 'time-picker',
                      label: 'TimePicker'
                    },
                    {
                      value: 'date-picker',
                      label: 'DatePicker'
                    },
                    {
                      value: 'datetime-picker',
                      label: 'DateTimePicker'
                    },
                    {
                      value: 'upload',
                      label: 'Upload'
                    },
                    {
                      value: 'rate',
                      label: 'Rate'
                    },
                    {
                      value: 'form',
                      label: 'Form'
                    }
                  ]
                },
                {
                  value: 'data',
                  label: 'Data',
                  children: [
                    {
                      value: 'table',
                      label: 'Table'
                    },
                    {
                      value: 'tag',
                      label: 'Tag'
                    },
                    {
                      value: 'progress',
                      label: 'Progress'
                    },
                    {
                      value: 'tree',
                      label: 'Tree'
                    },
                    {
                      value: 'pagination',
                      label: 'Pagination'
                    },
                    {
                      value: 'badge',
                      label: 'Badge'
                    }
                  ]
                },
                {
                  value: 'notice',
                  label: 'Notice',
                  children: [
                    {
                      value: 'alert',
                      label: 'Alert'
                    },
                    {
                      value: 'loading',
                      label: 'Loading'
                    },
                    {
                      value: 'message',
                      label: 'Message'
                    },
                    {
                      value: 'message-box',
                      label: 'MessageBox'
                    },
                    {
                      value: 'notification',
                      label: 'Notification'
                    }
                  ]
                },
                {
                  value: 'navigation',
                  label: 'Navigation',
                  children: [
                    {
                      value: 'menu',
                      label: 'Menu'
                    },
                    {
                      value: 'tabs',
                      label: 'Tabs'
                    },
                    {
                      value: 'breadcrumb',
                      label: 'Breadcrumb'
                    },
                    {
                      value: 'dropdown',
                      label: 'Dropdown'
                    },
                    {
                      value: 'steps',
                      label: 'Steps'
                    }
                  ]
                },
                {
                  value: 'others',
                  label: 'Others',
                  children: [
                    {
                      value: 'dialog',
                      label: 'Dialog'
                    },
                    {
                      value: 'tooltip',
                      label: 'Tooltip'
                    },
                    {
                      value: 'popover',
                      label: 'Popover'
                    },
                    {
                      value: 'card',
                      label: 'Card'
                    },
                    {
                      value: 'carousel',
                      label: 'Carousel'
                    },
                    {
                      value: 'collapse',
                      label: 'Collapse'
                    }
                  ]
                }
              ]
            },
            {
              value: 'resource',
              label: 'Resource',
              children: [
                {
                  value: 'axure',
                  label: 'Axure Components'
                },
                {
                  value: 'sketch',
                  label: 'Sketch Templates'
                },
                {
                  value: 'docs',
                  label: 'Design Documentation'
                }
              ]
            }
          ] as dictItem[],
          label: '城市'
        },
        {
          componentType: 'slots',
          bind: 'emailSsl',
          label: '自定义slots',
          render: () => {
            return (
              <span>
                人生不求大功德，平安顺遂富贵乐;<span style="color: #2c69ff">自定义一段html；</span>
              </span>
            )
          }
        },
        {
          componentType: 'button',
          type: 'primary',
          label: '打开表单弹窗' // TODO - 封装表单弹窗
        }
      ],
      formModel: {
        emailHost: '',
        userId: '',
        deptId: '',
        createTime: [],
        adminTypes: [],
        isFlag: '',
        isAdmin: '',
        city: [],
        emailPort: '',
        emailSsl: true
      },
      rules: {
        emailHost: [{ required: true, message: '请输入内容', trigger: 'change' }],
        emailPort: [{ required: true, message: '请输入内容', trigger: 'change' }]
      } as FormRules
    })
    // const showFormDialog = () => {}
    onMounted(() => {})
    return () => (
      <div>
        <NForm option={option} />
      </div>
    )
  }
})
</script>

<style lang="scss" scoped></style>
