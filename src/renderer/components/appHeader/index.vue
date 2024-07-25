<script lang="tsx">
// import { User, Setting, Minus } from 'element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
// import { useI18n } from 'vue-i18n'

const {
  electron: { ipcRenderer }
} = window

export default defineComponent({
  name: 'AppHeader',
  setup() {
    // const { t } = useI18n()
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
    // // const handleSetting = () => {}
    // return () => (
    //   <div class="AppHeader">
    //     <div class="AppHeader-left" style="-webkit-app-region: drag;">
    //       <span>{t('appTitle')}</span>
    //     </div>
    //     <div class="AppHeader-right">
    //       <i class="iconfont icon-setting" />
    //       <i class="iconfont icon-user" />
    //       <span>|</span>
    //       <i onClick={handleMin} class="iconfont icon-minus-bold" />
    //       <i
    //         onClick={handleRestore}
    //         class={`iconfont ${isMax.value ? 'icon-window-restore' : 'icon-window-maximize'}`}
    //       />
    //       <i onClick={handleClose} class="iconfont icon-close" />
    //     </div>
    //   </div>
    // )
    return {
      isMax,
      handleMin,
      handleRestore,
      handleClose
    }
  }
})
</script>

<template>
  <div class="AppHeader">
    <div class="AppHeader-left" style="-webkit-app-region: drag">
      <span>{{ $t('appTitle') }}</span>
    </div>
    <div class="AppHeader-right">
      <i class="iconfont icon-setting" />
      <i class="iconfont icon-user" />

      <span>|</span>
      <i class="iconfont icon-minus-bold" @click="handleMin" />
      <i
        :class="[isMax ? 'iconfont icon-window-restore' : 'iconfont icon-window-maximize']"
        @click="handleRestore"
      />
      <i class="iconfont icon-close" @click="handleClose" />
    </div>
  </div>
</template>

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
