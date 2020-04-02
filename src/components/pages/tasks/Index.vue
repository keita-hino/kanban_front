<template>
  <v-content>
    <v-container>
      <draggable tag="ul">
        <li v-for="(task) in tasks" :key="task.id">{{task.name}}</li>
      </draggable>
    </v-container>
  </v-content>
</template>

<script>
  // Ajax通信ライブラリ
  import axios from 'axios';
  import draggable from 'vuedraggable'

  export default {
    data: function () {
      return {
        tasks: [
          {
            id: 1,
            name: 'タスク管理用のコンポーネント追加',
            status: 'unstarted',
            start_date: '2020/03/01',
            due_date: '2020/03/20'
          },
          {
            id: 2,
            name: 'デザインの修正',
            status: 'unstarted',
            start_date: '2020/03/02',
            due_date: '2020/03/21'
          },
          {
            id: 3,
            name: 'vue-router導入',
            status: 'in_progress',
            start_date: '2020/03/03',
            due_date: '2020/03/22'
          },
          {
            id: 4,
            name: 'vuetify導入',
            status: 'done',
            start_date: '2020/03/04',
            due_date: '2020/03/23'
          }
        ]
      }
    },

    components: {
      draggable
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