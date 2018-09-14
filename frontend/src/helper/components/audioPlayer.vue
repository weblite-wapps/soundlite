<template>
  <div class="root">
    <!-- progress bar -->
    <progressbar
      class="progressbar"
      :percent='progress'
      @setProgressbar="setProgress"
    />
    <!-- goToNext="goToNext" -->
    <!-- buttons -->
    <div class="buttons">
      <!-- played time -->
      <p>{{_seek}}</p>
      <!-- previos button -->
      <img @click="selectNewSound(-1)" class="backLogo" src='./../../assets/images/next.png'>
      <!-- play and pause button -->
      <img
        @click="togglePlayback"
        class="logo"
        :src="playing ? require('./../../assets/images/pause.png') : require('./../../assets/images/play.png')"
      />
      <!-- next button -->
      <img @click="selectNewSound(1)" class="logo" src='./../../assets/images/next.png'>
      <!-- duration -->
      <p>{{_duration}}</p>
    </div>

  </div>
</template>

<script>
  import VueHowler from 'vue-howler'
  import Progressbar from './progressbar'
  import bus from './../functions/bus'

  export default {
    mixins: [VueHowler],

    props: {
      selectedSound: { type: Number },
    },

    components: {
      Progressbar,
    },

    methods: {
      makeTowDigit(num) {return num > 9 ? num : `0${num}`},

      selectNewSound(num) { bus.$emit('selectNewSound', this.selectedSound + num) },

    },

    computed: {
      _seek() { return this.seek > 0.1 ? (this.seek / 60) - (this.seek / 60) % 1 + ':' + this.makeTowDigit((this.seek % 60).toFixed(0)): '0:00' },

      _duration() { return (this.duration / 60) - (this.duration / 60) % 1 + ':' + this.makeTowDigit((this.duration % 60).toFixed(0)) },
    },

    watch: {
      playing() { bus.$emit("setPlayingMode", this.playing) },
      seek: function() {if (this.duration - this.seek < 1) {this.selectNewSound(1)}},
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
