<template>
  <v-app id="inspire">
    <!-- <SideBar/> -->
    <v-card
      app
      class="mx-auto"
      height="300"
      width="330"
    >
      <v-navigation-drawer
        app
        permanent
        width="100%"
      >
        <v-row class="fill-height" no-gutters>
          <v-navigation-drawer
            app
            dark
            mini-variant
            mini-variant-width="56"
            permanent
          >
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
              dense
              nav
            >

              <v-list-item
                v-for="item in items"
                :key="item.title"
                @click="''"
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
          <Header/>
          <div class="container">
            <router-view/>
          </div>
        </v-row>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>

<script>
  import Header from './components/Header'
  // import SideBar from './components/SideBar'
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
      // SideBar
    },

    mounted(){
      if(Store.state.auth.uid == null && this.$route.name != 'Login'){
        this.$router.push({name: 'Login'})
      }
    },

  }
</script>