<template>
  <div class="root">

    <!-- poster and player -->
    <template v-if="selectedSound !== -1">
      <img
        v-if="!hiddenPosterClicked"
        :src="hasPoster() ? imgSrc : require('./../assets/images/noposter.jpg')"
        class="poster"
      />

      <!-- choose poster shown or not -->
      <img
        src="./../assets/images/back.png"
        :class="hiddenPosterClicked ? 'down' : 'up'"
        @click="toggleShowPoster"
      />

      <!-- audio player -->
      <audio-player
        :sources="[audioSrc]"
        :html5="true"
        :autoplay='true'
        :selectedSound="selectedSound"
        class="audioPlayer"
      />
    </template>

    <!-- list of audios -->
    <div class="soundItems">
      <div v-for="(sound, index) in sounds" :key="index">
        <SoundItem
          :soundInfo="sound"
          class="soundItem"
          :index="index"
        />
        <hr/>
      </div>
    </div>
  </div>
</template>


<script>
  import SoundItem from "./SoundItem"
  import AudioPlayer from "./../helper/components/audioPlayer"
  import bus from "./../helper/functions/bus"

  export default {
    name: 'minPage',

    props: {
      sounds:{
        type: Array
      }
    },

    data: () => ({
      imgSrc: '',
      audioSrc: '',
      hiddenPosterClicked: false,
      selectedSound: -1
    }),

    components: {
      SoundItem,
      AudioPlayer,
    },

    created() {
      bus.$on("selectNewSound" , index => {
        this.ifIsValidIndex(index, () => {
          this.selectedSound = index
          bus.$emit("giveSoundsInfo", index)
        })
      })

      bus.$on("getSoundsInfo", info => {
        this.imgSrc = info.imgSrc
        this.audioSrc = info.audioSrc
      })
    },

    methods: {
      hasPoster() { return this.imgSrc },

      toggleShowPoster() { this.hiddenPosterClicked = !this.hiddenPosterClicked },

      ifIsValidIndex(num, func) { if (num < this.sounds.length && num > -1) func() },
    },
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
  margin-top: 0px;
  border-radius: 2px;
}

.soundItems {
  overflow-y: auto;
}

.soundItems::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

.soundItems::-webkit-scrollbar {
  width: 5px;
	background-color: #F5F5F5;
}

.soundItems::-webkit-scrollbar-thumb {
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

hr {
  min-height: 1px;
  max-height: 1px;
  display: block;
  background-color: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
  border-width: 0;
}
</style>
