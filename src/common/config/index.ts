export const PAGE_SIZE_OPTIONS = [10, 15, 30, 50, 100]
export const DEFAULT_PAGE = 1
export const MENU_CONFIG = [
  {
    key: 'UI',
    title: '统计UI组件封装',
    icon: 'icon-ditu',
    children: [
      {
        key: 'UIForm',
        title: 'form表单',
        icon: 'icon-ditu'
      },
      {
        key: 'UseTable',
        title: 'table表格',
        icon: 'icon-ditu'
      },
      {
        key: '1-5',
        title: '扩展组件',
        icon: 'icon-ditu',
        children: [
          {
            key: '1-5-1',
            title: '支持多级菜单',
            icon: 'icon-ditu'
          }
        ]
      },
      {
        key: '1-6',
        title: 'ECharts',
        icon: 'icon-ditu'
      }
    ]
  },
  {
    key: '2',
    title: '2D/3D数据可视化',
    icon: 'icon-ditu',
    children: [
      {
        key: 'OpenLayer',
        title: 'OpenLayer',
        icon: 'icon-ditu'
      },
      {
        key: 'Cesium',
        title: 'Cesium',
        icon: 'icon-ditu'
      }
    ]
  },
  {
    key: '3',
    title: '地图编辑器',
    icon: 'icon-ditu'
  }
] // 左侧菜单栏
