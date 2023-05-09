<template>
  <div id="editAccountModal" class="editModal" :style="{display: showModal}">
    <div class="modal-content">
      <div class="title">
        <h2 class="formTitle">Edit Profile</h2>
        <hr class="hr" />
      </div>
      <div class="containerForms">
        <div class="left-container">
          <div>
            <div class="formUser">
              <p class="formLabel">Nombre de Usuario:</p>
              <input type="text" disabled v-model="username" />
            </div>
            <hr class="hr" style="width: 90%;"/>
            <div class="formUser" style="margin-top: 5%">
              <p class="formLabel">Nombre</p>
              <input type="text" ref="newName" v-model="name" />
            </div>
            <div class="formUser">
              <p class="formLabel">Apellidos</p>
              <input type="text" ref="newSurname" v-model="surname" />
            </div>
            <div class="formUser">
              <p class="formLabel">Email</p>
              <input
                type="email"
                ref="newEmail"
                placeholder="Introduce tu email..."
                v-model="email"
              />
            </div>
          </div>
        </div>
        <div class="right-container">
          <div class="formUser">
            <p class="formLabel">Descripcion del perfil</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="profile_desc"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="formSend">
        <button class="cancelButton" @click="$emit('closeModal'); getUserInfo()">Cancelar</button>
        <button class="confirmButton" @click="updateInfo()">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import CONFIG from "@/config/db";

export default {
  setup() {
    const store = useStore();

    const username = ref(store.getters.getUser.username);
    const name = ref();
    const surname = ref();
    const email = ref();
    const profile_desc = ref();
    const showModal = ref('flex')

    function getUserInfo() {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: store.getters.getUser.username }),
      };

      fetch(CONFIG.db[0].url + "/getUser", options)
        .then((res) => res.json())
        .then((data) => {
          name.value = data[0].name;
          surname.value = data[0].surname;
          email.value = data[0].email;
          profile_desc.value = data[0].profile_desc;
        });
    }

    function updateInfo () {
      let user = { username: store.getters.getUser.username, name: name.value, surname: surname.value, email: email.value, profile_desc: profile_desc.value }
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: store.getters.getUser.username, name: name.value, surname: surname.value, email: email.value, profile_desc: profile_desc.value }),
      };

      fetch(CONFIG.db[0].url + "/updateUser", options)
      .then(res => {
        if(res.ok) {
          store.dispatch('update', user)
        }
      })
    }
    

    if (email.value == null) email.value = "";

    onMounted(() => {
      getUserInfo()
    });

    return {
      username,
      name,
      surname,
      email,
      profile_desc,
      showModal,
      getUserInfo,
      updateInfo,
    };
  },
  emits : ['closeModal']
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
}
.containerForms {
  display: flex;
  margin-top: 20px;
  width: 100%;
}
.left-container {
  width: 300px;
}
.right-container {
  width: 250px;
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
input[type="email"] {
  width: -webkit-fill-available;
  border: 1px solid gainsboro;
  border-radius: 5px;
  height: 35px;
  width: 90%;
  font-size: 16px;
  padding: 1.5% 0 1.5% 3%;
}
input[type="email"]:hover {
  background-color: rgb(250, 250, 250);
}
input[type="email"]:focus {
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
  padding: 5%;
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
