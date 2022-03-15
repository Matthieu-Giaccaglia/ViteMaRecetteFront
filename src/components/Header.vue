<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand :to="{name: 'allRecipe'}">Vite Les Recettes !</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{name: 'userRecipe'}">Vite, mes recette !</b-nav-item>
            <b-nav-item :to="{name: 'createRecipe'}">Vite, ajoutez ma recette !</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ username }}</em>
              </template>
              <b-dropdown-item-button @click="disconnect" >Vite, déconnectez-moi !</b-dropdown-item-button>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "Header",
  data() {
    return {
      username: this.$store.state.user.username
    }
  },
  methods : {
    disconnect () {
      this.logout()
      this.$router.push({name: "login"})
    },
    ...mapActions({
      logout: 'logout'
    })
  }
};
</script>