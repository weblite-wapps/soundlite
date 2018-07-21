<template>
  <div class="root">
    <div v-for="(sound, index) in sounds" :key="index">
      <SoundItem
        :soundInfo="sound"
        class="soundItem"
        />
    </div>
    <button
      class="addButton"
      @click="addButtonClicked"
      type="button"
      name="button"
    >add</button>
  </div>
</template>


<script>

  import SoundItem from "./SoundItem.vue"

  export default {
    name: 'SoundItems',

    props: {
      sounds:{
        type: Array
      }
    },

    components: {
      SoundItem,
    },

    methods: {
      addButtonClicked() {
        this.$emit("addButtonClicked")
      }
    }

  }

</script>


<style scoped>
  .root {
    height: inherit;
    background-color: rgb(227, 224, 224);
    padding-top: 5px;
    /*  me added*/
    display: flex;
    flex-direction: column;
  }

  .soundItem {
    margin: 1px  1px  0 1px ;
    border-radius: 1px;
  }

  .addButton {
    margin: 0 auto;
  }

</style>
