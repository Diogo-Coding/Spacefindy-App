<template>
  <div class="loginPage">
    <NavBar class="nav"/>
    <div class="mainPage">
      <div
        class="loginForm"
        ref="loginForm"
        :style="{ display: showLoginForm }"
        style="margin-right: 5%"
      >
        <div class="formTitle">Log In</div>
        <div class="form">
          <div class="formUser">
            <p class="formLabel">Usuario:</p>
            <input
              type="text"
              ref="username"
              v-on:keyup.enter="checkLogin()"
              required
            />
          </div>
          <div class="formPassword">
            <p class="formLabel">Contraseña:</p>
            <input
              type="password"
              ref="password"
              v-on:keyup.enter="checkLogin()"
              required
            />
          </div>
          <div class="formSend">
            <button class="logInButton" @click="($event) => checkLogin()">
              Login
            </button>
          </div>
          <div v-if="errorLogin" class="errorLogin">
            {{ errorMsg }}
          </div>
        </div>
      </div>
      <div class="formSend" :style="{ display: showCreateAccountButton }">
        <button class="logInButton" @click="toggleForm()">Crear cuenta</button>
      </div>
      <div class="formSend" :style="{ display: showLoginFormButton }">
        <button class="logInButton" @click="toggleLogin()">
          Volver al Login
        </button>
      </div>
      <div
        class="loginForm"
        ref="createAccount"
        id="createAccountForm"
        :style="{ display: showCreateAccountForm }"
        style="margin-left: 5%"
      >
        <div class="formTitle">New Account</div>
        <div class="form">
          <div class="formUser">
            <p class="formLabel">*Nombre de Usuario:</p>
            <input
              type="text"
              ref="newUsername"
              v-on:keyup.enter="newAccount()"
              required
            />
          </div>
          <div class="formPassword">
            <p class="formLabel">*Contraseña:</p>
            <input
              type="password"
              ref="newPassword"
              v-on:keyup.enter="newAccount()"
              required
            />
          </div>
          <div class="formUser">
            <p class="formLabel">Nombre:</p>
            <input type="text" ref="newName" v-on:keyup.enter="newAccount()" />
          </div>
          <div class="formUser">
            <p class="formLabel">Apellidos:</p>
            <input
              type="text"
              ref="newSurname"
              v-on:keyup.enter="newAccount()"
            />
          </div>
          <div>
            <p class="aditionalInfo">
              Puedes completar tus datos mas tarde en tu perfil.
            </p>
          </div>
          <div class="formSend">
            <button class="logInButton" @click="($event) => newAccount()">
              Comenzar
            </button>
          </div>
          <div v-if="errorLogin" class="errorLogin">
            {{ errorMsg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import CONFIG from "@/config/db.js";
import router from "@/router";

export default {
  name: "HomeView",
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();

    const showCreateAccountButton = ref("flex");
    const showLoginForm = ref("flex");
    const showCreateAccountForm = ref("none");
    const showLoginFormButton = ref("none");

    // let user = store.getters.getUser
    // if(user != null) {
    //   if(!store.getters.isLoggedIn) {
    //     router.replace({path: '/'})
    //   }
    // } else {
    //   router.replace({path: '/'})
    // }

    const username = ref("");
    const password = ref("");

    const newUsername = ref("");
    const newPassword = ref("");
    const newName = ref("");
    const newSurname = ref("");

    const errorLogin = ref(false);
    const errorMsg = ref("");

    function toggleForm() {
      showLoginForm.value = "none";
      showCreateAccountButton.value = "none";
      showLoginFormButton.value = "flex";
      showCreateAccountForm.value = "flex";
      errorMsg.value = "";
      errorLogin.value = false;
      newPassword.value.style.border = "";
      newUsername.value.style.border = "";
    }

    function toggleLogin() {
      showLoginFormButton.value = "none";
      showCreateAccountForm.value = "none";
      showLoginForm.value = "flex";
      showCreateAccountButton.value = "flex";
      errorMsg.value = "";
      errorLogin.value = false;
      password.value.style.border = "";
      username.value.style.border = "";
    }

    const checkLogin = () => {
      if (username.value.value.length == 0) {
        username.value.style.border = "2px solid red";
        errorLogin.value = true;
        errorMsg.value = "Campo de usuario vacio";
      } else if (username.value.value.length > 0)
        username.value.style.border = "";
      if (password.value.value.length == 0) {
        password.value.style.border = "2px solid red";
        errorLogin.value = true;
        errorMsg.value = "Campo de contraseña vacio";
      } else if (password.value.value.length > 0)
        password.value.style.border = "";
      if (
        username.value.value.length == 0 &&
        password.value.value.length == 0
      ) {
        errorLogin.value = true;
        errorMsg.value = "Campos de login vacios";
      } else if (
        password.value.value.length > 0 &&
        username.value.value.length > 0
      ) {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username.value.value }),
        };

        fetch(CONFIG.db[0].url + "/checkLoginDB", options)
          .then((res) => res.json())
          .then((data) => {
            let originalPassword;
            if (data.length > 0) {
              originalPassword = data[0].password;
              console.log(data);
              if (password.value.value === originalPassword) {
                let user = {
                  id: data[0].id,
                  username: data[0].username,
                  password: data[0].password,
                  name: data[0].name,
                  email: data[0].email,
                  membership: data[0].membership,
                  profile_desc: data[0].profile_desc,
                  followers: data[0].followers,
                  created_at: data[0].created_at,
                };
                store.dispatch("login", user);
                router.push("/");
              } else {
                errorLogin.value = true;
                errorMsg.value = "Usuario o contraseña incorrectos";
              }
            } else if ( data.length == 0 || password.value.value !== originalPassword ) {
              errorLogin.value = true;
              errorMsg.value = "Usuario o contraseña incorrectos";
            }
          });
      }
    };

    const newAccount = () => {
      if (newUsername.value.value.length == 0) {
        newUsername.value.style.border = "2px solid red";
        errorLogin.value = true;
        errorMsg.value = "Campo de usuario vacio";
      } else if (newUsername.value.value.length > 0)
        newUsername.value.style.border = "";
      if (newPassword.value.value.length == 0) {
        newPassword.value.style.border = "2px solid red";
        errorLogin.value = true;
        errorMsg.value = "Campo de contraseña vacio";
      } else if (newPassword.value.value.length > 0)
        newPassword.value.style.border = "";
      if (
        newUsername.value.value.length == 0 &&
        newPassword.value.value.length == 0
      ) {
        errorLogin.value = true;
        errorMsg.value = "Campos de registro vacios";
      } else if (
        newPassword.value.value.length > 0 &&
        newUsername.value.value.length > 0
      ) {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: newUsername.value.value,
            password: newPassword.value.value,
            name: !newName.value.value
              ? newUsername.value.value
              : newName.value.value,
            surname: !newSurname.value.value
              ? newUsername.value.value
              : newSurname.value.value,
          }),
        };

        fetch(CONFIG.db[0].url + "/createUser", options)
          .then((res) => {
            if (res.status != 409) {
              console.log("a");
              let user;
              const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: newUsername.value.value }),
              };

              fetch(CONFIG.db[0].url + "/checkLoginDB", options)
                .then((res) => res.json())
                .then((data) => {
                  user = {
                    id: data[0].id,
                    username: data[0].username,
                    password: data[0].password,
                    name: data[0].name,
                    email: data[0].email,
                    membership: data[0].membership,
                    profile_desc: data[0].profile_desc,
                    followers: data[0].followers,
                    created_at: data[0].created_at,
                  };
                  store.dispatch("login", user);
                  router.push("/");
                });
            } else {
              errorLogin.value = true;
              errorMsg.value = "Ya existe un usuario con ese nombre de usuario";
            }
          })
          .catch((error) => {
            console.log(error);
            errorMsg.value = "Algo ocurrio en el proceso";
          });
      }
    };

    return {
      username,
      password,
      checkLogin,
      newAccount,
      errorLogin,
      errorMsg,
      showCreateAccountButton,
      showLoginForm,
      showCreateAccountForm,
      toggleForm,
      toggleLogin,
      showLoginFormButton,
      newPassword,
      newUsername,
      newName,
      newSurname,
    };
  },
};
</script>

<style scoped>
.aditionalInfo {
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
  background: rgb(238, 238, 238);
  border-radius: 10px;
  padding: 5%;
}
#createAccountFormButton {
  margin-left: 10%;
  max-width: 25%;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2% 0.5% 2% 0.5%;
}

#createAccountForm {
  max-width: 18%;
}

.loginPage {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;
  margin: 0px;
  top: 0px;
  left: 0px;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
}
.mainPage {
  height: 100%;
  background-image: url("@/assets/pexels-hasan-albari-1229861.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginForm {
  display: flex;
  padding: 2.5%;
  border-radius: 4%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  max-width: 15%;
  width: 100%;
  background-color: white;
  /* margin-right: 30%; */
  justify-content: center;
  flex-direction: column;
}
.loginLogo {
  display: flex;
  justify-content: center;
}
.logoLogin {
  max-width: 70%;
}
.errorLogin {
  margin-top: 10%;
  padding: 10% 4% 10% 4%;
  background-color: #d40000;
  color: white;
  font-weight: 600;
  text-align: center;
  border-radius: 10px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  font-size: 16px;
  padding: 2% 0 2% 5%;
}
input[type="text"]:hover {
  background-color: rgb(250, 250, 250);
}
input[type="text"]:focus {
  background-color: rgb(250, 250, 250);
  outline: none;
}

input[type="password"] {
  width: -webkit-fill-available;
  border: 1px solid gainsboro;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
  padding: 2% 0 2% 5%;
}
input[type="password"]:hover {
  background-color: rgb(250, 250, 250);
}
input[type="password"]:focus {
  background-color: rgb(250, 250, 250);
  outline: none;
}

/* CSS */
.logInButton {
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
  .logInButton {
    padding: 19px 32px;
  }
}

.logInButton:before,
.logInButton:after {
  border-radius: 80px;
}

.logInButton:before {
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

.logInButton:after {
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

.logInButton:hover:not(:disabled):after {
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition-timing-function: ease-in;
}

.logInButton:active:not(:disabled) {
  color: #ccc;
}

.logInButton:active:not(:disabled):after {
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

.logInButton:disabled {
  cursor: default;
  opacity: 0.24;
}
.nav {
  position: absolute;
  width: 100%;
  z-index: 999;
}
</style>
