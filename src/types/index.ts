export interface resultMap<T = any> {
  code: string
  data?: T
  message?: string
}

export interface buttonItem {
  componentType?: any
  type?: string
  text?: boolean
  label?: string
  func?: string
  itemFunc?: any
  options?: Array<any>
  defaultSlot?: any
  icon?: any
  hidden?: boolean
  class?: string
  plain?: boolean
  command?: string
  disabled?: boolean
}

export interface formItem {
  bind: string
  options?: Array<any>
  componentType?: any
  placeholder?: string
  label?: string
  labelSlot?: Function
  text?: string
  itemFunc?: any
  labelKey?: string
  valueKey?: string
  disabledKey?: string
  func?: string
  hidden?: boolean
  span?: number
  render?: Function
  slots?: Function
  data?: Array<any>
  prop?: string
  clickFn?: Function
  isTrim?: boolean
  loading?: boolean
}

export interface formListType {
  formList: Array<formItem>
  params?: any
  searchFn?: Function
}

export interface buttonListType {
  buttonList: Array<buttonItem>
  btnClick?: Function
}

export interface selectOption {
  name?: string
  id?: string
  disabled?: boolean
}

export interface sortItem {
  order: string
  prop: string
  column: object
}

export interface dropdownItem {
  command: string
  label?: string
}

export interface headItem {
  prop: string
  type?: string
  index?: number
  label?: string
  fixed?: boolean
  width?: string
  sortable?: boolean
  hidden?: boolean
  align?: string
  buttonList?: Array<any>
  customRender?: Function
  expandContent?: Function
}

export interface dictItem {
  is: string | number
  name: string
}
export interface menuItem {
  key: string | number
  icon: string
  title: string
  children?: Array<menuItem>
}
