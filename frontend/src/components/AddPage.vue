<template>
  <div class="container">
			<div class="content">
				<div class="box">
					<input
           type="file"
           accept="audio/*"
           name="song"
           id="song"
           class=" fade inputfile inputfile-1"
           @change="getFile"
           />
					<label for="song" style="background:#343651b0 ;border-radius: 20px; ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
              <rect width="300" height="100" />
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
            </svg> <span>Choose a file&hellip;</span></label>
				</div>
			</div>

      <!-- upload button -->
      <div class="submitPart">
        <button class="fill" type="button" name="button" @click.prevent="submitFile()">
          upload
        </button>
      </div>
    <!-- alert box -->
    <div
      class="alert"

    :style="{visibility: !alert ? 'hidden' : 'visible'}">
      {{alert}}
    </div>
  </div>

</template>

<script>
  // helper
  import request from './../helper/functions/requestsHandler'
  // R
  const { R } = window

  export default {
    name: 'AddPage',

    props: {
      user: { type: String },
      wisId: { type: String },
    },

    data: () => {
      return {
        file: '',
        alert: '',
      }
    },

    methods: {
      getFile(event) {
        this.file = event.target.files[0]
        this.alert = this.file.name
      },
      validateFile() {
        const filenameArray = this.file.name.split('.')
        return R.last(filenameArray) === "mp3"
      },
      submitFile() {
        if(this.file) {
          if (this.validateFile()) {
            this.$emit('sendNotif', this.alert)
            const formData = new FormData()
            formData.append('addedBy', this.user)
            formData.append('wisId', this.wisId)
            formData.append('song', this.file);
            request.uploadAudio(formData)
              .then(() => { this.alert = 'uploaded !!!' })
            this.file= ''
          }
          else this.alert = 'invalid type of data'
        }
        else this.alert = 'no file selected'
        setTimeout(() => { this.alert = '' }, 3000)
      },
    }
  }


</script>


<style scoped>

.fade {
  display: none;
  width: 0px;
  height: 0px;
}
@font-face {
	font-weight: normal;
	font-style: normal;
	font-family: 'codropsicons';
}

*,
*:after,
*:before {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.hidden {
	position: absolute;
	overflow: hidden;
	width: 0;
	height: 0;
	pointer-events: none;
}

/* Content */

.content {
	width: 100%;
	max-width: 800px;
	text-align: center;
	margin: 0 auto;
	padding: 0 0 3em 0;
}

.content footer {
	color: #b39295;
	margin-top: 40px;
}

.content footer a:hover,
.content footer a:focus {
	color: #4b0f31;
}

.box {
	padding: 6.25rem 1.25rem;
}

.box + .box {
	margin-top: 2.5rem;
}


.js .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.inputfile + label {
    max-width: 80%;
    font-size: 1.25rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 0.625rem 1.25rem;
}

.no-js .inputfile + label {
    display: none;
}

.inputfile:focus + label,
.inputfile.has-focus + label {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
}

/* style 1 */
.inputfile-1 + label {
    color: #f1e5e6;
    background-color: #d3394c;
}

.inputfile-1:focus + label,
.inputfile-1.has-focus + label,
.inputfile-1 + label:hover {
    background-color: #722040;
}

.uploadLogo {
  width: 15%;
  /* height: 40px; */
  margin-left: 40%;
  color: blue;
  border-radius: 10px;
}
.uploadLogo:before{
  content:"→";
  position:absolute;
  left: 83%;
  opacity: 0;
  -webkit-transition: all 250ms cubic-bezier(0.680, -0.550, 0.265, 1.550);
}
.uploadLogo:hover:before{
  left:84%;
  opacity:1;
}
.uploadLogo:hover {
  width:100px;
}

.alert {
  padding-top: 20px;
  padding-bottom: 40px;
  height: 40px;
  color:White;
  text-align: center;
  border: 1px #2c3e50 solid ;
}

.container {
  background-image: linear-gradient(to bottom ,   #343651b0, #4a4a4a);
}

button {
  position: relative;
  height: 35px;
  width: 120px;
  margin: 10px 30%;
  padding: 5px 5px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 2px;
  color: #343651b0;
  border: 1px Black  solid;
  border-radius: 4px;
  text-transform: uppercase;
  outline: 0;
  overflow:hidden;
  background: none;
  z-index: 1;
  cursor: pointer;
  transition:         0.08s ease-in;
  -o-transition:      0.08s ease-in;
  -ms-transition:     0.08s ease-in;
  -moz-transition:    0.08s ease-in;
  -webkit-transition: 0.08s ease-in;
}
.fill:hover {
  color: whitesmoke;
}
.fill:before {
  content: "";
  position: absolute;
  background: #343651b0;
  bottom: 0;
  left: 0;
  right: 0;
  top: 100%;
  z-index: -1;
  -webkit-transition: top 0.09s ease-in;
}
.fill:hover:before {
  top: 0;
}

</style>
