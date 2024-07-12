<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@renderer/components/appHeader/index.vue'
import { ElMessage } from 'element-plus'
import NLoading from '@renderer/components/common/nLoading.vue'

const {
  electron: { ipcRenderer }
} = window

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    NLoading
  },
  setup() {
    const handleShowClick = (_, msg) => {
      ElMessage.info(msg)
    }
    onMounted(() => {
      ipcRenderer.removeListener('show-click', handleShowClick)
      ipcRenderer.on('show-click', handleShowClick)
    })
    return () => (
      <div id="app">
        <NLoading />
        <AppHeader />
        <RouterView />
      </div>
    )
  }
})
</script>

<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
