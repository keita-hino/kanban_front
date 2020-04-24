<template>
  <v-card
    app
    class="mx-auto"
    height="300"
    width="330"
  >
    <v-navigation-drawer
      app
      permanent
      width="100%"
    >
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer
          app
          dark
          mini-variant
          mini-variant-width="56"
          permanent
        >

          <v-divider></v-divider>

          <v-list
            dense
            nav
            class="pt-0"
          >

          <v-list-item-action>
            <v-avatar
              v-for="workspace in workspaces" :key="workspace.id"
              size="36"
              :tile="true"
              class="mb-4 avator"
              v-ripple
              @click="onClickWorkspace(workspace)"
            >
              <img
                :src="imageUrl(workspace.image_url)"
                alt="John"
                @click="''"
              >
            </v-avatar>
          </v-list-item-action>

            <!-- <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="''"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list>
        </v-navigation-drawer>
        <slot/>
      </v-row>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  // Ajax通信ライブラリ
  import axios from 'axios';

  export default {
    data () {
      return {
        workspaces: {},
        // TODO:あとで削除
        drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
      }
    },

    mounted() {
      this.getWorkspaces();
    },

    methods: {
      // ユーザーが所属しているワークスペースを取得する
      getWorkspaces() {
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/workspaces`, {params: { uid: this.$store.state.auth.uid }})
          .then(response => {
            this.workspaces = response.data.workspaces
          });
      },

      // ワークスペースが選択された時
      onClickWorkspace(workspace){
        this.$store.commit('workspace/setWorkspace', workspace);
      },

      // 画像のパスを整形する
      imageUrl(image_url){
        return `${process.env.VUE_APP_BASE_URL}/${image_url}`
      }

    }
  }
</script>

<style>
  .avator{
    cursor: pointer;
    cursor: hand;
  }
</style>