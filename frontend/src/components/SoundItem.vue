<template>
  <div class="root"  @click="soundSelected">
    <img :src="imgSrc" class="poster" alt="poster">
    <div class="container">
      <p class="title">{{title}}</p>
      <p class="artist">{{artist}}</p>
    </div>

  </div>
</template>


<script>
  import  request from './../helper/functions/requestsHandler.js'

  export default {
    name: 'SoundItem',

    props: {
      soundInfo: {
        type: Object
      }
    },

    data: () => ({
      imgSrc: '',
      size: '',
      title: '',
      artist: ''
    }),

    computed: {
      audioSrc() { return `http://localhost:3000/downloadSound/${this.soundInfo.fileName}`},
    },

    created(){
      request.getAudiosImg(this.soundInfo.fileName).then(obj => {
        this.imgSrc = obj.src, this.size = obj.size, this.title = obj.title, this.artist = obj.artist})
    },

    methods: {
      soundSelected(){
        this.$emit('click', {imgSrc: this.imgSrc, audioSrc: this.audioSrc})
      }
    }

  }

</script>

<style scoped>
  .root {
    width: 100%;
    height: 65px;
    display: flex;
    flex-direction: row;
    background-color: rgb(183, 98, 251);
    box-sizing: border-box;
  }

  .poster {
    width: 60px;
    height: 60px;
    margin-left: 5px;
    margin-top: 2px;
    border-radius: 20px;
  }

  .title {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 15px;
  }

  .artist {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 10px;
    color: rgb(20, 208, 148, 0.8)
  }

  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

</style>
