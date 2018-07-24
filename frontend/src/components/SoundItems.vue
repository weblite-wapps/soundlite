<template>
  <div class="root">
    <img v-if="selectedAudio !== -1" :src="imgSrc" alt="poster" class="poster">
    <audio-player v-if="selectedAudio !== -1" :sources="audioSrc" ></audio-player>
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
      }
    }

  }

</script>


<style scoped>
  .root {
    height: 94%;
    background-color: rgb(74, 74, 74);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .soundItem {
    margin-top: .6px;
    border-radius: 1px;
  }

  .poster {
    width: inherit;
    height: 217px;
    margin: 0px auto;
  }

</style>
