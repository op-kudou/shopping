<template>
  <div id="app">
    <page-header></page-header>
    <scroll-top></scroll-top>
    <!-- 相同的请求，请求次数太多，做缓存处理 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import PageHeader from '@/components/Page-header';
import ScrollTop from '@/components/scrollTop';
export default {
  name: 'App',
  components:{
    PageHeader,
    ScrollTop,
  }
}
</script>

<style>

</style>
