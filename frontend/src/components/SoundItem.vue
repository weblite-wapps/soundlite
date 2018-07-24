<template>
  <div class="root"  >
    <img v-if="!haveNotPoster()" :src="imgSrc" class="poster" alt="poster" @click="soundSelected">
    <img v-if="haveNotPoster()" src="./../assets/images/noposter.jpg" class="poster" alt="poster" @click="soundSelected">
    <div class="loading">
      <div class="container">
        <p class="title">{{_title}}</p>
        <p class="artist">{{_artist}}</p>
      </div>
      <div class="lds-grid" :style="{visibility: selectAudio == index ?'visible' : 'hidden'}">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
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
      },
      index: {
        type: Number
      },
      selectAudio: {
        type: Number
      }
    },

    data: () => ({
      imgSrc: '',
      size: '',
      title: '',
      artist: '',
      playing: false
    }),

    computed: {
      audioSrc() { return `http://localhost:3000/downloadSound/${this.soundInfo.fileName}`},

      _title() { return this.title == null ? "no title" : this.title},

      _artist() {return this.artist == null ? "<unknown>" : this.artist},

    },

    created(){
      request.getAudiosImg(this.soundInfo.fileName).then(obj => {
        this.imgSrc = obj.src, this.size = obj.size, this.title = obj.title, this.artist = obj.artist})
    },

    methods: {
      soundSelected(){
        this.playing = true
        this.$emit('click', {imgSrc: this.imgSrc, audioSrc: this.audioSrc})
      },

      haveNotPoster(){ return (this.imgSrc == null) ? true : false}
    }

  }

</script>

<style scoped>
  .root {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    background-color: rgb(103, 103, 103);
    box-sizing: border-box;
  }

  .poster {
    width: 50px;
    height: 50px;
    margin-left: 2%;
    margin-top: 5px;
    border-radius: 20px;
  }

  .title {
    margin-left: 10px;
    font-size: 15px;
    color: rgb(224, 224, 224);
  }

  .artist {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 10px;
    color: rgb(178, 178, 179);
  }

  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .lds-grid {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 25px;
    margin-top: 10px;
  }
  .lds-grid div {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
    animation: lds-grid 1.2s linear infinite;
  }
  .lds-grid div:nth-child(1) {
    top: 10px;
    left: 10px;
    animation-delay: 0s;
  }
  .lds-grid div:nth-child(2) {
    top: 10px;
    left: 20px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(3) {
    top: 10px;
    left: 30px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(4) {
    top: 20px;
    left: 10px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(5) {
    top: 20px;
    left: 20px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(6) {
    top: 20px;
    left: 30px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(7) {
    top: 30px;
    left: 10px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(8) {
    top: 30px;
    left: 20px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(9) {
    top: 30px;
    left: 30px;
    animation-delay: -1.6s;
  }
  @keyframes lds-grid {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  .loading {
    width: 82%;
    display: flex;
    justify-content: space-between;
  }

</style>
