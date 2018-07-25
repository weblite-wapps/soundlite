<template>
  <div class="root">
    <progressbar
      class="progressbar"
      :percent='progress'
      @setProgressbar="setProgressbar"
      />
    <div class="buttons">
      <p>{{_seek}}</p>
      <img @click="setAnotherAudio(-1)" class="backLogo" src='./../../assets/images/next.png'>
      <img v-if="playing == false" @click="_togglePlayback" class="logo" src='./../../assets/images/play.png'>
      <img v-if="playing == true" @click="_togglePlayback" class="logo" src='./../../assets/images/pause.png'>
      <img @click="setAnotherAudio(1)" class="logo" src='./../../assets/images/next.png'>
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
      setProgressbar(event){
        this.setProgress(event)
      },

      _togglePlayback() {
        this.togglePlayback()
        this.$emit('audioIsPlaying', this.playing)
      },

      setAnotherAudio(set) {this.$emit('setAnotherAudio', set)},
    },


    computed: {
      _seek() {return (this.seek/60).toFixed(0) + ':' + Number(this.seek%60).toFixed(0)},

      _duration() {return (this.duration/60).toFixed(0) + ':' + Number(this.duration%60).toFixed(0)}
    }
  }


</script>

<style scoped>
  .root {
    background: rgb(85, 81, 108);
    padding-top: 20px;
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
    padding: 0;
  }

  p {
    color: rgb(207, 207, 207)
  }

  .logo, .backLogo {
    width: 20px;
    height: 20px;
  }

  .backLogo {
    transition: transform .3s ease;
    transform: rotate(180deg);

  }

</style>
