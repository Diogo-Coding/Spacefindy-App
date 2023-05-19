<template>
  <div class="home">
    <NavBar />
    <div class="mainPage">

    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar
  },
}
</script>

<style scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;
  margin: 0px;
  top: 0px;
  left: 0px;
  align-items: center;
}
.mainPage {
  height: 100%;
  background-image: url('@/assets/Blog_EOY-Market-Report_Self-Storage-scaled.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 70px;
  overflow: overlay;
}
.logo {
  height: 100%;
}
.imgLogo{
  height: 100%;
}
.navBar {
  display: flex;
  justify-content: space-between;
  padding: 0 1%;
  height: min-content;
}
.navButton {
  margin: 10px;
}
.container-1{
  height: 100%;
  width: 100%;
}
.background-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: brightness(0.5);
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
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
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
