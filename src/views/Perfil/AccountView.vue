<template>
  <NavBar />
  <div class="container" style="padding-top: 70px">
    <header></header>
    <main>
      <div class="row">
        <div class="left col-lg-4">
          <div class="photo-left">
            <img
              class="photo"
              src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          </div>
          <h4 class="name">{{ username }}</h4>
          <div class="stats row">
            <div class="stat col-xs-4" style="padding-right: 50px">
              <p class="number-stat">
                {{ followers }}
              </p>
              <p class="desc-stat">Followers</p>
            </div>
            <div class="stat col-xs-4" style="padding-left: 50px">
              <p class="number-stat">0</p>
              <p class="desc-stat">Uploads</p>
            </div>
          </div>
          <p class="desc">
            {{ profile_desc }}
          </p>
          <div class="social">
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
            <i class="fa fa-twitter-square" aria-hidden="true"></i>
            <i class="fa fa-pinterest-square" aria-hidden="true"></i>
            <i class="fa fa-tumblr-square" aria-hidden="true"></i>
          </div>
        </div>
        <div class="right col-lg-8">
          <ul class="nav">
            <li class="selected" @click="changeSelected('Trasteros')" ref="trasterosNav">Trasteros</li>
            <li @click="changeSelected('Suscripciones')" ref="suscripcionesNav">Suscripciones</li>
          </ul>
          <div class="accountOptions">
            <span class="follow" @click="showEditModal()">Editar perfil</span>
            <span class="follow" @click="this.$router.replace('/account/storage/publish')">Publicar trastero</span>
            <span class="follow">Promocionar</span>
          </div>
          <div v-if="selected == 'Trasteros'">
            <div class="row gallery" v-if="storages.length > 0">
              <div class="col-md-4" v-for="storage, index in storages" :key="index">
                <img
                  src="@/assets/basicImageStorage.jpg"
                />
              </div>
            </div>
            <div class="nothingPublished" v-else>
              <div class="nothingPublishedText">Parace que no tienes ningun almacen publicado, publica uno ahora</div>
              <div style="margin-top: 20px;">
                <span class="follow" @click="this.$router.push('/account/storage/publish')" style="font-size: 30px;padding: 8px 20px;">Publicar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <ModalEditAccount
    ref="editAccountModal"
    :style="{display: showEditAccount}"
    v-on:close-modal="closeModal()"
  />
</template>

<script>
// Main Imports
import { onMounted, ref } from "vue";
import { loadScript } from "vue-plugin-load-script";
import { useStore } from "vuex";
import router from '@/router';
import CONFIG from '@/config/db'

// Components
import NavBar from "@/components/NavBar.vue";
import ModalEditAccount from "@/components/ModalEditAccount.vue";

export default {
  name: "ProfileView",
  components: {
    NavBar,
    ModalEditAccount
  },
  setup() {
    const store = useStore();

    let user = store.getters.getUser
    if(user != null) {
      if(store.getters.isLoggedIn == false) {
        router.replace({ path: '/' })
      }
    } else {
      router.replace({path : '/'})
    }
    
    let storages = ref('')

    let username = ''
    let followers = ''
    let profile_desc = ''

    function updateInfo () {
      if(store.getters.getUser != null) {
        username = store.getters.getUser.username
        followers = store.getters.getUser.followers;
        profile_desc = store.getters.getUser.profile_desc;
      }
    }

    function closeModal () {
      updateInfo()
      showEditAccount.value = 'none'
    }


    const selected = ref('Trasteros')

    const trasterosNav = ref('')
    const suscripcionesNav = ref('')
    const showEditAccount = ref('none')

    function showEditModal () {
      showEditAccount.value = 'flex'
    }

    function changeSelected (chossed) {
      if(chossed == 'Trasteros' && !trasterosNav.value.classList.contains('selected')) {
        trasterosNav.value.classList.add('selected')
        suscripcionesNav.value.classList.remove('selected')
        selected.value = chossed
      }
      else if(chossed == 'Suscripciones' && !suscripcionesNav.value.classList.contains('selected')) {
        suscripcionesNav.value.classList.add('selected')
        trasterosNav.value.classList.remove('selected')
        selected.value = chossed
      }
    }

    function getAllStorages () {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_username: store.getters.getUser.id })
      };

      fetch(CONFIG.db[0].url + "/getStoragesFromUser", options)
      .then(res => res.json())
      .then(data => {
        storages.value = data
      })
    }

    getAllStorages()
    updateInfo()

    onMounted(() => {
      loadScript("https://kit.fontawesome.com/771394cdc2.js");
    });

    return {
      username,
      followers,
      profile_desc,
      selected,
      trasterosNav,
      suscripcionesNav,
      showEditAccount,
      showEditModal,
      updateInfo,
      closeModal,
      storages,
      getAllStorages,
      changeSelected
    };
  },
};
</script>

<style src="@/assets/bootstrap/bootstrap.min.css"></style>
<style src="@/assets/google/font.css"></style>
<style src="@/assets/bootstrap/twitterBootstrap.min.css"></style>
<style scoped>
html,
body {
  background: #efefef;
  font-family: "Arial";
  overflow-y: scroll;
}

.container {
  max-width: 100%;
  /* margin: 30px auto 30px; */
  padding: 0 !important;
  width: 100%;
  background-color: #fff;
}

header {
  background: #eee;
  background-image: url("https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 250px;
}

header i {
  position: relative;
  cursor: pointer;
  right: -96%;
  top: 25px;
  font-size: 18px !important;
  color: #fff;
}

@media (max-width: 800px) {
  header i {
    right: -90%;
  }
}

main {
  padding: 20px 20px 0px 20px;
}

.left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.photo {
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 100px;
  border: 4px solid #fff;
}

.active {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: absolute;
  right: calc(50% - 70px);
  top: 50px;
  background-color: #ffc107;
  border: 3px solid #fff;
}

@media (max-width: 990px) {
  .active {
    right: calc(50% - 60px);
    top: 50px;
  }
}

.name {
  margin-top: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 18pt;
  color: #777;
}

.info {
  margin-top: -5px;
  margin-bottom: 5px;
  font-family: "Montserrat", sans-serif;
  font-size: 11pt;
  color: #aaa;
}

.stats {
  margin-top: 25px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ededed;
  font-family: "Montserrat", sans-serif;
}

.number-stat {
  padding: 0px;
  font-size: 14pt;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  color: #aaa;
}

.desc-stat {
  margin-top: -15px;
  font-size: 10pt;
  color: #bbb;
}

.desc {
  text-align: center;
  margin-top: 25px;
  margin: 25px 40px;
  color: #999;
  font-size: 11pt;
  font-family: "Montserrat", sans-serif;
  padding-bottom: 25px;
  border-bottom: 1px solid #ededed;
}

.social {
  margin: 5px 0 12px 0;
  text-align: center;
  display: inline-block;
  font-size: 20pt;
}

.social i {
  cursor: pointer;
  margin: 0 15px;
}

.social i:nth-child(1) {
  color: #4267b2;
}
.social i:nth-child(2) {
  color: #1da1f2;
}
.social i:nth-child(3) {
  color: #bd081c;
}
.social i:nth-child(4) {
  color: #36465d;
}

.right {
  padding: 0 25px 0 25px !important;
}

.nav {
  display: inline-flex;
}

.nav li {
  margin: 40px 30px 0 10px;
  cursor: pointer;
  font-size: 13pt;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: #888;
}

.nav li:hover,
.nav li.selected {
  color: #999;
  border-bottom: 2px solid #999;
}

.accountOptions {
  position: absolute;
  right: 8%;
  top: 35px;
}
.follow {
  font-size: 11pt;
  background-color: #42b1fa;
  color: #fff;
  padding: 8px 15px;
  cursor: pointer;
  transition: all 0.4s;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  margin: 2px;
}

.follow:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 990px) {
  .nav {
    display: none;
  }

  .accountOptions {
    width: 50%;
    margin-left: 25%;
    display: block;
    position: unset;
    text-align: center;
  }
}
.gallery {
  margin-top: 35px;
}

.gallery div {
  margin-bottom: 30px;
}

.gallery img {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  height: auto;
  cursor: pointer;
  max-width: 100%;
}
.nothingPublished {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
}
.nothingPublishedText {
  font-size: 13pt;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: #888;
}
</style>
