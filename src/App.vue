<template>
  <v-app id="inspire">
    <template v-if="!isLogined()">
      <Header/>
      <div class="container">
        <router-view/>
      </div>
    </template>

    <SideBar v-else-if="isLogined()">
      <Header/>
      <div class="container">
        <router-view/>
      </div>
    </SideBar>
  </v-app>
</template>

<script>
  import Header from './components/Header'
  import SideBar from './components/SideBar'
  import Store from './store'

  export default {
    data: function () {
      return {
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
        mini: true,
      }
    },
    components: {
      Header,
      SideBar
    },

    methods:{
      // ログインしているか
      isLogined() {
        return Store.state.auth.uid != null
      },
    },

    mounted(){
      if(Store.state.auth.uid == null && this.$route.name != 'Login'){
        this.$router.push({name: 'Login'})
      }
    },

  }
</script>