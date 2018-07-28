<template>
  <div class="root">
    <div class="buttons">
      <form
        ref='uploadForm'
        id='uploadForm'
        action='http://localhost:3000/uploadAudio'
        method='post'
        encType="multipart/form-data"
      >
        <input type="file" accept="audio/*"  name="song" id="song" class="fade" @change="getFile"/>
        <!-- select file button -->
        <label for="song" class="select">
          <p class="chooseFileText">choose file</p>
          <img src="./../assets/images/select.png" class="selectLogo">
        </label>
      </form>
      <!-- upload button -->
      <img src="./../assets/images/upload.png"  class="uploadLogo" value='Upload' @click.prevent="submitFile()"/>
    </div>

    <!-- alert box -->
    <div class="alert" :style="{visibility: alert == '' ? 'hidden' : 'visible'}"> {{alert}}</div>

  </div>
</template>


<script>

  import request from './../helper/functions/requestsHandler.js'

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
        file: '',
        alert: ''
      }
    },

    methods: {
      getFile(event) {
        this.file = event.target.files[0]
        this.alert = this.file.name
      },

      submitFile() {
        // checking wether file selected or not
        if(this.file.name){
          // checking type of file
          if (this.file.name.split('.')[this.file.name.split('.').length -1] == "mp3"){
            const formData = new FormData()
            formData.append('addedBy', this.user)
            formData.append('wisId', this.wisId)
            formData.append('song', this.file);
            request.uploadAudio(formData).then(() => {this.alert = 'uploaded !!!'})
            this.file= ''
          }
          // invalid type of data
          else{this.alert = 'invalid type of data'}
        }
        // no file selected
        else{ this.alert = 'no file selected'}

        setTimeout(() => this.alert = '', 3000)
      },

    }
  }

</script>


<style scoped>
  .root {
    height: 94%;
    background-color:  rgb(85, 81, 108);
    box-sizing: border-box;
    padding-top:20% ;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .fade {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .select {
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: center;
  }

  .uploadLogo {
    width: 60px;
    height:60px;
    margin-left: -40%;
  }

  .uploadLogo:hover {
    width: 58px;
    height:58px;
    background-color:  rgb(112, 109, 126, .5);
    padding: 1px;
    border-radius: 30px;
  }

  .selectLogo {
    width: 90px;
    height:60px;
    margin-top: -10px;
    margin-left: 15%;
  }

  .selectLogo:hover {
    background-color:  rgb(112, 109, 126, .5);
    padding: 1px;
    width: 88px;
    height:58px;
    border-radius: 3px;
  }

  .chooseFileText {
    color: rgb(255, 255, 255);
    font-size: 13px;
    margin-bottom: -18px;
    margin-left: 10%;
  }

  .alert{
    margin-top: 30%;
    background-color: rgb(172, 166, 165);
    color: rgb(16, 17, 14);
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }


</style>
