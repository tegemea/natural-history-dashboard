<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '@/components/UI/Header'

export default {
  name: 'App',
  cmponents: {
    Header
  },
  computed: {
    ...mapGetters(['pages'])
  },
  mounted() {
    this.getPages();
  },
  methods: {
    ...mapActions(['getPages'])
  }
}
</script>

<style>
#app {
  /*  */
}
</style>
