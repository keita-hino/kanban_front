<template>
  <v-content>
    <v-container>
      <v-row
        class="lighten-4"
        justify="center" align-content="start"
      >
        <div id="top" class='headline font-italic font-weight-light mt-8 mb-7'>カンバンボード</div>
      </v-row>

      <div class='d-flex'>
        <!-- TODO:列も動的に増やせるように -->
        <v-card color="grey lighten-4 mr-5 pr-5 pl-7 pb-4" min-height="800">
          <v-layout row wrap>
            <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">未着手</v-card-subtitle>
            <!-- 1列目 -->
            <draggable tag="div">
              <v-card
                v-for="(task) in tasks" :key="task.id"
                class="mt-2"
                width="330"
              >
                <v-card-text>
                  <div>#{{task.id}}</div>
                  <p class="subtitle-2 text--primary">
                    {{ task.name }}
                  </p>
                  <span>期限：{{ task.due_date }}</span>
                  <i class="material-icons">delete</i>
                </v-card-text>
              </v-card>
            </draggable>
          </v-layout>
        </v-card>

        <!-- 2列目 -->
        <v-card color="grey lighten-4 mr-5 pr-5 pl-6 pb-4" min-height="800">
          <v-layout row wrap>
            <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">着手中</v-card-subtitle>
            <draggable tag="div">
              <v-card
                v-for="(task) in tasks" :key="task.id"
                class="mt-2"
                width="330"
              >
                <v-card-text>
                  <div>#{{task.id}}</div>
                  <p class="subtitle-2 text--primary">
                    {{ task.name }}
                  </p>
                  <span class="overline">期限：{{ task.due_date }}</span>
                </v-card-text>
              </v-card>
            </draggable>
          </v-layout>
        </v-card>

        <!-- 3列目 -->
        <v-card color="grey lighten-4 mr-5 pr-6 pl-6 pb-4" min-height="800">
          <v-layout row wrap>
            <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">完了</v-card-subtitle>
            <draggable tag="div">
              <v-card
                v-for="(task) in tasks" :key="task.id"
                class="mt-2"
                width="330"
              >
                <v-card-text>
                  <div>#{{task.id}}</div>
                  <p class="subtitle-2 text--primary">
                    {{ task.name }}
                  </p>
                  <span>期限：{{ task.due_date }}</span>
                </v-card-text>
              </v-card>
            </draggable>
          </v-layout>
        </v-card>
      </div>

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
            due_date: '2020/03/20',
            display_order: 1,
          },
          {
            id: 2,
            name: 'デザインの修正',
            status: 'unstarted',
            start_date: '2020/03/02',
            due_date: '2020/03/21',
            display_order: 2
          },
          {
            id: 3,
            name: 'vue-router導入',
            status: 'in_progress',
            start_date: '2020/03/03',
            due_date: '2020/03/22',
            display_order: 1
          },
          {
            id: 4,
            name: 'vuetify導入',
            status: 'done',
            start_date: '2020/03/04',
            due_date: '2020/03/23',
            display_order: 1
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