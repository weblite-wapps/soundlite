<template>
  <div class="root">

    <!-- poster and player -->
    <template v-if="(selectedAudio  !== -1)">
      <img
        v-if="(hasPoster()) && !hiddenPosterClicked"
        :src="imgSrc"
        class="poster">
      <img
        v-if="(!hasPoster()) && !hiddenPosterClicked"
        src="./../assets/images/noposter.jpg"
        class="poster">

      <!-- choose poster shown or not -->
      <img
        src="./../assets/images/back.png"
        :class="{'down':(hiddenPosterClicked) , 'up': (!hiddenPosterClicked)}"
        @click="toggleShowPoster()"/>

      <!-- audio player -->
      <audio-player
        :sources="audioSrc"
        class="audioPlayer"
        @audioIsPlaying="setPlayingMode"
        @setAnotherAudio="setSelectedAudio"
        :autoplay='true'/>

    </template>

    <!-- list of audios -->
    <div class="soundItems">
      <div v-for="(sound, index) in sounds" :key="index">
        <SoundItem
          :soundInfo="sound"
          class="soundItem"
          :index="index"
          @click="selectAudio(index, $event)"
          :selectAudio="selectedAudio"
          :soundPlaying="oneAudioIsPlaying"
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
      hiddenPosterClicked: false,
      oneAudioIsPlaying: false,
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
        this.setPlayingMode(false)
      },

      hasPoster(){ return (this.imgSrc == "") ? false : true},

      toggleShowPoster() { this.hiddenPosterClicked = !this.hiddenPosterClicked},

      setPlayingMode(event) { this.oneAudioIsPlaying = !event},

      setSelectedAudio(event){if(this.checkAudiosIndex(this.selectedAudio + event)) this.selectedAudio += event},

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

  .soundItems::-webkit-scrollbar-track{
    	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    	background-color: #F5F5F5;
  }

  .soundItems::-webkit-scrollbar{
  	width: 5px;
  	background-color: #F5F5F5;
  }

  .soundItems::-webkit-scrollbar-thumb{
  	background-color: #000000;
  	border: 2px solid #555555;
  }

  .poster {
    width: 350px;
    height: 300px;
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
