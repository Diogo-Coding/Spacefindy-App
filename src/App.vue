<template>
  <router-view/>
</template>

<style>
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
