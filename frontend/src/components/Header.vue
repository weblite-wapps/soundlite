<template>
  <div class="root">
    <img src="./../assets/images/back.png" class="backButton" :style="{visibility: currentPage == 'Add' ? 'visible' :'hidden'}" @click="togglePage('Main')"/>
    <p>Sound Lite</p>
    <img src="./../assets/images/add.png" class="addButton" :style="{visibility: currentPage == 'Add' ?'hidden':'visible'}" @click="togglePage('Add')"/>
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
    }
  }

</script>


<style scoped>
  .root {
    width: inherit;
    height: 6%;
    background: rgb(71, 70, 70);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 10px;
  }

  p {
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
    padding: 2px;
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
    padding: 2px;
    background-color: rgb(97, 95, 95);
    border-radius: 18px;

  }


</style>
