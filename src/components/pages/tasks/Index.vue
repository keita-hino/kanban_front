<template>
  <v-content>
    <v-container>

    </v-container>
  </v-content>
</template>

<script>
  // Ajax通信ライブラリ
  import axios from 'axios';

  export default {
    data: function () {
      return {
        tasks: [
          {
            name: 'タスク管理用のコンポーネント追加',
            status: 'unstarted',
            start_date: '2020/03/01'
          },
          {
            name: 'デザインの修正',
            status: 'unstarted',
            start_date: '2020/03/02'
          },
          {
            name: 'vue-router導入',
            status: 'in_progress',
            start_date: '2020/03/03'
          },
          {
            name: 'vuetify導入',
            status: 'done',
            start_date: '2020/03/04'
          }
        ]
      }
    },

    methods: {
      // 登録されているユーザを取得する
      getUsers: function(){
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/users`)
          .then(response => {
            this.users = response.data.users
          });
      },
    },

    mounted: function(){
      // this.getUsers();
    },

    computed: {
    }
  }
</script>