<template>
  <div id="editAccountModal" class="editModal" :style="{display: showModal}">
    <div class="modal-content">
      <div class="title">
        <h2 class="formTitle">Editar almacen</h2>
        <hr class="hr" />
      </div>
      <div class="containerForms">
          <div class="left-container">
            <div>
              <div class="formUser">
                <p class="formLabel">Titulo:</p>
                <input
                  type="text"
                  v-model="title"
                  placeholder="Indique un titulo o nombre para su almacen a publicar"
                />
              </div>
              <hr class="hr" style="width: 90%" />
              <div class="formUser" style="margin-top: 5%">
                <p class="formLabel">Localizacion</p>
                <div style="display: flex">
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
              </div>
              <div class="formUser" style="margin-top: 5%">
                <p class="formLabel">Superficie</p>
                <div>
                  <input type="number" v-model="surfaceX" min="0" />
                  x
                  <input type="number" v-model="surfaceZ" min="0" />
                  en Metros<sup>2</sup>
                </div>
              </div>
            </div>
          </div>
          <div class="right-container">
            <div style="display: flex">
              <!-- <div class="formUser" style="height: 100%; width: 100%; margin-right: 1%;">
                <p class="formLabel">Imagen principal</p>
                <input type="file" name="" id="" ref="inputImageToUpload">
              </div> -->
              <div class="formUser" style="width: 100%; height: 100%; margin-left: 1%;">
                <p class="formLabel">Descripcion del almacen</p>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  v-model="description"
                  placeholder="Una breve descripcion de las caracteristicas de su trastero :)"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      <div class="formSend">
        <button class="cancelButton" @click="$emit('closeModal'); getUserInfo()">Cancelar</button>
        <button class="confirmButton" @click="updateInfo(); $emit('closeModal');">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { loadScript } from "vue-plugin-load-script";
import { useStore } from "vuex";
import router from "@/router";
import COMUNIDADES from "@/config/ccaa";
import PROVINCIAS from "@/config/provincias";
// import CONFIG from '@/config/db'

export default {
  props: ['storage'],
  setup(props) {
    console.log(props.storage)

    const store = useStore();
    const showModal = ref('flex')

    const comunidades = COMUNIDADES.ccaa;
    const provincias = ref();
    const showOtherSelect = ref(true);

    const title = ref();
    const surfaceX = ref("0");
    const surfaceZ = ref("0");
    const description = ref("");
    const comunidadSelected = ref("0");
    const provinciaSelected = ref("0");

    const fullLocation = ref('')

    const showModalConfirmation = ref(false);

    let user = store.getters.getUser;
    if (user != null) {
      if (store.getters.isLoggedIn == false) {
        router.replace({ path: "/" });
      }
    } else {
      router.replace({ path: "/" });
    }

    watch(comunidadSelected, (newSelected) => {
      provinciaSelected.value = "0";
      provincias.value = PROVINCIAS.provincias.filter(
        (prov) => prov.parent_code == newSelected
      );
      showOtherSelect.value = false;
    });

    function showConfirmation () {
      showModalConfirmation.value = true
      let comunidad = COMUNIDADES.ccaa.filter(com => com.code == comunidadSelected.value)
      let provincia = PROVINCIAS.provincias.filter(prov => prov.parent_code == provinciaSelected.value)
      console.log(comunidad, provincia)
      fullLocation.value = comunidad[0].label + ' ' + provincia[0].label
    }

    

    onMounted(() => {
      loadScript("https://kit.fontawesome.com/771394cdc2.js");
    });

    return {
      comunidades,
      comunidadSelected,
      provinciaSelected,
      provincias,
      showOtherSelect,
      surfaceX,
      surfaceZ,
      title,
      showModalConfirmation,
      description,
      fullLocation,
      showConfirmation,
      showModal,
    };
  }
};
</script>

<style scoped>
.editModal {
  display: none; /* Ocultar el modal por defecto */
  position: fixed; /* Posición fija para el modal */
  z-index: 1; /* Asegurarse de que el modal esté encima de todo lo demás */
  left: 0;
  top: 0;
  width: 100%; /* Ancho del modal */
  height: 100%; /* Altura del modal */
  background-color: rgba(0, 0, 0, 0.6); /* Fondo oscuro semi-transparente */
}

.modal-content {
  background-color: #fefefe; /* Color de fondo del contenido del modal */
  margin: 10% auto; /* Margen superior e inferior, y centrado horizontalmente */
  padding: 2%;
  border: 1px solid #888;
  width: min-content; /* Ancho del contenido del modal */
  display: flex;
  height: fit-content;
  width: 80%;
}
.containerForms {
  display: flex;
  margin-top: 20px;
  width: 100%;
}
.left-container {
  width: 40%;
  margin-right: 1%;
}
.right-container {
  width: 60%;
  margin-left: 1%;
}
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

.hr {
  margin-top: 0.5rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  width: auto;
  border: 0.01% solid black;
  margin-left: 0%;
  margin-right: 15%;
}
.formTitle {
  font-weight: bold;
  font-size: 2.3rem;
}
.formLabel {
  margin: 1% 0;
  font-weight: 500;
}
.formSend {
  display: flex;
  justify-content: space-evenly;
  margin: 40px 0;
}

.formButton {
  margin-top: 10%;
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
input[type="text"] {
  width: -webkit-fill-available;
  border: 1px solid gainsboro;
  border-radius: 5px;
  height: 35px;
  width: 90%;
  font-size: 16px;
  padding: 1.5% 0 1.5% 3%;
}
input[type="text"]:hover {
  background-color: rgb(250, 250, 250);
}
input[type="text"]:focus {
  background-color: rgb(250, 250, 250);
  outline: none;
}
input[type="text"]:disabled {
  background-color: rgb(225 225 225 / 63%);
}
input[type="number"] {
  border: 1px solid gainsboro;
  border-radius: 5px;
  height: 35px;
  width: 10%;
  font-size: 16px;
  padding: 1.5% 0 1.5% 3%;
}
input[type="number"]:hover {
  background-color: rgb(250, 250, 250);
}
input[type="number"]:focus {
  background-color: rgb(250, 250, 250);
  outline: none;
}
textarea {
  width: -webkit-fill-available;
  border: 1px solid gainsboro;
  border-radius: 5px;
  height: 20%;
  width: 100%;
  font-size: 16px;
  padding: 2%;
  resize: none;
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
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
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
</style>
