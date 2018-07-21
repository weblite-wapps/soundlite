<template>
  <div class="root">
    <Header/>
    <SoundItems
      v-if="currentPage === 'Main' "
      :sounds="sounds"
      @addButtonClicked="togglePage('Add')"
      />
    <AddPage
      v-if="currentPage === 'Add' "
      @goBackClicked="togglePage('Main')"
      :wisId="wisId"
      :user="username"
      />
  </div>
</template>


<script>

  import Header from "./components/Header.vue"
  import SoundItems from "./components/SoundItems.vue"
  import requests from "./helper/functions/requestsHandler"
  import AddPage from "./components/AddPage.vue"

  export default {
    name: 'App',

    components: {
      Header,
      SoundItems,
      AddPage,
    },

    data(){
      return {
        username: 'hosein', // get from weblite api
        wisId: 1, // get from weblite api
        sounds: [],
        currentPage: 'Main',
      }
    },

    methods: {
      togglePage(page){
        this.currentPage = page
      }
    },

    created(){
      requests.getData(this.wisId)
        .then(res => this.sounds =  res)
    }

  }
</script>


<style scoped>
  .root {
    width: 350px;
    height: 100%;
    background-color: rgb(213, 37, 37);
  }
</style>
