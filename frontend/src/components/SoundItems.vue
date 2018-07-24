<template>
  <div class="root">
    <img v-if="(selectedAudio  !== -1) && (!haveNotPoster())" :src="imgSrc" alt="poster" class="poster">
    <img v-if="(selectedAudio  !== -1) && (haveNotPoster())" src="./../assets/images/noposter.jpg" alt="poster" class="poster">
    <audio-player v-if="selectedAudio !== -1" :sources="audioSrc" class="audioPlayer"  ></audio-player>
    <div class="soundItems">
      <div v-for="(sound, index) in sounds" :key="index">
        <SoundItem
          :soundInfo="sound"
          class="soundItem"
          :index="index"
          @click="selectAudio(index, $event)"
          :selectAudio="selectedAudio"
          />
      </div>
    </div>
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
      audioSrc: [],
      selectedAudio: -1
    }),

    components: {
      SoundItem,
      AudioPlayer,
    },

    methods: {
      selectAudio(index, event) {
        this.selectedAudio = index;
        this.imgSrc = event.imgSrc
        this.audioSrc = [event.audioSrc]
      },

      haveNotPoster(){ return (this.imgSrc == null) ? true : false}

    }

  }

</script>


<style scoped>
  .root {
    height: 94%;
    background-color: rgb(74, 74, 74);
    display: flex;
    flex-direction:column;
    box-sizing: border-box;
  }

  .soundItem {
    margin-top: .6px;
    border-radius: 1px;
  }

  .soundItems {
    overflow-y: auto;
  }

  .poster {
    width: inherit;
    height: 217px;
    margin: 0px auto;
  }

  .audioPlayer {
    height: 60px;
  }
</style>
