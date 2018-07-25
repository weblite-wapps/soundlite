<template>
  <div class="root">
    <form
      ref='uploadForm'
      id='uploadForm'
      action='http://localhost:3000/uploadAudio'
      method='post'
      encType="multipart/form-data"
    >
      <input type="file" accept="audio/*"  name="song" id="song" class="fade" @change="getFile"/>
      <label for="song" class="select">
        <p class="chooseFile">choose file</p>
        <img src="./../assets/images/select.png" >
      </label>
    </form>
    <img src="./../assets/images/upload.png"  class="upload" value='Upload' @click.prevent="submitFile()"/>

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
        console.log(this.file.name);
        request
        .post(domain + '/uploadAudio')
        .send(formData)
        .then(() => {console.log('received')})
        .catch((err) => {console.log(err)})
      },

    }
  }

</script>


<style scoped>
  .root {
    height: 94%;
    background-color:  rgb(85, 81, 108);
    box-sizing: border-box;
  }

  .fade {
    width: 0;
    height: 0;
    visibility: hidden;
    }

  .select {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20%;
  }

  .upload {
    margin-top: 10%;
    width: 100px;
    height:100px;
    margin-left: 35%;
  }

  .chooseFile {
    color: rgb(255, 255, 255);
    margin-bottom: -40px;
    margin-left: -10px;
    font-size: 13px;
  }


</style>
