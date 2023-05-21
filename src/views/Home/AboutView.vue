<template>
  <div class="home">
    <NavBar />

    <div class="aboutPage">
      <div class="homeMain-image">
        <img
          src="@/assets/cropped.3_to_1.jpg"
          alt="background-image"
          class="homeMain-image"
        />
      </div>

      <header>
        <h1 style="text-align: center">ACERCA DE NOSOTROS</h1>
      </header>

      <main>
        <section>
          <h2>Nuestra empresa</h2>

          <p>
            Somos una empresa dedicada a brindar soluciones de almacenamiento
            seguro y confiable a nuestros clientes. Con una amplia experiencia
            en el sector, nos enorgullece ofrecer un sistema de alquiler de
            trasteros eficiente y conveniente.
          </p>
        </section>

        <section>
          <h2>Nuestro objetivo</h2>

          <p>
            Nuestro principal objetivo es proporcionar a nuestros clientes un
            servicio de alquiler de trasteros que sea cómodo, seguro y flexible.
            Nos esforzamos por satisfacer las necesidades individuales de cada
            cliente, ofreciendo opciones de almacenamiento que se adapten a
            diferentes tamaños, precios y requisitos.
          </p>
        </section>

        <section>
          <h2>Equipo profesional</h2>

          <p>
            Contamos con un equipo altamente capacitado y comprometido que se
            encarga de garantizar una experiencia positiva para nuestros
            clientes. Nuestro personal está disponible para brindar asistencia
            personalizada, responder preguntas y ayudar en el proceso de reserva
            de trasteros.
          </p>
        </section>

        <section>
          <h2>Valores fundamentales</h2>

          <ul>
            <li>
              Compromiso con la seguridad: Nuestros trasteros cuentan con
              sistemas de seguridad avanzados para garantizar la protección de
              los bienes de nuestros clientes.
            </li>

            <li>
              Excelencia en el servicio al cliente: Nos esforzamos por brindar
              un servicio al cliente excepcional, escuchando activamente las
              necesidades y preocupaciones de nuestros clientes.
            </li>

            <li>
              Flexibilidad y conveniencia: Ofrecemos opciones flexibles de
              alquiler y facilidades para adaptarnos a las necesidades
              cambiantes de nuestros clientes.
            </li>

            <li>
              Transparencia y confiabilidad: Nos comprometemos a ser
              transparentes en nuestras políticas, precios y condiciones de
              alquiler, brindando confiabilidad en cada interacción.
            </li>
          </ul>
        </section>
      </main>
    </div>
    <div class="contain">
        <div class="col">
          <h3>SpaceFindy</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Sobre Nosotros</a></li>
          </ul>
        </div>
        <div class="col">
          <h3>Tipos de espacios</h3>
          <ul>
            <li>
              <a
                href="/search"
                >Alquilar trasteros particulares</a
              >
            </li>
          </ul>
        </div>
        <div class="col">
          <h3>Alquilar trasteros</h3>
          <ul>
            <li><a href="/search">Trasteros</a></li>
            <li><a href="/search/13">Trasteros en Madrid</a></li>
            <li>
              <a href="/search/09/08">Trasteros en Barcelona</a>
            </li>
            <li><a href="/search/09">Trasteros en Santa Cruz de Tenerife</a></li>
            <li><a href="/search/01/41">Trasteros en Las Palmas de Gran Canaria</a></li>
          </ul>
        </div>
        <br>
        <div data-v-2a72d595 class="v-card__text">
          <div data-v-2a72d595 style="color: white">
            2023 —
            <strong data-v-2a72d595="">SpaceFindy S.A.</strong> Todos
            los derechos reservados
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.contain {
  background-color: #33383a;
  color: white;
  display: flex;
  height: 300px;
  padding: 2%;
}
a {
  text-decoration: none;
  color: whitesmoke;
}

a:hover {
  text-decoration: none;
  color: #d97330; 
}
.home {
  position: absolute;
  width: 100%;
  z-index: 999;
  overflow: hidden;
  margin: 0px;
  top: 0px;
  left: 0px;
  align-items: center;
}
.aboutPage {
  margin-top: 70px;
}

.homeMain-image {
  width: 100%;
  object-fit: cover;
}

header {
  padding: 2% 2% 0 2% ;
}

main {
  padding: 2%;
  margin: 2%;
}

section {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 2%;
  margin: 2%;
}

h2 {
  color: rgb(13,46,97) !important;
}
h1 {
  color: rgb(253,117,28) !important;
}

.navBar {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 0, 0, 0.2);
}
</style>
