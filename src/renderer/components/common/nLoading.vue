<script lang="tsx">
import { defineComponent, onMounted, onBeforeUnmount, Ref, ref } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import BUS from '@renderer/utils/bus'

interface loadingMap {
  isLoading: boolean
  text?: string
  immediate?: boolean
  timeout?: number | undefined
}

export default defineComponent({
  name: 'NLoading',
  setup() {
    const loadingShow = ref(false)
    const loadingText = ref('加载中')
    const loadingTimer: Ref<null | ReturnType<typeof setTimeout>> = ref(null)
    const loadingHideTimer: Ref<null | ReturnType<typeof setTimeout>> = ref(null)
    const getLoadingConfig = ({
      immediate = false,
      timeout = 30,
      isLoading,
      text = '加载中'
    }: loadingMap) => {
      if (!isLoading) {
        loadingHideTimer.value && clearTimeout(loadingHideTimer.value)
        loadingHideTimer.value = setTimeout(() => {
          // 延迟500ms 关闭，兼容多个接口连续不断loading
          loadingShow.value = false
          loadingText.value = ''
          loadingHideTimer.value = null
        }, 500)
      } else {
        loadingHideTimer.value && clearTimeout(loadingHideTimer.value) // 清空定时器
        loadingTimer.value && clearTimeout(loadingTimer.value) // 清空定时器
        loadingTimer.value = setTimeout(() => {
          loadingShow.value = false
          loadingTimer.value = null
        }, timeout * 1000) // timeout 秒后自动关闭, 大工程加载超时时间过长
        loadingShow.value = true
        loadingText.value = text
      }
      if (immediate) {
        // 立即触发
        loadingShow.value = isLoading
        loadingHideTimer.value && clearTimeout(loadingHideTimer.value)
        loadingTimer.value && clearTimeout(loadingTimer.value) // 清空定时器
      }
    }
    onMounted(() => {
      BUS.off('isLoading')
      BUS.on('isLoading', getLoadingConfig)
    })
    onBeforeUnmount(() => {
      BUS.off('isLoading')
    })
    return {
      loadingShow,
      loadingText
    }
  },
  render() {
    return (
      <div class={`loading-mask ${this.loadingShow ? 'loading-show' : 'loading-hide'}`}>
        <div class="loading-box">
          <div class="lb-spinner">
            <el-icon class="is-loading">
              <Loading />
            </el-icon>
          </div>
          <div class="lb-info">{this.loadingText}...</div>
        </div>
      </div>
    )
  }
})
</script>
<style lang="scss">
.loading-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10000;
  display: none;
  align-items: center;
  justify-content: center;
  -webkit-animation: 0.3s fadeIn linear;
  animation: 0.3s fadeIn linear;
  user-select: none;
  .loading-box {
    width: fit-content;
    min-width: 120px;
    min-height: 68px;
    background-color: $color-white;
    align-items: center;
    border-radius: 4px;
    padding-bottom: 8px;

    .lb-spinner {
      width: 50px;
      height: 50px;
      @include fj(center, center);
      border-radius: 50%;
      margin: 0 auto;
    }

    .lb-info {
      text-align: center;
      font-size: 12px;
      margin-bottom: 8px;
      padding: 0 8px;
    }
  }
}
.loading-show {
  display: flex;
}
.loading-hide {
  -webkit-animation: 0.4s fadeOut forwards;
  animation: 0.4s fadeOut forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    display: flex;
    opacity: 1;
  }
  95% {
    display: flex;
    opacity: 0;
  }
  100% {
    display: none;
    opacity: 0;
  }
}
</style>
