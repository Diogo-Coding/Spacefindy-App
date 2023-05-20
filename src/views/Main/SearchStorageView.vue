<template>
  <div class="searchView">
    <NavBar />
    <div class="searchBody">
      <div class="searchInput">
        <p class="formLabel">Localizacion</p>
        <div class="inputSearch">
          <select name="" id="" v-model="comunidadSelected">
            <option value="0" disabled>Indique la comunidad</option>
            <option
              v-for="(comunidad, index) in comunidades"
              :key="index"
              :value="comunidad.code"
            >
              {{ comunidad.label }}
            </option>
          </select>
          <select
            name=""
            id=""
            v-model="provinciaSelected"
            :disabled="showOtherSelect"
            style="margin-left: 1%"
          >
            <option value="0" disabled>Indique la provincia</option>
            <option
              v-for="(provincia, index) in provincias"
              :key="index"
              :value="provincia.parent_code"
            >
              {{ provincia.label }}
            </option>
          </select>
        </div>
        <div style="padding: 1%">
          <button class="confirmButton" @click="getStorages()">Buscar</button>
        </div>
      </div>
      <div class="searchResults" v-if="showResults">
        <label for="" class="label">RESULTADOS DE BUSQUEDA</label>
        <div>
          <div class="row gallery" v-if="storages.length > 0">
            <div class="col-md-4" v-for="storage, index in storages" :key="index" style="padding: 1% 2%; flex: 0 0 25%; position:relative">
              <img 
                @click="showCategorie(storage)"
                src="@/assets/basicImageStorage.jpg"
              />
              <label class="label overImage">{{ storage.title }}</label>
            </div>
          </div>
          <div class="nothingPublished" v-else>
            <div class="nothingPublishedText">Parece que no hemos podido encontrar resultados para esa busqueda, vuelve a intentarlo</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="backImage"></div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import COMUNIDADES from "@/config/ccaa";
import PROVINCIAS from "@/config/provincias";
import CONFIG from '@/config/db'
import { ref, watch } from 'vue';


export default {
  components: {
    NavBar,
  },
  setup() {
    const comunidadSelected = ref("0")
    const provinciaSelected = ref("0")
    const showOtherSelect = ref(true)

    const comunidades = ref(COMUNIDADES.ccaa)
    const provincias = ref("0")

    const storages = ref([])
    const showResults = ref(false)
    const selectedStorage = ref(null)

    const toggleCategorie = ref(false)

    watch(comunidadSelected, (newSelected) => {
      provinciaSelected.value = "0";
      provincias.value = PROVINCIAS.provincias.filter(
        (prov) => prov.parent_code == newSelected
      );
      showOtherSelect.value = false;
    });

    function getStorages () {
      if (comunidadSelected.value != 0) {
        showResults.value = false
        let prov, com
        if (comunidadSelected.value) {
          com = COMUNIDADES.ccaa.filter(com => com.code == comunidadSelected.value)[0].label
          if (provinciaSelected.value != 0) {
            prov = PROVINCIAS.provincias.filter(prov => prov.parent_code == provinciaSelected.value)[0].label
          }
        } 

        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 'ccaa': com, 'prov': prov })
        };

        fetch(CONFIG.db[0].url + "/getStoragesBySearch", options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          storages.value = data
          showResults.value = true
        })
      }
    }

    function showCategorie(storage) {
      let url = 'https://' + window.location.host + '/storage/' + storage.id
      window.open(url).focus()
    }

    return {
      comunidadSelected,
      provinciaSelected,
      showOtherSelect,
      comunidades,
      provincias,
      storages,
      showResults,
      getStorages,
      showCategorie,
      toggleCategorie,
      selectedStorage,
    }
  },
};
</script>

<style src="@/assets/bootstrap/bootstrap.min.css"></style>
<style src="@/assets/google/font.css"></style>
<style src="@/assets/bootstrap/twitterBootstrap.min.css"></style>
<style scoped>

.searchView {
  position: absolute;
  left: 0;
  top: 0;
  max-width: 100%;
  /* margin: 30px auto 30px; */
  padding: 0 !important;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.backImage {
  position: fixed;
  background-image: url('@/assets/Blog_EOY-Market-Report_Self-Storage-scaled.jpg');
  filter: blur(4px);
  -webkit-filter: blur(4px);

  /* Full height */
  height: 100%;
  width: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  z-index: 1;
  transform: scale(1.05);
}
.searchBody {
  width: 100%;
  margin-top: 70px;
  padding: 2%;
}
.searchInput {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 2%;
  background-color: rgba(255, 255, 255, 1);
}
.searchResults {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 1%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
}
.navBar {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1);
}
.inputSearch {
  display: flex;
  padding: 1%;
}
.formLabel {
  margin: 1% 0;
  font-weight: 500;
}
select {
  width: -webkit-fill-available;
  border: 1px solid gainsboro;
  border-radius: 5px;
  width: 90%;
  font-size: 16px;
  padding: 1.5% 0 1.5% 3%;
}
select:disabled {
  background-color: rgb(230, 230, 230);
}
select:disabled:hover {
  background-color: rgb(230, 230, 230);
}
select:hover {
  background-color: rgb(250, 250, 250);
}
select:focus {
  background-color: rgb(250, 250, 250);
  outline: none;
}
.gallery img {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  height: auto;
  cursor: pointer;
  max-width: 100%;
  border-radius: 10px;
}
.overImage {
  position: absolute;
  left: 15%;
  bottom: 15%;
  color: white;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2%;
  border-radius: 10px;
}

/* BUTTON CSS */
.confirmButton {
  align-items: center;
  appearance: none;
  background-clip: padding-box;
  background-color: initial;
  background-image: none;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  flex-direction: row;
  flex-shrink: 0;
  font-family: "Basier circle", -apple-system, system-ui, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1.125rem;
  font-weight: 600;
  justify-content: center;
  line-height: 24px;
  margin: 0 10px;
  min-height: 48px;
  outline: none;
  overflow: visible;
  padding: 19px 26px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: auto;
  word-break: keep-all;
  z-index: 0;
}

@media (min-width: 768px) {
  .confirmButton {
    padding: 19px 32px;
  }
}

.confirmButton:before,
.confirmButton:after {
  border-radius: 80px;
}

.confirmButton:before {
  background-color: rgba(249, 58, 19, 0.32);
  content: "";
  display: block;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
}

.confirmButton:after {
  background-color: initial;
  background-image: linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
  bottom: 4px;
  content: "";
  display: block;
  left: 4px;
  overflow: hidden;
  position: absolute;
  right: 4px;
  top: 4px;
  transition: all 100ms ease-out;
  z-index: -1;
}

.confirmButton:hover:not(:disabled):after {
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition-timing-function: ease-in;
}

.confirmButton:active:not(:disabled) {
  color: #ccc;
}

.confirmButton:active:not(:disabled):after {
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2)
    ),
    linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
  bottom: 4px;
  left: 4px;
  right: 4px;
  top: 4px;
}

.confirmButton:disabled {
  cursor: default;
  opacity: 0.24;
}

.cancelButton {
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: 80px;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle", -apple-system, system-ui, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.01), 0 6px 6px rgba(0, 0, 0, 0.1);
}

.cancelButton:hover {
  background-color: #1e293b;
  color: #fff;
}

@media (min-width: 768px) {
  .cancelButton {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
}

.label {
  padding-left: 1%;
  font-family: "Basier circle", -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 0.5rem;
}
</style>
