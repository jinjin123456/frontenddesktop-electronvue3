<script lang="tsx">
import { Fold, Expand } from '@element-plus/icons-vue'
import { defineComponent, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import type { menuItem } from '@/types/index'

const leftWidth = 200

export default defineComponent({
  title: 'SideMenu',
  props: {
    menuConfig: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const router = useRouter()
    const isCollapse = ref(false)
    const activeMenuKey = ref('UIForm')
    const goPage = (index: string) => {
      activeMenuKey.value = index
      console.log('index', index)
      router.push({
        name: index
      })
    }
    const getBaseSideItem = (listData: Array<menuItem>) => {
      return listData.map((item) => {
        return item.children && item.children.length ? (
          <el-sub-menu
            index={item.key}
            v-slots={{
              title: () => {
                return (
                  <div>
                    {item.icon && <i class={`iconfont ${item.icon}`}></i>}
                    <span class="side-menu_title">{item.title}</span>
                  </div>
                )
              }
            }}
          >
            {getBaseSideItem(item.children)}
          </el-sub-menu>
        ) : (
          <el-menu-item
            index={item.key}
            class={unref(activeMenuKey) === item.key ? ' menu-active' : ''}
          >
            <div class="menu-item">
              {item.icon && <i class={`iconfont ${item.icon}`}></i>}
              <span class="side-menu_title">{item.title}</span>
            </div>
          </el-menu-item>
        )
      })
    }
    return () => (
      <div
        class="sideContainer box-shadow"
        style={{ width: unref(isCollapse) ? 'auto' : unref(leftWidth) + 'px' }}
      >
        <div class="sideContainer-menu">
          <el-menu
            default-active="UIForm"
            onSelect={goPage}
            mode="vertical"
            collapse={unref(isCollapse)}
          >
            {props.menuConfig.map((item: any) => {
              return item.children && item.children.length ? (
                <el-sub-menu
                  index={item.key}
                  v-slots={{
                    title: () => {
                      return (
                        <div>
                          {item.icon && <i class={`iconfont ${item.icon}`}></i>}
                          <span class="side-menu_title">{item.title}</span>
                        </div>
                      )
                    }
                  }}
                >
                  {getBaseSideItem(item.children)}
                </el-sub-menu>
              ) : (
                <el-menu-item
                  index={item.key}
                  class={unref(activeMenuKey) === item.key ? ' menu-active' : ''}
                >
                  <div class="menu-item">
                    {item.icon && <i class={`iconfont ${item.icon}`}></i>}
                    <span class="side-menu_title">{item.title}</span>
                  </div>
                </el-menu-item>
              )
            })}
          </el-menu>
        </div>
        <div
          class="sideContainer-collapse h16"
          style={{ width: unref(isCollapse) ? '64px' : unref(leftWidth) + 'px' }}
        >
          <el-icon
            class="pointer"
            onClick={() => {
              isCollapse.value = !isCollapse.value
            }}
          >
            {!unref(isCollapse) ? <Fold /> : <Expand />}
          </el-icon>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.sideContainer {
  overflow-y: overlay;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &-menu {
    padding-bottom: 40px;
    .el-sub-menu .el-menu-item {
      line-height: 50px;
      height: 50px;
    }
    .el-menu {
      border-right: none;
      .menu-item {
        padding: 10px 12px 10px 0;
        width: calc(100% - 24px);
        @include fj(flex-start, center);
        .el-icon {
          font-size: 14px;
          margin-right: 4px;
        }
        > .menu-title {
          @include ellipsis;
        }
      }
      .el-menu-item {
        padding-right: 0;
      }
      .el-menu-item.menu-active {
        background-color: $primary-bg-color;
        color: $primary-color;
      }
    }
    .el-sub-menu__title .iconfont,
    .el-menu-item .iconfont {
      margin-right: 5px;
    }
    .el-menu--collapse > .el-menu-item .side-menu_title,
    .el-menu--collapse > .el-sub-menu > .el-sub-menu__title .side-menu_title,
    .el-menu--collapse
      > .el-menu-item-group
      > ul
      > .el-sub-menu
      > .el-sub-menu__title
      .side-menu_title {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
    .el-sub-menu__title *,
    .el-menu-item * {
      vertical-align: middle;
    }
    .el-sub-menu.submenu-active .el-sub-menu__title {
      color: $primary-color;
    }
  }
  &-collapse {
    width: $side-width - 20px;
    background-color: $color-white;
    padding: 10px 12px;
    border-top: 1px solid $border-color;
    @include position(absolute);
    bottom: 0;
  }
}
/* 隐藏滚动条 */
.sideContainer::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
