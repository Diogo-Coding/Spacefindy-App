<template>
  <div class="storageView">
    <NavBar />
    <div class="storageBody" v-if="storage">
      <div class="mainContainer">
        <h1 class="Title">{{ storage.title }}</h1>
        <div class="storage">
          <div class="storageDetails">
            <div class="details">
              <o-field>
                <label for="" class="storageTitle">Detalles del trastero</label>
              </o-field>
              <div style="margin-left:4%">
                <o-field class="detail">
                  <label for="" class="label">&#9679; Localización: </label>
                  <label class="label" style="font-weight: unset; margin-left: 0.5%;"> {{ storage.location }}</label>
                </o-field>
                <o-field class="detail">
                  <label for="" class="label">&#9679; Superficie: </label>
                  <label class="label" style="font-weight: unset; margin-left: 0.5%;"> {{ storage.surface }} m<sup>2</sup></label>
                </o-field>
                <o-field class="detail">
                  <label for="" class="label">&#9679; Fecha de publicación: </label>
                  <label class="label" style="font-weight: unset; margin-left: 0.5%;"> {{ storage.published }}</label>
                </o-field>
              </div>
            </div>
          </div>
          <div class="storageOwner" v-if="owner">
            <o-field class="imageOwner">
              <img src="@/assets/portada-foto-perfil-redes-sociales-consejos.jpg" alt="" class="profileImage" />
            </o-field>
            <o-field>
              <label for="" class="name">{{ owner.name }}</label>
            </o-field>
            <o-field>
              <label for="" class="description">{{ owner.profile_desc }}</label>
            </o-field>
            <o-field style="margin-top:10%">
              <button class="mainButton">Contactar</button>
            </o-field>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="backImage"></div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import CONFIG from "@/config/db";

export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    const storage = ref();
    const owner = ref();

    function showStorage(id) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };

      fetch(CONFIG.db[0].url + "/getStorageById", options)
        .then((res) => res.json())
        .then((data) => {
          storage.value = data[0];
          console.log(storage.value);
          if (data) {
            const options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: storage.value.id_username }),
            };

            fetch(CONFIG.db[0].url + "/getUserFromStorage", options)
              .then((res) => res.json())
              .then((data) => {
                owner.value = data[0];
                console.log(owner.value);
              });
          }
        });
    }

    onMounted(() => {
      const id = route.params.id;
      showStorage(id);
    });

    return {
      storage,
      owner,
      showStorage,
    };
  },
};
</script>

<style scoped>
.navBar {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1);
}
.storageView {
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
.storageBody {
  width: 100%;
  margin-top: 70px;
  padding: 2%;
  display: flex;
  justify-content: center;
}
.mainContainer {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 2%;
  border-radius: 10px;
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.storage {
  display: flex;
  justify-content: space-between;
}
.storageDetails {
  width: 75%;
}
.storageOwner {
  width: fit-content;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 2% 2%;
  height: 100%;
  border-radius: 10px;
  margin-left: 3%;
}
.details {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 4%;
  border-radius: 10px;
  height: 100%;
}
.detail:not(.detail:first-child):not(.detail:last-child) {
  margin: 5% 0;
}
/* .detail:not(.detail:last-child) {
  margin: 5% 0;
} */
.label {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
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
.profileImage {
  width: 150px;
  height: 150px;
  border-radius: 100px;
  border: 14px solid #fff;
  object-fit: cover;
}
.name {
  font-size: 23px;
  font-weight: 700;
  margin: 0;
  color: rgb(39, 39, 39);
}
.description {
  font-size: 14px;
  font-weight: 600;
  margin: 1% 0 0 0;
  color: rgb(80, 80, 80);
  max-width: min-content;
}
.storageTitle {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 5% 0;
}
.Title {
  margin-bottom: 3%;
}





.mainButton {
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

.mainButton:hover {
  background-color: #1e293b;
  color: #fff;
}

@media (min-width: 768px) {
  .mainButton {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
}
</style>
