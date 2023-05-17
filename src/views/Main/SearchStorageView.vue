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
        <button class="buttonSearch" @click="getStorages()">Buscar</button>
      </div>
      <div class="searchResults" v-if="showResults">
        <div>
          <div class="row gallery" v-if="storages.length > 0">
            <div class="col-md-4" v-for="storage, index in storages" :key="index" style="padding: 2%">
              <img
                src="@/assets/basicImageStorage.jpg"
              />
            </div>
          </div>
          <div class="nothingPublished" v-else>
            <div class="nothingPublishedText">Parece que no hemos podido encontrar resultados para esa busqueda, vuelve a intentarlo</div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

    watch(comunidadSelected, (newSelected) => {
      provinciaSelected.value = "0";
      provincias.value = PROVINCIAS.provincias.filter(
        (prov) => prov.parent_code == newSelected
      );
      showOtherSelect.value = false;
    });

    function getStorages () {
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

    return {
      comunidadSelected,
      provinciaSelected,
      showOtherSelect,
      comunidades,
      provincias,
      storages,
      showResults,
      getStorages
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
  background-color: #fff;
}
.searchBody {
  width: 100%;
  height: 100%;
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
}
.searchResults {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  padding: 1%;
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
}
</style>
