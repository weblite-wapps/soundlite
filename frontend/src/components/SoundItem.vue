<template>
  <div class="root" @click="setThisSound">
    <!-- poster -->
    <img v-if="hasPoster()" :src="imgSrc" class="poster" alt="poster" >
    <img v-if="!hasPoster()" src="./../assets/images/noposter.jpg" class="poster" alt="poster" >

    <!-- song info and animation-->
    <div class="container">
      <!-- title and artist -->
      <div class="audioInfo">
        <p class="title">{{_title}}</p>
        <p class="artist">{{_artist}}</p>
      </div>
      <!-- animation -->
      <div class="lds-grid" :style="{visibility: animationVisability ?'visible': 'hidden'}">
        <div v-for="i in 9" :key="i" />
      </div>
    </div>

  </div>
</template>


<script>
  import  request from './../helper/functions/requestsHandler'
  import bus from './../helper/functions/bus'

  export default {
    name: 'SoundItem',

    props: {
      soundInfo: {
        type: Object
      },
      index: {
        type: Number
      }
    },

    data: () => ({
      imgSrc: '',
      title: '',
      artist: '',
      playingSoundsIndex: -1,
      isPlaying: true,
    }),

    computed: {
      audioSrc() { return `http://localhost:3000/downloadSound/${this.soundInfo.fileName}`},

      _title() { return this.title == null ? "no title" : this.title},

      _artist() {return this.artist == null ? "<unknown>" : this.artist},

      animationVisability() { return this.isPlaying && this.index == this.playingSoundsIndex ? true : false}
    },

    mounted(){
      request.getAudiosImg(this.soundInfo.fileName)
        .then(obj => {this.imgSrc = obj.src, this.title = obj.title, this.artist = obj.artist})
    },

    created(){
      bus.$on("giveSoundsInfo", index => {
        this.playingSoundsIndex = index
        if(index == this.index){bus.$emit("getSoundsInfo", {imgSrc: this.imgSrc, audioSrc: this.audioSrc})}
      })

      bus.$on("setPlayingMode", playingMode => this.isPlaying = playingMode)
    },

    methods: {
      hasPoster() { return (this.imgSrc == "") ? false : true},

      setThisSound() { bus.$emit('selectNewSound', this.index)}
    },

  }

</script>

<style scoped>
  .root {
    height: 65px;
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
    color: rgb(224, 224, 224);
    font-size: 13px;
  }

  .artist {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 10px;
    color: rgb(178, 178, 179);
  }

  .audioInfo {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .container {
    width: 82%;
    display: flex;
    justify-content: space-between;
  }

</style>
