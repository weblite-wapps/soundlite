<template>
  <div class="root">
    <progressbar
      class="progressbar"
      :percent='progress'
      @setProgressbar="setProgressbar"
      />
    <div class="buttons">
      <p>{{seek.toFixed(0)}}</p>
      <button @click="togglePlayback">{{ playing ? 'Pause' : 'Play' }}</button>
      <p>{{duration.toFixed(0)}}</p>
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
    }
  }


</script>

<style scoped>
  .root {
    width: inherit;
    height: 50px;
    background: rgb(107, 101, 244);
    padding-top: 20px;
  }

  .buttons {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .progressbar {
    margin: 0 auto;
    padding: 0;
  }


</style>
