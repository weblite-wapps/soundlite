<template>
  <div class="root">
    <Header
      @toggle-page="togglePage"
      :currentPage="currentPage"
    />

    <SoundItems
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
      togglePage(event){
        if(event == "Main") { this.updateData()}
        this.currentPage = event
      },

      updateData() { requests.getData(this.wisId).then(res => this.sounds = res)}
    },

    mounted(){ this.updateData()}
  }
</script>


<style scoped>
  .root {
    width: 350px;
    height: 100%;
    background-color: rgb(74, 74, 74);
  }
</style>
