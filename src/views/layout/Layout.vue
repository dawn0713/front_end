<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <el-scrollbar
        wrapClass="scrollbar-wrap"
        :style="{height: scrollHeight}"
        ref="scrollbarContainer">
    <div class="main-container" overflow="scroll">
      <navbar></navbar>
      <app-main></app-main>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted(){
        this.scrollHeight = window.innerHeight*0.7 + 'px';
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .el-scrollbar{
      height: 90%;
      .scrollbar-wrap {
        overflow-x: hidden;
      }
      .el-scrollbar__bar{
        
      }
}
</style>
