<template>
  <div class="detail">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <socketTest></socketTest>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import socketTest from '@/components/socketTest.vue'

export default {
  name: 'detail',
  components: {
    // HelloWorld
    socketTest
  }
}
</script>
