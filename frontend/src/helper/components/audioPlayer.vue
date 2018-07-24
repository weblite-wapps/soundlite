<template>
  <div class="root">
    <progressbar
      class="progressbar"
      :percent='progress'
      @setProgressbar="setProgressbar"
      />
    <div class="buttons">
      <p>{{_seek}}</p>
      <img v-if="playing == false" @click="togglePlayback" class="logo" src='./../../assets/images/play.png'>
      <img v-if="playing == true" @click="togglePlayback" class="logo" src='./../../assets/images/pause.png'>
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
      }
    },


    computed: {
      _seek() {return (this.seek/60).toFixed(0) + ':' + this.seek.toFixed(0)%60},

      _duration() {return (this.duration/60).toFixed(0) + ':' + this.duration.toFixed(0)%60}
    }
  }


</script>

<style scoped>
  .root {
    width: inherit;
    height: 60px;
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

  .logo {
    width: 20px;
    height: 20px;
  }

</style>
