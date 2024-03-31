import { selectOption, buttonItem, formItem } from '@/types'
import { ArrowDown, MoreFilled } from '@element-plus/icons-vue'

// 删除对象属性
const delObjProperty = (obj: object, delArrs: Array<string>) => {
  delArrs.forEach((item: string) => {
    delete obj[item]
  })
}
/**
 * 生成input
 */
const renderInput = (item: formItem, modelObj: any) => {
  const nodeProps = Object.assign({}, item) as any
  delObjProperty(nodeProps, ['componentType', 'bind', 'label'])
  return (
    modelObj && (
      <>
        {item.isTrim ? (
          <el-input
            class={item.hidden ? 'hide' : ''}
            v-slots={item.slots?.()}
            v-model_trim={modelObj[item.bind]}
            placeholder={`请输入${item.label}`}
            {...nodeProps}
            onClick={() => {
              item.clickFn?.()
            }}
          />
        ) : (
          <el-input
            class={item.hidden ? 'hide' : ''}
            v-slots={item.slots?.()}
            v-model={modelObj[item.bind]}
            placeholder={`请输入${item.label}`}
            {...nodeProps}
            onClick={() => {
              item.clickFn?.()
            }}
          />
        )}
      </>
    )
  )
}
/**
 * 生成select下拉框
 */
const renderSelect = (item: formItem, modelObj: any) => {
  const nodeProps = Object.assign({}, item) as any
  delObjProperty(nodeProps, [
    'componentType',
    'bind',
    'label',
    'options',
    'labelKey',
    'valueKey',
    'disabledKey'
  ])
  const labelKey = item.labelKey || ''
  const valueKey = item.valueKey || ''
  const disabledKey = item.disabledKey || ''
  return (
    modelObj && (
      <el-select
        v-model={modelObj[item.bind]}
        placeholder={`请选择${item.label}`}
        filterable
        {...nodeProps}
      >
        {item.options?.map((info: selectOption) => {
          return (
            <el-option
              label={!labelKey ? info.name : info[labelKey]}
              value={!valueKey ? info.id : info[valueKey]}
              disabled={!disabledKey ? info.disabled : info[disabledKey]}
            />
          )
        })}
      </el-select>
    )
  )
}
/**
 * 生成checkbox复选框
 */
const renderCheckbox = (item: any, modelObj: any) => {
  const nodeProps = Object.assign({}, item) as any
  delObjProperty(nodeProps, ['componentType', 'bind', 'label', 'options', 'labelKey', 'valueKey'])
  const labelKey = item.labelKey || ''
  const valueKey = item.valueKey || ''
  return (
    modelObj && (
      <el-checkbox-group v-model={modelObj[item.bind]} {...nodeProps}>
        {item.options?.map((info: selectOption) => {
          return (
            <el-checkbox
              label={!labelKey ? info.name : info[labelKey]}
              name={!valueKey ? info.id : info[valueKey]}
              disabled={item.disabled}
              {...info}
            />
          )
        })}
      </el-checkbox-group>
    )
  )
}
/**
 * 生成日期（时间）选择器
 */
const renderDatePicker = (item: any, modelObj: any) => {
  const nodeProps = Object.assign({}, item)
  delObjProperty(nodeProps, ['componentType', 'bind', 'label'])
  return (
    modelObj && (
      <el-date-picker
        v-model={modelObj[item.bind]}
        placeholder={`请选择${item.label}`}
        {...nodeProps}
      />
    )
  )
}
/**
 * 生成按钮
 */
const renderButton = (item: buttonItem, btnClick?: Function, dataItem?: object) => {
  const nodeProps = Object.assign({}, item)
  delObjProperty(nodeProps, ['componentType', 'label', 'func', 'options'])
  return item.componentType !== 'dropdown' ? (
    <el-button
      class={(item.class || '') + (item.hidden ? 'hide' : '')}
      {...nodeProps}
      onClick={() => item.itemFunc?.(item.func, dataItem) || btnClick?.(item.func, dataItem)}
    >
      {item.label}
    </el-button>
  ) : (
    <el-dropdown
      class={(item.class || '') + (item.hidden ? 'hide' : '')}
      onCommand={(command: string | number) =>
        item.itemFunc?.(command, dataItem) || btnClick?.(command, dataItem)
      }
      v-slots={{
        dropdown: () => {
          return (
            <el-dropdown-menu>
              {item.options?.map((info: any) => {
                const infoProps = Object.assign({}, info)
                delete infoProps.label
                return <el-dropdown-item {...info}>{info.label}</el-dropdown-item>
              })}
            </el-dropdown-menu>
          )
        }
      }}
    >
      <el-button {...nodeProps}>
        {item.label}
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </el-button>
    </el-dropdown>
  )
}
/**
 * 生成dropdown
 */
const renderDropdown = (item: buttonItem, btnClick?: Function, dataItem?: object) => {
  const nodeProps = Object.assign({}, item)
  delObjProperty(nodeProps, ['componentType', 'label', 'func'])
  return (
    <el-dropdown
      onCommand={(command: string | number) =>
        item.itemFunc?.(command, dataItem) || btnClick?.(command, dataItem)
      }
      v-slots={{
        dropdown: () => {
          return (
            <el-dropdown-menu>
              {item.options?.map((info: any) => {
                const infoProps = Object.assign({}, info)
                delete infoProps.label
                return <el-dropdown-item {...info}>{info.label}</el-dropdown-item>
              })}
            </el-dropdown-menu>
          )
        },
        default: () => {
          return item.defaultSlot?.()
        }
      }}
    >
      <el-button {...nodeProps}>
        {item.label}
        <el-icon class="el-icon--right">{item.icon || <ArrowDown />}</el-icon>
      </el-button>
    </el-dropdown>
  )
}
/**
 * 生成分页
 */
const renderPagination = (item: any, modelObj: any) => {
  const nodeProps = Object.assign({}, item)
  delObjProperty(nodeProps, ['componentType', 'pageSizeKey', 'pageNoKey', 'refreshData'])
  return (
    <div class="n-pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        {...nodeProps}
        v-model:pageSize={modelObj[item.pageSizeKey || 'pageSize']}
        v-model:currentPage={modelObj[item.pageNoKey || 'pageNo']}
        onSizeChange={() => {
          modelObj[item.pageNoKey || 'pageNo'] = 1
          item.refreshData?.()
        }}
        onCurrentChange={() => {
          item.refreshData?.()
        }}
      />
    </div>
  )
}

/**
 * 生成dialog对话框
 */
const renderDialog = (option: any) => {
  const nodeProps = Object.assign({}, option)
  delObjProperty(nodeProps, ['defaultSlot'])
  const cancel = () => {
    option.visible = false
  }
  const { hideFooter, customFooter } = option
  const getFooter = customFooter
    ? customFooter
    : () => {
        return (
          <div>
            <el-button
              onClick={() => {
                option.cancelFn?.() || cancel()
              }}
            >
              取消
            </el-button>
            <el-button type="primary" onClick={() => option.sureFn?.()} loading={option.btnLoading}>
              确定
            </el-button>
          </div>
        )
      }
  return (
    <el-dialog
      v-model={option.visible}
      title={option.title}
      close-on-click-modal={false}
      onClose={() => {
        option.cancelFn?.() || cancel()
      }}
      {...nodeProps}
      v-slots={{
        footer: !hideFooter ? getFooter : null
      }}
    >
      {option.defaultSlot?.()}
    </el-dialog>
  )
}
/**
 * 生成按钮组合
 */
const renderButtonList = (list: Array<buttonItem>, btnClick: Function, data: object) => {
  const btnList = list.filter((info: buttonItem) => !info.hidden)
  const length = btnList?.length || 0
  const buttonList = length > 3 ? btnList?.slice(0, 2) : btnList
  const moreButton = length > 3 ? btnList?.slice(2, length) : [] // 更多下面的隐藏button
  moreButton?.forEach((item) => {
    item.command = item.func
  })
  const dotIcon = {
    defaultSlot: () => {
      return (
        <el-icon class="pointer color-primary">
          <MoreFilled />
        </el-icon>
      )
    },
    options: moreButton
  }
  const renderDot = () => {
    return length > 3 && renderDropdown(dotIcon, btnClick, data)
  }
  return (
    <div class="n-operate">
      {buttonList?.map((info: buttonItem) => {
        return renderButton(info, btnClick, data)
      })}
      {renderDot()}
    </div>
  )
}
/**
 * 生成radio单选框
 */
const renderRadio = (item: any, modelObj: any) => {
  const nodeProps = Object.assign({}, item) as any
  delObjProperty(nodeProps, [
    'componentType',
    'bind',
    'label',
    'type',
    'options',
    'itemFunc',
    'labelKey',
    'valueKey'
  ])
  // nodeProps.type 类型是单选点还是单选按钮
  const labelKey = item.labelKey || ''
  const valueKey = item.valueKey || ''
  return (
    modelObj && (
      <el-radio-group
        v-model={modelObj[item.bind]}
        {...nodeProps}
        onChange={(val: string | number) => item.itemFunc?.(val)}
      >
        {item.options?.map((info: selectOption) => {
          return item.type === 'button' ? (
            <el-radio-button
              label={!labelKey ? info.name : info[labelKey]}
              name={!valueKey ? info.id : info[valueKey]}
              disabled={item.disabled}
              {...info}
            />
          ) : (
            <el-radio
              label={!labelKey ? info.name : info[labelKey]}
              name={!valueKey ? info.id : info[valueKey]}
              disabled={item.disabled}
              {...info}
            />
          )
        })}
      </el-radio-group>
    )
  )
}
/**
 * 生成cascader级联
 */
const renderCascader = (item: any, modelObj: any) => {
  const nodeProps = Object.assign({}, item) as any
  delObjProperty(nodeProps, ['componentType', 'bind', 'label', 'options', 'itemFunc'])
  return (
    modelObj && (
      <el-cascader
        v-model={modelObj[item.bind]}
        onChange={(val: string | number) => item.itemFunc?.(val)}
        options={item.options}
        placeholder={`请选择${item.label}`}
        {...nodeProps}
      />
    )
  )
}
/**
 * 生成treeselect树形选择器
 */
const renderTreeSelect = (item: any, modelObj: any) => {
  const nodeProps = Object.assign({}, item) as any
  delObjProperty(nodeProps, ['componentType', 'bind', 'label', 'itemFunc', 'load'])
  return (
    modelObj && (
      <el-tree-select
        v-model={modelObj[item.bind]}
        data={item.data}
        nodeKey="id"
        placeholder={`请选择${item.label}`}
        {...nodeProps}
        onNodeClick={(val: any, node: any) => {
          // console.log(val[item.props.value || 'id'])
          if (!item.showCheckbox && !node.disabled) {
            modelObj[item.bind] = val[item.props.value || 'id']
          }
        }}
        onCheck={(val: any) => {
          if (item.showCheckbox) {
            modelObj[item.bind].push(val[item.props.value || 'id'])
          }
        }}
        load={(node: any, resolve: any) => {
          setTimeout(() => {
            resolve(item.load?.(node))
          }, 400)
        }}
      />
    )
  )
}

/**
 * 生成 textarea 输入
 */
const renderTextarea = (item: any, modelObj: any) => {
  const nodeProps = Object.assign({}, item) as any
  delObjProperty(nodeProps, ['componentType', 'bind', 'label'])
  return (
    modelObj && (
      <el-input
        type="textarea"
        class={item.hidden ? 'hide' : ''}
        v-slots={item.slots?.()}
        v-model={modelObj[item.bind]}
        placeholder={`请输入${item.label}`}
        {...nodeProps}
        onClick={() => {
          item.clickFn?.()
        }}
      />
    )
  )
}

export {
  renderInput,
  renderSelect,
  renderDatePicker,
  renderButton,
  renderDropdown,
  renderPagination,
  renderDialog,
  renderButtonList,
  renderCheckbox,
  renderRadio,
  renderCascader,
  renderTreeSelect,
  renderTextarea
}
