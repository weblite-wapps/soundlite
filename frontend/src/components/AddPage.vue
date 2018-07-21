<template>
  <div class="root">
    <form
      ref='uploadForm'
      id='uploadForm'
      action='http://localhost:3000/uploadAudio'
      method='post'
      encType="multipart/form-data"
    >
      <input type="file" name="song" @change="getFile"/>
      <button value='Upload' @click.prevent="submitFile()">upload</button>
    </form>

    <button type="button" name="1button" @click="backClicked">back</button>

  </div>
</template>


<script>

  import request from 'superagent'

  export default {
    name: 'AddPage',

    props: {
      user: {
        type: String
      },
      wisId: {
        type: Number
      }
    },

    data: () => {
      return {
        tags: 'love', // felan nemikham poresh konam
        file: ''
      }
    },

    methods: {
      getFile(event) {
        this.file = event.target.files[0]
        console.log(this.file)
      },

      submitFile() {
        const formData = new FormData();
        const domain = 'http://localhost:3000'

        formData.append('tags', this.tags)
        formData.append('addedBy', this.user)
        formData.append("wisId", this.wisId)
        formData.append("song", this.file);
        console.log("click", formData)
        request
        .post(domain + '/uploadAudio')
        .send(formData)
        .then((res) => {console.log(res)})
        .catch((err) => {console.log(err)})
      },

      backClicked() { this.$emit('goBackClicked') },

    }
  }

</script>


<style scoped>
  .root {
    height: inherit;
    background-color: rgb(250, 231, 230)
  }

</style>
