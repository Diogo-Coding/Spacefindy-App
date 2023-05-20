<template>
  <router-view/>
</template>

<script>
import { loadScript } from "vue-plugin-load-script";
export default {
  setup() {
    loadScript("https://kit.fontawesome.com/771394cdc2.js")
  }
}
</script>

<style>
/* html {
  overflow: hidden !important;
} */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body::-webkit-scrollbar {
  width: 12px;
  background: none;
}

body::-webkit-scrollbar-thumb {
  background-color: gainsboro;
  border-radius: 3px;
}

body::-webkit-scrollbar-thumb:hover {
  background-color: lightslategray;
}
</style>
