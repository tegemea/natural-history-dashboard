<template>
  <div id="app" class="container-fluid">
    <ul class="list-unstyled">
      <li class="list-inline-item"><RouterLink to="/dashboard">Dashboard</RouterLink></li>
      <li class="list-inline-item"><RouterLink to="/pages">Pages</RouterLink></li>
      <li class="list-inline-item"><RouterLink to="/what-to-do-when">What To Do When</RouterLink></li>
      <li class="list-inline-item"><RouterLink to="/natural-adventures">Natural Adventures</RouterLink></li>
    </ul>
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/UI/Header'
import Footer from '@/components/UI/Footer'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  cmponents: {
    Header,
    Footer
  },
  mounted() {
    this.getPages();
    this.getWhatToDoWhens();
    this.getNaturalAdventures();
  },
  methods: {
    ...mapActions(['getPages','getWhatToDoWhens','getNaturalAdventures'])
  }
}
</script>

<style>
#app {
  /*  */
}
</style>
