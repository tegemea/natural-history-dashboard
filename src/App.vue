<template>
  <div id="app" class="container-fluid">
    <ul class="list-unstyled">
      <li class="list-inline-item"><RouterLink to="/dashboard">Dashboard</RouterLink></li>
      <li class="list-inline-item"><RouterLink to="/pages">Pages</RouterLink></li>
      <li class="list-inline-item"><RouterLink to="/what-to-do-when">What To Do When</RouterLink></li>
      <li class="list-inline-item"><RouterLink to="/natural-adventures">Natural Adventures</RouterLink></li>
      <li class="list-inline-item"><RouterLink to="/photos">Photos</RouterLink></li>
    </ul>
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/UI/Header'
import Footer from '@/components/UI/Footer'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  cmponents: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters(['pages', 'photos', 'whatToDoWhens', 'naturalAdventures'])
  },
  mounted() {
    if(!this.pages.length) this.getPages();
    if(!this.photos.length) this.getPhotos();
    if(!this.whatToDoWhens.length) this.getWhatToDoWhens();
    if(!this.naturalAdventures.length) this.getNaturalAdventures();
  },
  methods: {
    ...mapActions(['getPages', 'getPhotos','getWhatToDoWhens','getNaturalAdventures'])
  }
}
</script>

<style>
#app {
  /*  */
}
</style>
