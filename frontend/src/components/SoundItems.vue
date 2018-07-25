<template>
  <div class="root">

    <!-- poster -->
    <template v-if="(selectedAudio  !== -1)">
      <img v-if="(!haveNotPoster()) && showPoster"
      :src="imgSrc"
      alt="poster"
      class="poster">
      <img
        v-if="(haveNotPoster()) && showPoster"
        src="./../assets/images/noposter.jpg"
        alt="poster"
        class="poster">

      <!-- choose poster shown or not -->
      <img
        src="./../assets/images/back.png"
        :class="{'up':(showPoster) , 'down': (!showPoster)}"
        @click="toggleShowPoster()"/>
    </template>

    <!-- audio player -->
    <audio-player
      v-if="selectedAudio !== -1"
      :sources="audioSrc"
      class="audioPlayer"
      @audioIsPlaying="setPlaying"
      @setAnotherAudio="setAudio"
      :autoplay='true'/>

    <!-- list of audios -->
    <div class="soundItems">
      <div v-for="(sound, index) in sounds" :key="index">
        <SoundItem
          :soundInfo="sound"
          class="soundItem"
          :index="index"
          @click="selectAudio(index, $event)"
          :selectAudio="selectedAudio"
          :soundPlaying="playing"
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
      selectedAudio: -1,
      showPoster: true,
      playing: false,
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
        this.setPlaying()
      },

      haveNotPoster(){ return (this.imgSrc == null) ? true : false},

      toggleShowPoster() { this.showPoster = !this.showPoster},

      setPlaying(event) { this.playing = !event},

      setAudio(event){if(this.checkAudiosIndex(this.selectedAudio + event)) this.selectedAudio += event},

      checkAudiosIndex(num){ return (num < this.sounds.length)&&(num > -1) ? true : false }
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
    height: 350px;
    margin: 0px auto;
  }

  .audioPlayer {
    height: 60px;
  }

  .down,.up {
    width: 30px;
    height: 30px;
    transition: transform .3s ease;
  }

  .up {
    margin: 0 auto;
    transform: rotate(90deg);
    margin-top: -30px;
  }

  .down {
    margin: 0 auto;
    transform: rotate(270deg);
  }
</style>
