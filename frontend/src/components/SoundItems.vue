<template>
  <div class="root">
    <img :src="imgSrc" alt="poster" class="poster">
    <audio-player :sources="[audioSrc]" ></audio-player>
    <div v-for="(sound, index) in sounds" :key="index">
      <SoundItem
        :soundInfo="sound"
        class="soundItem"
        @click="selectAudio"
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
  import AudioPlayer from "./../helper/components/audioPlayer.vue"

  export default {
    name: 'SoundItems',

    props: {
      sounds:{
        type: Array
      }
    },

    data: () => ({
      imgSrc: '',
      audioSrc: ''
    }),

    components: {
      SoundItem,
      AudioPlayer,
    },

    methods: {
      addButtonClicked() {
        this.$emit("addButtonClicked")
      },

      selectAudio(event) {
        this.imgSrc = event.imgSrc
        this.audioSrc = event.audioSrc
      }
    }

  }

</script>


<style scoped>
  .root {
    height: inherit;
    background-color: rgb(227, 224, 224);
    padding-top: 1px;
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

  .poster {
    width: 348px;
    height: 217px;
    margin: 1px auto;
  }

</style>
