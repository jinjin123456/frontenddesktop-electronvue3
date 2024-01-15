<script lang="tsx">
import { defineComponent } from 'vue'
// import { User, Setting, Minus } from 'element-plus/icons-vue'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    // const handleSetting = () => {}
    // const handleMin = () => {}
    // const handleRestore = () => {}
    // const handleMax = () => {}
    // const handleClose = () => {}
    return () => (
      <div class="AppHeader">
        <div class="AppHeader-left">
          <span>GIS可视化平台</span>
        </div>
        <div class="AppHeader-right">
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.AppHeader {
  width: 100%;
  height: 50px;
}
</style>
