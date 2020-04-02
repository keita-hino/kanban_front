<template>
  <v-app id="inspire">
    <Header/>
    <div class="container">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
  import Header from './components/layouts/Header'
  export default {
    data: function () {
      return {
      }
    },
    components: {
      Header
    },

  }
</script>