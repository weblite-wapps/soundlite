<template>
  <div class="root">
    <img
      src="./../assets/images/back.png"
      class="backButton"
      :style="visibility('Main')"
      @click="togglePage('Main')"
    />

    <p class="header">Soundlite</p>

    <img
      src="./../assets/images/add.png"
      class="addButton"
      :style="visibility('Add')"
      @click="togglePage('Add')"
    />
  </div>
</template>


<script>

  export default {
    name: 'Header',

    props: {
      currentPage: {
        type: String
      }
    },

    methods: {
      togglePage(event) {
        this.$emit('toggle-page', event)
      },

      visibility(page) { return { visibility: this.currentPage == page ? 'hidden' : 'visible' } },
    },
  }

</script>


<style scoped>
  .root {
    height: 6%;
    background: rgb(71, 70, 70);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 10px;
  }

  .header {
    font-size: 20px;
    font-family: fantasy;
    color: white;
    text-align: center;
  }

  .backButton {
    width: 15px;
    height: 15px;
  }

  .backButton:hover {
    width: 12px;
    height: 12px;
    padding: 1.5px;
    background-color: rgb(97, 95, 95);
    border-radius: 10px;
  }

  .addButton {
    width: 20px;
    height: 20px;
  }

  .addButton:hover {
    width: 17px;
    height: 17px;
    padding: 1.5px;
    background-color: rgb(97, 95, 95);
    border-radius: 10px;
  }
</style>
