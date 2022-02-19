<template>
  <body id="app">
      <Header v-if="jwt != null && user.username != null" />
      <main>
        <router-view />
      </main>
      <Footer />
  </body>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import {mapGetters} from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters({
      jwt : "getJwt",
      user : "getUser"
    })
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}
</style>