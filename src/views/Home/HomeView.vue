<template>
  <div class="home">
    <div class="navBar">
      <div class="logo">
        <img src="" alt="">
      </div>
      <div class="buttonsNav">
        <button class="AboutNavButton navButton">Acerca de nosotros</button>
        <button class="LogInNavButton navButton">Log In</button>
      </div>
      <div class="buttonSearchNav">
        <button class="SearchNavButton navButton"><i class="fa-solid fa-magnifying-glass fa-xl"></i></button>
      </div>
    </div>
    <div class="mainPage">

    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { loadScript } from "vue-plugin-load-script";

export default {
  name: 'HomeView',
  components: {
  },
  setup() {
    

    onMounted(() => {
      loadScript("https://kit.fontawesome.com/771394cdc2.js")
    })
  }
}
</script>

<style scoped>
  .home {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .navBar {
    display: flex;
    justify-content: space-between;
    padding: 1% 3% 1% 3%;
    background-color: gainsboro;
  }
  .navButton {

  }
</style>
