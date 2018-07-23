<template>
  <div class="root"  @click="soundSelected">
    <img :src="imgSrc" class="poster" alt="poster">
    <p>this is good!!!</p>
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
      imgSrc: ''
    }),

    computed: {
      audioSrc() { return `http://localhost:3000/downloadSound/${this.soundInfo.fileName}`},
    },

    created(){
      request.getAudiosImg(this.soundInfo.fileName).then(src => {this.imgSrc = src})
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
  }

  .poster {
    width: 60px;
    height: 60px;
    margin-left: 5px;
    margin-top: 2px;
    border-radius: 20px;
  }

  p{
    margin-top: 20px;
  }

</style>
