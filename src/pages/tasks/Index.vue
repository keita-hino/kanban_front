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
        <v-card color="grey lighten-4 mr-5 pr-5 pl-7 pb-4" width="420" min-height="800">
          <v-layout row wrap>
            <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">未着手</v-card-subtitle>
            <!-- タスク追加用カード -->
            <v-card
                class="mt-2"
                width="330"
              >
              <v-card-text @click="onDetailModalOpen()" class="text-center" style="cursor: pointer">
                <v-icon class="mr-1 mb-1" color="blue lighten-2" size=15>add</v-icon>
                <span class="blue--text lighten-2--text subheading mr-2">タスク追加</span>
              </v-card-text>
            </v-card>

            <!-- 1列目 -->
            <draggable
              group="myGroup"
              tag="div"
              :options="options"
              @update="onUpdateTaskStatus"
              @end="draggableEnd"
              data-column-status="unstarted"
            >
              <v-card
                v-for="(task) in unstartedTasks" :key="task.id"
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
        <v-card color="grey lighten-4 mr-5 pr-5 pl-6 pb-4" width="420" min-height="800">
          <v-layout row wrap>
            <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">着手中</v-card-subtitle>
            <!-- タスク追加用カード -->
            <v-card
                class="mt-2"
                width="330"
              >
              <v-card-text class="text-center" style="cursor: pointer">
                <v-icon class="mr-1 mb-1" color="blue lighten-2" size=15>add</v-icon>
                <span class="blue--text lighten-2--text subheading mr-2">タスク追加</span>
              </v-card-text>
            </v-card>

            <draggable
              tag="div"
              group="myGroup"
              :options="options"
              @update="onUpdateTaskStatus"
              @end="draggableEnd"
              data-column-status="in_progress"
            >
              <v-card
                v-for="(task) in inProgressTasks" :key="task.id"
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
        <v-card color="grey lighten-4 mr-5 pr-6 pl-6 pb-4" width="420" min-height="800">
          <v-layout row wrap>
            <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">完了</v-card-subtitle>

            <!-- タスク追加用カード -->
            <v-card
                class="mt-2"
                width="330"
              >
              <v-card-text class="text-center" style="cursor: pointer">
                <v-icon class="mr-1 mb-1" color="blue lighten-2" size=15>add</v-icon>
                <span class="blue--text lighten-2--text subheading mr-2">タスク追加</span>
              </v-card-text>
            </v-card>

            <draggable
              tag="div"
              group="myGroup"
              :options="options"
              @end="draggableEnd"
              @update="onUpdateTaskStatus"
              data-column-status="done"
            >
              <v-card
                v-for="(task) in doneTasks" :key="task.id"
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
    data() {
      return {
        options: {
          group: "myGroup",
          animation: 200
        },
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

      // タスクの詳細設定用モーダルを開く
      onDetailModalOpen(){
        alert('test')
      },

      // 縦に移動した時に発火
      onUpdateTaskStatus(event){
        // TODO:下記のリファクタリング
        // 該当のレーン情のタスク取得
        const status = event.from.getAttribute('data-column-status')
        let filteredTasks = this.tasks.filter( task => task.status == status )

        // 移動するタスク取得
        let movedTask = filteredTasks.find( (task,index) => index == event.oldIndex )

        // 挿入した位置の直下にあるタスク取得
        let oldTask = filteredTasks.find( (task,index) => index == event.newIndex )

        // 挿入先のdisplay_order設定
        movedTask.display_order = oldTask.display_order

        // タスクの並び更新処理
        axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks/moved_tasks`, {
          task: movedTask,
          old_display_order: movedTask.display_order
        })
        .then( response => {
          this.tasks = response.data.tasks
        });
      },

      // 横に移動した時に発火
      draggableEnd(event) {
        if(event.from.getAttribute('data-column-status') == event.to.getAttribute('data-column-status')){
          return 0
        }
        // TODO:ロジックのリファクタリング
        let status = event.from.getAttribute('data-column-status')
        let filteredTasks = this.tasks.filter( task => task.status == status )
        let findedTask = filteredTasks.find( (task, index) => index == event.oldIndex )
        findedTask.status = event.to.getAttribute('data-column-status')

        // 挿入した位置の直下にあるタスクのdisplay_order取得
        let oldStatus = event.to.getAttribute('data-column-status')
        let findOldTasks = this.tasks.filter( task => task.status == oldStatus )
        findedTask.display_order = findOldTasks.find( (task, index) => index == event.newIndex ).display_order

        // タスクの並び更新処理
        axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks/update_status_task`, {
          task: findedTask
        })
        .then( response => {
          this.tasks = response.data.tasks
        });


      }
    },

    mounted(){
      this.getTasks();
    },

    computed: {
      // 未着手のタスク取得
      unstartedTasks(){
        return this.tasks.filter( task => task.status == 'unstarted' )
      },

      // 着手中のタスク取得
      inProgressTasks(){
        return this.tasks.filter( task => task.status == 'in_progress' )
      },

      // 完了のタスク取得
      doneTasks(){
        return this.tasks.filter( task => task.status == 'done' )
      }
    }
  }
</script>
