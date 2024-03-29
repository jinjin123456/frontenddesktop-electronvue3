<script lang="tsx">
// import { User, Setting, Minus } from 'element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
const {
  electron: { ipcRenderer }
} = window

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const isMax = ref(false)
    const handleMin = () => {
      ipcRenderer.send('window-min')
    }
    const handleRestore = () => {
      isMax.value = !isMax.value
      ipcRenderer.send(`window-${isMax.value ? 'max' : 'restore'}`)
    }
    const handleClose = () => {
      ipcRenderer.send('window-close')
    }
    // const handleSetting = () => {}
    return () => (
      <div class="AppHeader">
        <div class="AppHeader-left" style="-webkit-app-region: drag;">
          <span>数据可视化平台</span>
        </div>
        <div class="AppHeader-right">
          <i class="iconfont icon-setting" />
          <i class="iconfont icon-user" />
          <span>|</span>
          <i onClick={handleMin} class="iconfont icon-minus-bold" />
          <i
            onClick={handleRestore}
            class={`iconfont ${isMax.value ? 'icon-window-restore' : 'icon-window-maximize'}`}
          />
          <i onClick={handleClose} class="iconfont icon-close" />
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.AppHeader {
  width: 100%;
  background-color: $primary-color;
  color: $color-white;
  padding: 0 20px;
  @include fj();
  &-left,
  &-right {
    height: $header-height;
    line-height: $header-height;
  }
  &-left {
    width: calc(100% - 150px);
    font-size: $font-huge;
    font-weight: bold;
  }
  &-right {
    width: 200px;
    @include fj();
    i {
      cursor: pointer;
    }
  }
}
</style>
