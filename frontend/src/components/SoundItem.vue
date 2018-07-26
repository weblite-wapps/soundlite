<template>
  <div class="root" @click="soundSelected" >
    <!-- poster -->
    <img v-if="hasPoster()" :src="imgSrc" class="poster" alt="poster" >
    <img v-if="!hasPoster()" src="./../assets/images/noposter.jpg" class="poster" alt="poster" >

    <!-- song info and animation-->
    <div class="container">
      <!-- title and artist -->
      <div class="audioInfo">
        <p class="title" :style="{'fontSize': _title.length > 10 ? '13px': '15px'}">{{_title}}</p>
        <p class="artist">{{_artist}}</p>
      </div>
      <!-- animation -->
      <div class="lds-grid" :style="{visibility: (selectAudio == index) && soundPlaying ?'visible' : 'hidden'}">
        <div v-for="i in 9" :key="i">  </div>
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
      },
      soundPlaying: { // for showing animation
        type: Boolean
      }
    },

    data: () => ({
      imgSrc: '',
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
        this.imgSrc = obj.src, this.title = obj.title, this.artist = obj.artist})
    },

    watch:{
      selectAudio: function() { if(this.selectAudio == this.index){this.soundSelected()}
      }
    },

    methods: {
      soundSelected(){
        this.playing = true
        this.$emit('click', {imgSrc: this.imgSrc, audioSrc: this.audioSrc})
      },

      hasPoster(){ return (this.imgSrc == "") ? false : true}
    },

  }

</script>

<style scoped>
  .root {
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
    color: rgb(224, 224, 224);
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
