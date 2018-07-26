<template>
  <div class="root">
    <!-- progress bar -->
    <progressbar
      class="progressbar"
      :percent='progress'
      @setProgressbar="setProgress"
      />

    <!-- buttons -->
    <div class="buttons">
      <!-- played time -->
      <p>{{_seek}}</p>
      <!-- previos button -->
      <img @click="setAnotherAudio(-1)" class="backLogo" src='./../../assets/images/next.png'>
      <!-- play and pause button -->
      <img v-if="playing == false" @click="_togglePlayback" class="logo" src='./../../assets/images/play.png'>
      <img v-if="playing == true" @click="_togglePlayback" class="logo" src='./../../assets/images/pause.png'>
      <!-- next button -->
      <img @click="setAnotherAudio(1)" class="logo" src='./../../assets/images/next.png'>
      <!-- duration -->
      <p>{{_duration}}</p>
    </div>

  </div>
</template>

<script>

  import VueHowler from 'vue-howler'
  import Progressbar from './progressbar'

  export default {
    mixins: [VueHowler],

    components: {
      Progressbar,
    },

    methods: {
      _togglePlayback() {
        this.togglePlayback()
        this.$emit('audioIsPlaying', this.playing)
      },

      setAnotherAudio(set) {this.$emit('setAnotherAudio', set)},
    },


    computed: {
      _seek() {return this.seek>.1 ? (this.seek/60).toFixed(0) + ':' + Number(this.seek%60).toFixed(0): '0:0'},

      _duration() {return (this.duration/60).toFixed(0) + ':' + Number(this.duration%60).toFixed(0)}
    }
  }


</script>

<style scoped>
  .root {
    background: rgb(85, 81, 108);
    padding-top: 15px;
    box-sizing: border-box;
    padding-bottom: 10px;
    display: block;
  }

  .buttons {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 10%;
    padding-right: 10%;
    box-sizing: border-box;
  }

  .progressbar {
    margin: 0 auto;
    margin-bottom: 5px;
    padding: 0;
  }

  p {
    color: rgb(207, 207, 207)
  }

  .logo, .backLogo {
    width: 22px;
    height: 22px;
    transition: transform .3s ease;
    transform: rotate(360deg);
  }

  .backLogo {
    transform: rotate(180deg);
  }

</style>
