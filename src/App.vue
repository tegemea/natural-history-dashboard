<template>
  <div id="app" class="container-fluid">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/UI/Header.vue'
import Footer from '@/components/UI/Footer'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  cmponents: {
    Header,
    Footer
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
