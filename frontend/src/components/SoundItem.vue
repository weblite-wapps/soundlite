<template>
  <div class="root" >
    <audio class="audio" controls>
      <source  :src="get()"/>
    </audio>
  </div>
</template>


<script>

  export default {
    name: 'SoundItem',

    props: {
      soundInfo: {
        type: Object
      }
    },

    methods: {
      get() { return `http://localhost:3000/downloadSound/${this.soundInfo.fileName}`},
    }

  }

</script>


<style scoped>
  .root {
    height: 65px;
  }

  .audio {
    width: 100%;
  }
</style>
