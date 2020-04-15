<template>
  <v-dialog v-model="isProfileModalShow" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="sub-title">ユーザ設定</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="d-flex flex-wrap">
            <!-- <v-col cols="12" sm="6" md="6">
              <img-inputer v-model="file"
                theme="light"
                :auto-upload="true"
                placeholder="ファイルをここにドラッグする"
                bottom-text="ファイルをドロップするかここをクリックしてください" />
            </v-col> -->
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="姓*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="名*" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field label="メールアドレス*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- TODO:目のアイコンを設置して見えるようにする -->
              <v-text-field label="パスワード" type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small class="red--text lighten-1--text">*は必須項目です</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="isProfileModalShow = false">閉じる</v-btn>
        <v-btn color="blue darken-1" text @click="isProfileModalShow = false">変更</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  // import ImgInputer from 'vue-img-inputer'
  // import 'vue-img-inputer/dist/index.css'
  export default {
    props: {
      // モーダル表示/非表示
      isProfileModalShow: {
        type: Boolean,
      }
    },

    data() {
      return {
        file: '',
      }
    },

    components: {
      // ImgInputer
    },
  }
</script>>