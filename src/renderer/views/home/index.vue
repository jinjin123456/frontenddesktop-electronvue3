<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import SideMenu from '@renderer/components/sideMenu/index.vue'
import { MENU_CONFIG } from '@/common/config/index'
import NLoading from '@renderer/components/common/nLoading.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SideMenu,
    NLoading
  },
  setup() {
    return () => (
      <div class="homeContainer">
        <NLoading />
        <SideMenu menuConfig={MENU_CONFIG} />
        <div class="homeContainer-mainContent">
          <RouterView />
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.homeContainer {
  display: flex;
  height: calc(100% - $header-height);
  position: relative;
  &-mainContent {
    background: $bg-gray;
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }
}
</style>
