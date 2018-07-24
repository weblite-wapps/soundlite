<template>
  <div class="root">
    <button type="back" name="back" @click="togglePage('Main')">back</button>
    <p>Sound Lite</p>
    <button type="add" name="add" @click="togglePage('Add')">add</button>
  </div>
</template>


<script>

  export default {
    name: 'Header',

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
    background: rgb(77, 140, 29);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    font-size: 20px;
    font-family: fantasy;
    color: white;
    text-align: center;
  }

</style>
