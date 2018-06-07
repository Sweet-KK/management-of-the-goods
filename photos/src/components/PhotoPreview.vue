<template>
  <div class="photo-preview">
    <!-- component -->
    <viewer :images="images">
      <div v-for="(src,index) in images" class="inline-box">
        <img :src="src" :key="index">
      </div>
    </viewer>
  </div>
</template>

<script>
  export default {
    name: 'photopreview',
    props:{
      images:{
        type: Array,
        required: true,
      },
      showDel: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .photo-preview img{
    width: 33.333%;
    padding: 10px;
    -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
  }
  .photo-preview .inline-box{
    position: relative;
    display: inline;
  }
</style>
