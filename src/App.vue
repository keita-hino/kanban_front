<template>
  <v-app id="inspire">
    <Header/>
    <div class="container">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
  import Header from './components/Header'
  import Store from './store'

  export default {
    data: function () {
      return {
      }
    },
    components: {
      Header
    },

    mounted(){
      if(Store.state.auth.uid == null && this.$route.name != 'Login'){
        this.$router.push({name: 'Login'})
      }
    },

  }
</script>