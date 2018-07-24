<template >
  <div class="root" ref="el" @click="setProgressBar" >
    <div class="progressed" :style="{width: 100*percent + '%'}" />
    <div class="circle" />
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
    display: flex;
    flex-direction: row;
  }

  .progressed {
    height: 3px;
    background-color: rgb(232, 116, 30);
  }

  .circle {
    background-color: rgb(232, 116, 30);
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin-top: -2px;
  }

</style>
