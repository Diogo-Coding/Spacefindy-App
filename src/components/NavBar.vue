<template>
  <div class="navBar">
    <div class="logo">
      <!-- <img src="@/assets/SpaceFindy.png" alt="" class="imgLogo"> -->
    </div>
    <div></div>
    <div></div>
    <div
      class="buttonsNav"
      style="display: flex; justify-content: space-between"
    >
      <div class="buttonsNav">
        <button class="AboutNavButton navButton">Acerca de nosotros</button>
        <button class="SearchNavButton navButton">
          <i class="fa-solid fa-magnifying-glass fa-lg"></i>
        </button>
      </div>
      <div class="accountButtons">
        <router-link to="/login" v-if="!this.$store.getters.isLoggedIn"><button class="LogInNavButton navButton">Log In</button></router-link>
        <router-link to="/account" v-if="this.$store.getters.isLoggedIn">
          <button class="LogInNavButtonIcon">
            <i class="fa-solid fa-user fa-xl"></i>
          </button>
        </router-link>
        <button class="LogOutButtonIcon" v-if="this.$store.getters.isLoggedIn" @click="logOut()">
          <i class="fa-solid fa-right-from-bracket fa-xl" style="color: red"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import router from '@/router'

export default {
  name: 'navBar',
  setup() {
    const store = useStore()

    function logOut() {
      store.dispatch('logout')
      router.replace({path: '/'})
    }

    return {
      logOut
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  margin: 0;
}
.logo {
  height: 100%;
}
.imgLogo{
  height: 100%;
}
.navBar {
  display: flex;
  justify-content: space-between;
  padding: 0 1%;
  background: none;
  height: min-content;
}
.navButton {
  margin: 10px;
}
.accountButtons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.LogInNavButtonIcon {
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: none;
  background: none;
}
.LogInNavButtonIcon:hover {
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  color: #ff7426;
}
.LogOutButtonIcon {
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: none;
  background: none;
}
.LogOutButtonIcon:hover {
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  color: #ff7426;
}
@media (min-width: 768px) {
  .LogInNavButtonIcon {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
}


/* CSS */
.navButton {
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.navButton:hover {
  background-color: #1e293b;
  color: #fff;
}

@media (min-width: 768px) {
  .navButton {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
} 
</style>
