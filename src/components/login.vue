<template>
  <v-content>
    <v-container>

      <v-card
        class="elevation-1 pa-3 login-card"
        max-width="600"
      >
        <v-card-text>
        <div class="layout column align-center">
          <h1 class="flex my-4">ログイン</h1>
        </div>
        </v-card-text>

        <v-form ref="loginForm">
          <v-text-field
            append-icon="person"
            name="login"
            label="メールアドレス"
            type="text"
            :counter="128"
            required
          ></v-text-field>
          <v-text-field
            append-icon="lock"
            name="password"
            label="パスワード"
            id="password"
            type="password"
            :counter="32"
            required
          ></v-text-field>
        </v-form>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <div class="my-2 pr-2">
            <v-btn small color="primary">ログイン</v-btn>
          </div>
        </v-card-actions>

      </v-card>


    </v-container>
  </v-content>
</template>