<template>
  <div class="loginPage">
    <NavBar />
    <div class="mainPage">
      <div class="loginForm">
        <div class="formTitle">Log In</div>
        <div class="form">
          <div class="formUser">
            <p class="formLabel">Usuario:</p>
            <input type="text" ref="username" v-on:keyup.enter="checkLogin()" />
          </div>
          <div class="formPassword">
            <p class="formLabel">Contraseña:</p>
            <input
              type="password"
              name=""
              id=""
              ref="password"
              v-on:keyup.enter="checkLogin()"
            />
          </div>
          <div class="formSend">
            <button
              class="logInButton"
              @click="($event) => checkLogin()"
            >
              Login
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
    const errorLogin = ref(false);
    const errorMsg = ref("");

    function checkLogin() {
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
                  username: data[0].username,
                  password: data[0].password,
                  role: data[0].role,
                };
                store.dispatch("login", user);
                router.push("/");
              }
            } else if (
              data.length == 0 ||
              password.value.value !== originalPassword
            ) {
              errorLogin.value = true;
              errorMsg.value = "Usuario o contraseña incorrectos";
            }
          });
      }
    }

    return {
      username,
      password,
      checkLogin,
      errorLogin,
      errorMsg,
    };
  },
};
</script>

<style scoped>
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
  max-width: 12.5%;
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
  justify-content: right;
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
  font-family: Eina01,sans-serif;
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
  background-color: rgba(249, 58, 19, .32);
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
  background-image: linear-gradient(0deg, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
  bottom: 4px;
  left: 4px;
  right: 4px;
  top: 4px;
}

.logInButton:disabled {
  cursor: default;
  opacity: .24;
}
</style>
