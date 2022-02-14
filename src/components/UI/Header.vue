<template>
  <div class="row">
    <div class="col-12">
      <ul class="list-unstyled">
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/pages">Pages</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'Header'
}
</script>