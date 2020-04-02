<template>
  <v-app id="inspire">
    <div class="container">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
  export default {
    data: function () {
      return {
        message: "vue.js動いたぞ"
      }
    },

  }
</script>