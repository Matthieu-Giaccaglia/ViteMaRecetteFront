<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/createRecipe">  Créer une recette </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ username }}</em>
              </template>
              <b-dropdown-item >Profile</b-dropdown-item>
              <b-dropdown-item-button @click="disconnect" >Déconnexion</b-dropdown-item-button>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      username: this.$store.state.user.username
    }
  },
  methods : {
    disconnect () {
      this.$store.dispatch("disconnect")
      this.$router.push({name: "login"})
    }
  }
};
</script>