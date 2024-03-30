<script lang="tsx">
import { defineComponent, onMounted, ref, unref, reactive, watch } from 'vue'
import { headItem, sortItem } from '@/types'
import createFn from '../nComponent/createForm'
import { PAGE_SIZE_OPTIONS, DEFAULT_PAGE } from '@/common/config/index'
import { renderHeaderButton, renderHeaderForm } from './table'
export default defineComponent({
  name: 'NTable',
  components: {},
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props, ctx) {
    const { option } = reactive({
      ...props
    })
    // 分页字段
    const pageData = option.pageParams || { pageNoName: 'pageNo', pageSizeName: 'pageSize' }
    // 排序字段
    const orderData = option.orderParams || { orderName: 'sortBy', orderStatus: 'sortType' }
    // 是否立即执行
    const immediate = option.immediate === false ? option.immediate : true
    // 是否开启分页，默认分页
    const isPage = ref(option.page === false ? option.page : true)
    // 开启loading
    const loading = ref(false)
    // 表格数据
    const tableData = ref([])
    /**
     * 根据声明的请求方法和参数获取表格分页数据
     */
    const fetchTableData = () => {
      loading.value = true
      if (unref(isPage)) {
        option.params[pageData.pageSizeName] =
          option.params[pageData.pageSizeName] || Number(PAGE_SIZE_OPTIONS[0])
        option.params[pageData.pageNoName] =
          option.params[pageData.pageNoName] || Number(DEFAULT_PAGE)
      }
      // console.log('option.params', option.params)
      option
        .getData({
          ...option.params
        })
        .then((res: any) => {
          tableData.value = res.records
          pageOption.total = res.total
          loading.value = false
        })
        .catch(() => {
          tableData.value = []
          pageOption.total = 0
          loading.value = false
        })
        .finally(() => {
          loading.value = false
        })
    }
    // 排序
    const sortChange = ({ prop, order }: sortItem) => {
      option.params[orderData.orderName] = prop
      option.params[orderData.orderStatus] = order
      fetchTableData()
    }
    // 勾选
    const selectChange = (selection: Array<object>, row: object) => {
      option.btnClick?.('select', selection, row)
    }
    // 勾选全部
    const selectAllChange = (selection: Array<object>) => {
      console.log(selection)
      option.btnClick?.('selectAll', selection)
    }
    // 表单配置
    const formOption = reactive({
      formList: option.formList,
      params: option.params,
      searchFn: () => {
        if (unref(isPage)) {
          option.params[pageData.pageNoName] = Number(DEFAULT_PAGE)
        }
        fetchTableData()
      }
    })
    // 按钮配置
    const buttonOption = reactive({
      buttonList: option.buttonList,
      btnClick: option.btnClick
    })
    // 分页配置
    const pageOption = reactive({
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      pageSizes: PAGE_SIZE_OPTIONS,
      refreshData: fetchTableData,
      ...(option?.pageOption || {})
    })
    /**
     * 主表
     */
    const renderTable = () => {
      return (
        <el-table
          v-loading={unref(loading)}
          border
          {...option.tableProps}
          data={unref(tableData)}
          onSortChange={({ column, prop, order }: sortItem) => sortChange({ column, prop, order })}
          onSelect={selectChange}
          onSelectAll={selectAllChange}
        >
          {option.tableData.dataHead.map((item: headItem) => {
            return (
              !item.hidden && (
                <el-table-column
                  {...item}
                  v-slots={{
                    default: (scoped: { row: any }) => {
                      return item.customRender
                        ? item.customRender?.(scoped)
                        : scoped.row[item.prop] ||
                            scoped.row[item.prop] === 0 ||
                            item.type === 'selection'
                          ? scoped.row[item.prop]
                          : item.type === 'expand'
                            ? item.expandContent?.(scoped)
                            : '--'
                    }
                  }}
                />
              )
            )
          })}
        </el-table>
      )
    }
    const IntroFn = () => {
      return (
        <div class="n-table">
          {/* 表格头部 */}
          {(option.formList || option.buttonList) && (
            <div
              class={
                'n-header' +
                (option.formListAlign === 'right' || option.buttonListAlign === 'left'
                  ? ' flex-direction'
                  : '')
              }
            >
              {/* 左侧form */}
              <div class="n-left_header">
                {ctx.slots.leftHeader?.() || renderHeaderForm(formOption)}
              </div>
              {/* 右侧button */}
              <div class="n-right_header">
                {ctx.slots.rightHeader?.() || renderHeaderButton(buttonOption)}
              </div>
            </div>
          )}
          {/* 表格主体 */}
          {renderTable()}
          {/* 分页 */}
          {unref(isPage) && createFn.pagination(pageOption, option.params)}
        </div>
      )
    }
    watch(
      () => option.refresh,
      () => {
        fetchTableData()
      }
    )
    onMounted(() => {
      if (immediate && option.params) {
        fetchTableData()
      }
    })
    return {
      IntroFn
    }
  },
  render() {
    return this.IntroFn()
  }
})
</script>
<style lang="scss">
.n-table {
  .el-table th.el-table__cell {
    background-color: $table-header-bg;
  }

  .el-table th.el-table__cell:not(:last-child) {
    border-right: 1px solid $border-color;
  }
  .el-table--border .el-table__cell {
    border-right: none;
  }
  .el-table thead .cell {
    color: $color-text-color;
    font-weight: 400;
  }
  .el-table .el-table__body .el-table__cell {
    padding: 8px 0;
  }
  .n-header {
    @include fj;
  }
  .n-pagination {
    margin-top: 8px;
  }
  .n-button_header {
    margin-bottom: 8px;
  }
  .flex-direction {
    flex-direction: row-reverse;
  }
  .n-operate {
    @include fj(flex-start, center);
    .el-button.is-text {
      height: auto;
      padding: 0 !important;
    }
    .el-dropdown {
      margin-left: 8px;
    }
  }
}
</style>
