<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@renderer/components/appHeader/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader
  },
  setup() {
    return () => (
      <div id="app">
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
