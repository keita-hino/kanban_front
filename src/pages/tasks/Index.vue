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
        <!-- TODO:ここもループでできるように -->
        <TaskCard
          :sub-title="'未着手'"
          :status-key="'unstarted'"
          :tasks="unstartedTasks"
          @on-update-task-status="onUpdateTaskStatus"
          @on-draggable-end="draggableEnd"
          @on-detail-modal-open="onDetailModalOpen"
          @create-task="createTask"
        />

        <TaskCard
          :sub-title="'着手中'"
          :status-key="'in_progress'"
          :tasks="inProgressTasks"
          @on-update-task-status="onUpdateTaskStatus"
          @on-draggable-end="draggableEnd"
          @on-detail-modal-open="onDetailModalOpen"
          @create-task="createTask"
        />

        <TaskCard
          :sub-title="'完了'"
          :status-key="'done'"
          :tasks="doneTasks"
          @on-update-task-status="onUpdateTaskStatus"
          @on-draggable-end="draggableEnd"
          @on-detail-modal-open="onDetailModalOpen"
          @create-task="createTask"
        />

      </div>

      <TaskDetailModal
        @on-click-task-detail-cancel="onClickTaskDetailCancel"
        @on-click-task-detail-save="onClickTaskDetailSave"
        :is-task-detail-modal-show.sync="is_task_detail_modal_show"
        :task-status="task_status"
        :priorities="priorities"
        :selected-task="selectedTask"
      />

    </v-container>
  </v-content>
</template>

<script>
  // Ajax通信ライブラリ
  import axios from 'axios';
  import TaskCard from '../../components/TaskCard'
  import TaskDetailModal from '../../components/TaskDetailModal'

  export default {
    data() {
      return {
        tasks: [],
        // task: {},
        priorities: [],
        // タスク詳細設定用モーダルを表示するかどうか
        is_task_detail_modal_show: false,
        is_task_text_hide: true,
        selectedTask: {},
        // タスク詳細設定用モーダルに渡す用のタスクステータス
        task_status: ''
      }
    },

    components: {
      TaskCard,
      TaskDetailModal
    },

    methods: {
      // 登録されているタスクを取得する
      getTasks() {
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/tasks`)
          .then(response => {
            this.tasks = response.data.tasks
            this.priorities = response.data.priorities
          });
      },

      // タスクの新規作成
      createTask(task) {
        // タスク新規作成
        axios.post(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
          task: task,
        })
        .then( response => {
          this.is_task_text_hide = true;
          this.tasks = response.data.tasks
        });
      },

      // タスクの詳細設定用モーダルを開く
      onDetailModalOpen(task){
        this.selectedTask = JSON.parse(JSON.stringify(task));
        this.task_status = status;
        this.is_task_detail_modal_show = true;
      },

      onClickTaskDetailCancel(){
        this.is_task_detail_modal_show = false;
      },

      // タスク詳細設定用モーダルで保存ボタンが押された時
      onClickTaskDetailSave(task){
        // タスク更新
        axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
          task: task,
        })
        .then( response => {
          this.is_task_detail_modal_show = false;
          this.tasks = response.data.tasks
        });
      },

      // 縦に移動した時に発火
      // TODO:コンポーネント側にロジックを移動してtaskを受け取るだけにする
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
      // TODO:コンポーネント側にロジックを移動してtaskを受け取るだけにする
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
