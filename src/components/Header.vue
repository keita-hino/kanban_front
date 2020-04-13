 <template>
    <!-- <v-app id="inspire"> -->
    <!-- <div> -->
      <v-app-bar
        color="blue lighten-1"
        dense
        dark
        app
      >
        <!-- TODO:下記の左側に表示されるアイコン。ただ、なぜかうまく表示されないため一旦コメントアウト -->
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

        <v-toolbar-title>Task管理</v-toolbar-title>

        <v-spacer></v-spacer>

        <span class="pr-2">{{ fullName() }}</span>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn icon>
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
              </div>
              </template>
          <span>ログアウト</span>
        </v-tooltip>

        <!-- <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
      </v-app-bar>
    <!-- </div> -->
  <!-- </v-app> -->
</template>


<script>
  import Store from '../store'
  export default {
    data: function () {
      return {
        drawer: false
      }
    },
    methods: {
      fullName(){
        return `${Store.state.auth.last_name} ${Store.state.auth.first_name}`
      }
    }
  }
</script>
