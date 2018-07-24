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
      getFile(event) {this.file = event.target.files[0]},

      submitFile() {
        const formData = new FormData();
        const domain = 'http://localhost:3000'

        formData.append('tags', this.tags)
        formData.append('addedBy', this.user)
        formData.append("wisId", this.wisId)
        formData.append("song", this.file);
        request
        .post(domain + '/uploadAudio')
        .send(formData)
        .then((res) => {console.log(res)})
        .catch((err) => {console.log(err)})
      },

    }
  }

</script>


<style scoped>
  .root {
    height: 94%;
    background-color: rgb(250, 231, 230)
  }

</style>
