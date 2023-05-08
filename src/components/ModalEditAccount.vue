<template>
  <div id="editAccountModal" class="editModal">
    <div class="modal-content">
      <h2 class="formTitle">Edit Profile</h2>
      <hr class="hr" />
      <div>
        <div class="formUser">
          <p class="formLabel">*Nombre de Usuario:</p>
          <input
            type="text"
            ref="newUsername"
            v-on:keyup.enter="newAccount()"
          />
        </div>
        <div class="formUser">
          <p class="formLabel">Nombre:</p>
          <input type="text" ref="newName" v-on:keyup.enter="newAccount()" />
        </div>
        <div class="formUser">
          <p class="formLabel">Apellidos:</p>
          <input type="text" ref="newSurname" v-on:keyup.enter="newAccount()" />
        </div>
      </div>
      <div class="formSend" :style="{ display: showLoginFormButton }">
        <button class="confirmButton" @click="toggleLogin()">
          Volver al Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
  overflow: auto; /* Añadir scroll si es necesario */
  background-color: rgba(0, 0, 0, 0.6); /* Fondo oscuro semi-transparente */
}

.modal-content {
  background-color: #fefefe; /* Color de fondo del contenido del modal */
  margin: 10% auto; /* Margen superior e inferior, y centrado horizontalmente */
  padding: 2%;
  border: 1px solid #888;
  width: 80%; /* Ancho del contenido del modal */
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
  margin-bottom: 1%;
}
.formSend {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.formButton {
  margin-top: 10%;
}

input[type="text"] {
  width: -webkit-fill-available;
  border: 1px solid gainsboro;
  border-radius: 5px;
  height: 35px;
  width: min-content  ;
  font-size: 16px;
  padding: 1.5% 0 1.5% 1%;
}
input[type="text"]:hover {
  background-color: rgb(250, 250, 250);
}
input[type="text"]:focus {
  background-color: rgb(250, 250, 250);
  outline: none;
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
  font-family: Eina01, sans-serif;
  font-size: 16px;
  font-weight: 800;
  justify-content: center;
  line-height: 24px;
  margin: 0;
  min-height: 64px;
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
</style>
