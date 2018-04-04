<template>
  <div class="photo-preview">
    <!-- component -->
    <viewer :images="images">
      <img v-for="(src,index) in images" :src="src" :key="index">
    </viewer>
  </div>
</template>

<script>
  export default {
    name: 'photopreview',
    props:['images'],
    data() {
      return {
        // images: ['src/assets/logo.png', 'https://www.baidu.com/img/baidu_jgylogo3.gif', 'src/assets/logo.png']
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .photo-preview img{
    width: 33.333%;
    padding: 10px;
    -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
  }
</style>
