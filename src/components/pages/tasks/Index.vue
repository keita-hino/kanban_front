<template>
  <v-content>
    <v-container>
      <v-row
        class="lighten-4"
        justify="center" align-content="start"
      >
        <div id="top" class='headline font-italic font-weight-light mt-2 mb-7'>カンバンボード</div>
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
                  <span>Due {{ task.due_date }}</span>
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
                  <span>Due {{ task.due_date }}</span>
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
                  <span>Due {{ task.due_date }}</span>
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
        tasks: []
      }
    },

    components: {
      draggable
    },

    methods: {
      // 登録されているタスクを取得する
      getTasks() {
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/tasks`)
          .then(response => {
            this.tasks = response.data.tasks
          });
      },
    },

    mounted: function(){
      this.getTasks();
    },

    computed: {
    }
  }
</script>
