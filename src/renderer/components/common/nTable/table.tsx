import { buttonItem, formItem, formListType, buttonListType } from '@/types'
import createFn from '../nComponent/createForm'
import './table.scss'

/**
 * 生成form筛选条件
 */
const renderHeaderForm = (opt: formListType) => {
  /**
   * 生成查询按钮
   */
  const renderSearchBtn = (item: formItem) => {
    const nodeProps = Object.assign({}, item)
    delete nodeProps.componentType
    delete nodeProps.hidden
    delete nodeProps.text
    return (
      <el-button
        class={item.hidden ? 'hide' : ''}
        {...nodeProps}
        onClick={() => {
          item.itemFunc ? item.itemFunc() : opt.searchFn?.()
        }}
      >
        {item.text || '查询'}
      </el-button>
    )
  }
  return (
    <div class="n-form_header">
      {opt.formList?.map((item: formItem) => {
        return (
          <div class={'form-header_item' + (item.hidden ? ' hide' : '')}>
            {item.label && <span>{item.label}：</span>}
            {item.componentType === 'searchBtn'
              ? renderSearchBtn(item)
              : createFn[item.componentType]
                ? createFn[item.componentType](item, opt.params)
                : item.render?.()}
          </div>
        )
      })}
    </div>
  )
}
/**
 * 生成操作按钮
 */
const renderHeaderButton = (opt: buttonListType) => {
  return (
    <div class="n-button_header">
      {opt.buttonList?.map((item: buttonItem) => {
        return createFn.button(item, opt.btnClick)
      })}
    </div>
  )
}
export { renderHeaderButton, renderHeaderForm }
