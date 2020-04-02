<template>
  <div id="search-ip">
    <div>
      <div>
        <input @click="getIp" type="button" value="IPを取得">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchIp',

    data() {
      return {
        users: {}
      }
    },

    methods: {
      getIp() {
        this.axios.get('http://localhost:3000/users')
          .then((response) => {
            console.log(response.data);
          })
      }
    }
  }
</script>