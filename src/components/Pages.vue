<template>
  <div>
    <h1>Pages</h1>
    {{ pages }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 
    }
  },
  computed: {
    ...mapGetters(['pages'])
  }
}
</script>