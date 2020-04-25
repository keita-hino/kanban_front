<template>
  <v-card color="grey lighten-4 mr-5 pr-5 pl-7 pb-4" width="420" min-height="800">
    <v-layout row wrap>
      <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">{{ subTitle }} <span class="blue--text lighten-2--text">{{ tasks.length }}</span></v-card-subtitle>
      <template v-if="is_task_text_hide">
        <!-- タスク追加用カード -->
        <v-card
            class="mt-2"
            width="330"
          >
          <v-card-text @click="is_task_text_hide = false" class="text-center" style="cursor: pointer">
            <v-icon class="mr-1 mb-1" color="blue lighten-2" size=15>add</v-icon>
            <span class="blue--text lighten-2--text subheading mr-2">タスク追加</span>
          </v-card-text>
        </v-card>
      </template>
      <template v-else>
        <v-card
            class="mt-2"
            width="330"
          >
          <v-card-text class="pb-0">
            <v-text-field
              v-model="task.name"
              label="タスク名"
              outlined
              :counter="50"
              :rules="nameRules"
              required
              Flat
              dense
            ></v-text-field>
          </v-card-text>

          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>

            <div class="my-2 pr-3">
              <v-btn small @click="onClickCreateCansel">キャンセル</v-btn>
            </div>

            <div class="my-2 pr-2">
              <v-btn small @click="createTask(statusKey)" :disabled="!task.name" color="primary">作成</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </template>

      <draggable
        group="myGroup"
        tag="div"
        v-bind="options"
        @update="onUpdateTaskStatus"
        @end="draggableEnd"
        :data-column-status="statusKey"
      >
        <v-card
          v-for="(task) in tasks" :key="task.id"
          @click="onDetailModalOpen(task)"
          class="mt-2"
          width="330"
        >
          <v-card-text>
            <div>#{{task.id}}</div>
            <p class="subtitle-2 text--primary">
              {{ task.name }}
            </p>
            <span v-if="!!task.due_date">Due {{ task.due_date }}</span>
          </v-card-text>
        </v-card>
      </draggable>
    </v-layout>
  </v-card>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    props: {
      // レーン名
      subTitle: {
        type: String,
      },
      // ステータスのKey
      statusKey: {
        type: String,
      },
      tasks: {
        type: Array,
      }
    },

    data() {
      return {
        is_task_text_hide: true,
        task: {},
        // draggabbleで使用するオプション
        options: {
          group: "myGroup",
          animation: 200
        },
        nameRules: [
          v => !!v || 'タスク名は必須です',
          v => !!v && v.length <= 50 || 'タスク名は50字以内で入力してください',
        ],
      }
    },

    components: {
      draggable
    },

    watch: {
      is_task_text_hide(is_task_text_hide) {
        if(!is_task_text_hide) {
          this.init()
        }
      }
    },

    methods: {
      // 初期化処理
      init() {
        this.task = {};
      },

      onUpdateTaskStatus(event) {
        this.$emit('on-update-task-status', event)
      },

      // 横に移動した時に発火
      draggableEnd(event) {
        this.$emit('on-draggable-end', event)
      },

      // 詳細モーダルを開く
      onDetailModalOpen(task) {
        this.$emit('on-detail-modal-open', task)
      },

      // タスクの新規作成
      createTask(statusKey) {
        this.is_task_text_hide = true;
        this.task.status = statusKey
        this.$emit('create-task', this.task)
      },

      // キャンセルボタンが押された時
      onClickCreateCansel() {
        this.task.name = '';
        this.is_task_text_hide = true;
      }
    }
  }
</script>
