<template>
  <div class="root">
    <Header
      @toggle-page="togglePage"
      :currentPage="currentPage"
    />

    <MainPage
      v-show="currentPage === 'Main'"
      :sounds="sounds"
    />

    <AddPage
      v-if="currentPage === 'Add'"
      :wisId="wisId"
      :user="username"
    />
  </div>
</template>


<script>
  import Header from "./components/Header"
  import MainPage from "./components/MainPage"
  import requests from "./helper/functions/requestsHandler"
  import AddPage from "./components/AddPage"

  export default {
    name: 'App',

    components: {
      Header,
      MainPage,
      AddPage,
    },

    data(){
      return {
        username: 'hosein',
        wisId: 1,
        sounds: [],
        currentPage: 'Main',
      }
    },

    methods: {
      togglePage(event){
        if (event == "Main") this.updateData()
        this.currentPage = event
      },

      updateData() { requests.getData(this.wisId).then(res => this.sounds = res) }
    },

    mounted(){ this.updateData()}
  }
</script>


<style scoped>
  .root {
    width: 350px;
    height: 100%;
    background-color: rgb(74, 74, 74);
    user-select: none;
  }
</style>
