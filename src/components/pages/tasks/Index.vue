<template>
  <v-content>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-container>
  </v-content>
</template>

<script>
  // Ajax通信ライブラリ
  import axios from 'axios';

  export default {
    data: function () {
      return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Age', value: 'age' }
      ],
        users: []
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
      this.getUsers();
    },

    computed: {
    }
  }
</script>