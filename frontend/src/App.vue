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
  // componenets
  import Header from "./components/Header"
  import MainPage from "./components/MainPage"
  import AddPage from "./components/AddPage"
  // helper
  import webliteHandler from './helper/functions/weblite.api'
  import requests from "./helper/functions/requestsHandler"
  // W
  const { W } = window

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
        wisId: '',
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

    created() {
      W && webliteHandler(this)
      !W && this.updateData()
    },
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
