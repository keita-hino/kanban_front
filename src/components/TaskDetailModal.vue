<template>
  <div>
    <v-dialog v-model="isTaskDetailModalShow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="subtitle-2 font-weight-light">#{{ selectedTask.id }} 未着手</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="selectedTask.name" label="タスク名*" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedTask.due_date"
                      label="期限日"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedTask.due_date"
                    no-title
                    @input="menu2 = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12">
                <v-select v-model="selectedTask.priority"
                  :items="priorities"
                  label="優先度"
                >
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="selectedTask.detail"
                  label="詳細"
                  rows="1"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*は必須項目です</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('on-click-task-detail-cancel')">キャンセル</v-btn>
          <v-btn color="blue darken-1" text @click="onClickSave()">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      // モーダルが開いた時のコールバックメソッド
      onModalOpen: {
        type: Function,
      },
      // モーダルが閉じた時のコールバックメソッド
      onModalClose: {
        type: Function,
      },
      // OKボタン押下時のコールバックメソッド
      onClickSend: {
        type: Function,
      },
      // キャンセルボタン押下時のコールバックメソッド
      onClickCancel: {
        type: Function,
      },
      // タスク表示/非表示
      isTaskDetailModalShow: {
        type: Boolean,
      },
      // タスクのステータス
      taskStatus: {
        type: String,
      },
      // タスクの優先度のenum
      priorities: {
        type: Array
      },
      // 選択されたタスク
      selectedTask: {
        type: Object,
      }
    },
    data() {
      return {
        task: {},
        menu2: false,
      }
    },

    methods: {
      // 登録されているタスクを取得する
      onClickSave() {
        this.task.status = this.taskStatus;
        this.$emit('on-click-task-detail-save', this.selectedTask);
      },
    }
  }
</script>
