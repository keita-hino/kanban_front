<template>
  <v-content>
    <v-container>
      <v-row
        class="lighten-4"
        justify="center" align-content="start"
      >
        <div id="top" class='headline font-italic font-weight-light mt-2 mb-7'>{{ $store.getters['workspace/name'] }}</div>
      </v-row>

      <div class='d-flex'>
        <template v-for="(status, key) in statuses">
          <TaskCard
            :key="key"
            :sub-title="status"
            :status-key="key"
            :tasks="filteredTasks(key)"
            @on-update-task-status="onUpdateTaskStatus"
            @on-draggable-end="draggableEnd"
            @on-detail-modal-open="onDetailModalOpen"
            @create-task="createTask"
          />
        </template>
      </div>

      <TaskDetailModal
        @on-click-task-detail-cancel="onClickTaskDetailCancel"
        @on-click-task-detail-save="onClickTaskDetailSave"
        :is-task-detail-modal-show.sync="is_task_detail_modal_show"
        :task-status="task_status"
        :priorities="priorities"
        :selected-task="selectedTask"
        :statuses="statuses"
      />

    </v-container>
  </v-content>
</template>

<script>
  import _ from 'lodash'

  import TaskCard from '../../components/TaskCard'
  import TaskDetailModal from '../../components/TaskDetailModal'


  export default {
    data() {
      return {
        tasks: [],
        priorities: [],
        statuses: {},
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
        let workspace_id = this.getWorkspaceId()
        this.axios.get(`${process.env.VUE_APP_API_BASE_URL}/tasks`, { params: {workspace_id: workspace_id} })
          .then(response => {
            this.tasks = response.data.tasks
            this.priorities = response.data.priorities
            this.statuses = response.data.statuses
          });
      },

      // タスクの新規作成
      createTask(task) {
        let workspace_id = this.getWorkspaceId()
        // タスク新規作成
        this.axios.post(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
          task: task,
          workspace_id: workspace_id
        })
        .then( response => {
          this.is_task_text_hide = true;
          this.tasks = response.data.tasks
        });
      },

      // タスクの詳細設定用モーダルを開く
      onDetailModalOpen(task){
        this.selectedTask = _.cloneDeep(task)
        this.task_status = status;
        this.is_task_detail_modal_show = true;
      },

      onClickTaskDetailCancel(){
        this.is_task_detail_modal_show = false;
      },

      // タスク詳細設定用モーダルで保存ボタンが押された時
      onClickTaskDetailSave(task){
        // ワークスペースID取得
        let workspace_id = this.getWorkspaceId()

        // タスク更新
        this.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
          task: task,
          workspace_id: workspace_id,
        })
        .then( response => {
          this.is_task_detail_modal_show = false;
          this.tasks = response.data.tasks
        });
      },

      // 縦に移動した時に発火
      // TODO:コンポーネント側にロジックを移動してtaskを受け取るだけにする
      // TODO:下記のリファクタリング
      onUpdateTaskStatus(event){
        // ワークスペースID取得
        let workspace_id = this.getWorkspaceId()

        // 該当のレーン上のタスク取得
        const status = event.from.getAttribute('data-column-status')
        let filteredTasks = this.tasks.filter( task => task.status == status )

        // 移動するタスク取得
        let movedTask = filteredTasks.find( (task,index) => index == event.oldIndex )

        // 挿入した位置の直下にあるタスク取得
        let oldTask = filteredTasks.find( (task,index) => index == event.newIndex )

        // 挿入先のdisplay_order設定
        movedTask.display_order = oldTask.display_order

        // タスクの並び更新処理
        this.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks/moved_tasks`, {
          task: movedTask,
          old_display_order: movedTask.display_order,
          workspace_id: workspace_id,
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

        // ワークスペースID取得
        let workspace_id = this.getWorkspaceId()

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
        this.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks/update_status_task`, {
          task: findedTask,
          workspace_id: workspace_id,
        })
        .then( response => {
          this.tasks = response.data.tasks
        });

      },

      // ストアからワークスペースIDを取得する
      getWorkspaceId() {
        return this.$store.getters['workspace/id']
      },

      // ステータスでフィルタリングしたタスクを返す
      filteredTasks(key) {
        return this.tasks.filter( task => task.status == key )
      },
    },

    mounted(){
      this.getTasks();
      // TODO:ここは共通でできるようにする
      if(this.$store.state.auth.email == null && this.$route.name != 'Login'){
        this.$router.push({name: 'Login'})
      }

      // ワークスペースが変更されたら再度Taskを取得する
      this.$store.subscribe((mutation) => {
        if (mutation.type === 'workspace/setWorkspace') {
          this.getTasks();
        }}
      )
    },

    computed: {
    }
  }
</script>
