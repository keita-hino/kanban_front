<template>
  <v-content>
    <v-container>
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-card-text>
        <div class="layout column align-center">
          <h1 class="flex my-4">ログイン</h1>
        </div>
        </v-card-text>

        <v-container>
          <v-row>
            <v-col cols="11" class="ml-5">
              <v-text-field
                append-icon="person"
                name="login"
                label="メールアドレス"
                type="text"
                :counter="128"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="11" class="ml-5">
              <v-text-field
                append-icon="lock"
                name="password"
                label="パスワード"
                id="password"
                type="password"
                :counter="32"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <div class="my-2 pr-2">
            <v-btn @click="login" small color="primary">ログイン</v-btn>
          </div>
        </v-card-actions>

      </v-card>

    </v-container>
  </v-content>
</template>


<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        menu2: false
      }
    },

    methods: {
      // ログイン
      login() {
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/auth/sign_in`)
          .then(response => {
            // this.tasks = response.data.tasks
            // this.priorities = response.data.priorities
            // this.statuses = response.data.statuses
          });
      },
    }
  }
</script>
