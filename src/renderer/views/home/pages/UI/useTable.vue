<script lang="tsx">
import { defineComponent, reactive, onMounted, ref, unref } from 'vue'
import createFn from '@renderer/components/common/nComponent/createForm'
import NTable from '@renderer/components/common/nTable/index.vue'
import { getMockData } from '@renderer/api/index'
import { resultMap } from '@/types'
import { TabsPaneContext } from 'element-plus'
import BUS from '@renderer/utils/bus'

export default defineComponent({
  name: 'UseTable',
  components: {
    NTable
  },
  setup() {
    const getApiInfo = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('1')
        }, 5000) // 模拟等待接口返回信息
      })
    }
    const currTab = ref('simple')
    const selecIds = ref([] as Array<string>) // 表格选中id集合
    const selectFun = (selections: Array<any>) => {
      // TODO - 可不可以内置
      selecIds.value = selections.map((item: any) => item.id)
    }
    const btnClick = (type: string, data: any) => {
      console.log(type, data)
      switch (type) {
        case 'select': // 勾选
          selectFun(data)
          break
        case 'selectAll':
          selectFun(data)
          break
        case 'globalLoading':
          BUS.emit('isLoading', { isLoading: true, text: '正在loading中' })
          getApiInfo().then((res) => {
            BUS.emit('isLoading', { isLoading: false })
            console.log(res)
          })
          break
        default:
          break
      }
    }
    const getTableData = (params: object) => {
      return new Promise((resolve) => {
        getMockData(params).then((res: resultMap) => {
          const { data } = res
          const { total, records } = data
          resolve({
            total,
            records
          })
        })
      })
    }
    const simpleOption = reactive({
      refresh: false,
      getData: getTableData,
      btnClick: btnClick,
      tableProps: {
        maxHeight: window.innerHeight - 200,
        rowKey: 'id'
      },
      tableData: {
        dataHead: [
          {
            label: '角色名称',
            prop: 'roleName',
            sortable: 'custom'
          },
          {
            label: '角色描述',
            prop: 'roleDetail'
          },
          {
            label: '更新人',
            prop: 'founder'
          },
          {
            label: '更新时间',
            prop: 'updateTime'
          },
          {
            label: '操作',
            prop: 'operate',
            width: '140px',
            customRender: (scoped: any) => {
              return createFn.buttonList(
                [
                  {
                    label: '编辑',
                    func: 'edit',
                    text: true,
                    type: 'primary'
                  },
                  {
                    label: '删除',
                    func: 'delete',
                    text: true,
                    type: 'danger'
                  },
                  {
                    label: '告警',
                    func: 'warning',
                    text: true,
                    type: 'warning'
                  },
                  {
                    label: '丢弃',
                    func: 'warning2',
                    text: true,
                    type: 'warning',
                    class: 'color-success'
                  }
                ],
                btnClick,
                scoped.row
              )
            }
          }
        ]
      },
      params: {
        roleName: '张三',
        creatTime: '',
        roles: ''
      }
    })
    const complicOption = reactive({
      refresh: false,
      getData: getTableData,
      btnClick: btnClick,
      select: btnClick, // 支持勾选
      tableProps: {
        maxHeight: window.innerHeight - 240,
        rowKey: 'id'
      },
      formList: [
        {
          componentType: 'input',
          bind: 'roleName',
          placeholder: '请输入关键词',
          label: '角色名称',
          hidden: true
        },
        {
          componentType: 'select',
          bind: 'roles',
          options: [],
          label: '角色对象'
        },
        {
          componentType: 'datePicker',
          bind: 'creatTime',
          label: '创建时间',
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD'
        },
        {
          componentType: 'searchBtn',
          text: '查询',
          plain: true,
          type: 'primary'
        }
      ],
      buttonList: [
        {
          label: '显示全局loading',
          func: 'globalLoading',
          plain: true,
          type: 'primary'
        },
        {
          label: '导出',
          func: 'exportAll',
          plain: true,
          type: 'primary'
          // hidden: true
        },
        {
          label: '批量操作',
          plain: true,
          type: 'primary',
          componentType: 'dropdown',
          options: [
            {
              label: '批量删除',
              command: 'batchDel'
            },
            {
              label: '批量导出',
              command: 'batchExport'
            }
          ]
        }
      ],
      tableData: {
        dataHead: [
          {
            label: '',
            prop: '',
            type: 'selection',
            width: 50
          }, // 支持勾选
          {
            label: '角色名称',
            prop: 'roleName',
            sortable: 'custom'
          },
          {
            label: '角色描述',
            prop: 'roleDetail'
          },
          {
            label: '更新人',
            prop: 'founder'
          },
          {
            label: '更新时间',
            prop: 'updateTime'
          },
          {
            label: '操作',
            prop: 'operate',
            width: '140px',
            customRender: (scoped: any) => {
              return createFn.buttonList(
                [
                  {
                    label: '编辑',
                    func: 'edit',
                    text: true,
                    type: 'primary'
                  },
                  {
                    label: '删除',
                    func: 'delete',
                    text: true,
                    type: 'danger'
                  },
                  {
                    label: '告警',
                    func: 'warning',
                    text: true,
                    type: 'warning'
                  },
                  {
                    label: '丢弃',
                    func: 'warning2',
                    text: true,
                    type: 'warning',
                    class: 'color-success'
                  }
                ],
                btnClick,
                scoped.row
              )
            }
          }
        ]
      },
      params: {
        roleName: '张三',
        creatTime: '',
        roles: ''
      }
    })
    const handleTabClick = (tab: TabsPaneContext) => {
      const { props } = tab
      const { name } = props
      if (name !== unref(currTab)) {
        currTab.value = name as string
        const targetOption = unref(currTab) === 'simple' ? simpleOption : complicOption
        targetOption.refresh = !targetOption.refresh
      }
    }
    onMounted(() => {})
    return () => (
      <el-tabs v-model={currTab.value} onTabClick={handleTabClick}>
        <el-tab-pane label="简单表格" name="simple">
          <NTable option={simpleOption} />
        </el-tab-pane>
        <el-tab-pane label="复杂表格" name="complicate">
          <NTable option={complicOption} />
        </el-tab-pane>
      </el-tabs>
    )
  }
})
</script>

<style lang="scss" scoped></style>
