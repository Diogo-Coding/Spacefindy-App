<template>
  <div class="navBar">
    <router-link to="/" class="logo">
      <div class="logo">
        <img src="@/assets/SpaceFindy-removebg-orange.jpeg" alt="" class="imgLogo">
        <div class="logoTitle">Spacefindy</div>
      </div>
    </router-link>
    <div></div>
    <div></div>
    <div
      class="buttonsNav"
      style="display: flex; justify-content: space-between"
    >
      <div class="buttonsNav">
        <router-link to="/about">
          <button class="AboutNavButton navButton">Acerca de nosotros</button>
        </router-link>
        <router-link to="/search">
          <button class="SearchNavButton navButton">
            <i class="fa-solid fa-magnifying-glass fa-lg"></i>
          </button>
        </router-link>
      </div>
      <div class="accountButtons">
        <router-link to="/login" v-if="!this.$store.getters.isLoggedIn"><button class="LogInNavButton navButton">Log In</button></router-link>
        <div v-if="this.$store.getters.isLoggedIn">
          <button class="LogInNavButtonIcon">
            <i class="fa-solid fa-user fa-xl"></i>
          </button>
          <div class="content">
            <div>
              <router-link to="/account">
                <button class="LogOutButtonIcon" v-if="this.$store.getters.isLoggedIn">
                  <i class="fa-solid fa-user fa-lg"></i><span style="margin-left: 5px">Perfil</span>
                </button>
              </router-link>
            </div> 
            <div>
              <button class="LogOutButtonIcon" v-if="this.$store.getters.isLoggedIn" @click="logOut()">
                <i class="fa-solid fa-right-from-bracket fa-lg" style="color: red"></i><span style="margin-left: 5px">Salir</span>
              </button>
            </div>
          </div>
        </div>
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
.content {
  display: none;
  position: absolute;
  background: white;
  border-radius: 10px;
  margin: 0 60px 0 0;
  right: -60px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  min-width: max-content;
}
.LogInNavButtonIcon:hover + .content {
  display:block;
}
.content:hover {
  display: block;
}

a {
  text-decoration: none;
  margin: 0;
}
.logo {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: rgb(253,117,28);
}
.imgLogo{
  height: 70%;
  margin-right: 5%;
  mix-blend-mode: darken;
}
.logoTitle{
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navBar {
  display: flex;
  justify-content: space-between;
  padding: 0 1%;
  background: white;
  height: min-content;
  position: absolute;
  width: 100%;
  z-index: 999999999999999999;
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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.01), 0 6px 6px rgba(0, 0, 0, 0.10);
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
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.01), 0 6px 6px rgba(0, 0, 0, 0.10);
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
