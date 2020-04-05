<template>
  <div>
    <v-dialog v-model="isTaskDetailModalShow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="title">タスク設定</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="task.name" label="タスク名*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="task.due_date" label="期限日"></v-text-field>
              </v-col>
              <!-- TODO:優先度も設定できるように -->
              <!-- <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col> -->

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
    },
    data() {
      return {
        task: {}
      }
    },

    methods: {
      // 登録されているタスクを取得する
      onClickSave() {
        this.task.status = this.taskStatus;
        this.$emit('on-click-task-detail-save', this.task);
      },
    }
  }
</script>
