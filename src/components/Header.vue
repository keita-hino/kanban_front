 <template>
  <v-app-bar
    color="blue lighten-1"
    dense
    dark
    app
  >

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

  </v-app-bar>
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
