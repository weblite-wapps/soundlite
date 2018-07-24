<template >
  <div class="root" ref="el" @click="setProgressBar" >
    <div class="progressed" :style="{width: 100*percent + '%'}" />
  </div>
</template>

<script>
  export default {
    name: 'Progressbar',

    props: {
      percent: {
        type: Number
      }
    },

    methods: {
      setProgressBar(event){
        this.$emit('setProgressbar', (event.clientX-this.$refs.el.offsetLeft) / 280) // width of wapp = 350px , width of progressbar= 350px * 80% => 280
      },

    }
  }
</script>

<style scoped>
  .root {
    height: 3px;
    background-color: rgb(54, 156, 131);
    width: 80%;
    padding-left: 0;
  }

  .progressed {
    height: 3px;
    background-color: rgb(232, 116, 30)
  }

</style>
