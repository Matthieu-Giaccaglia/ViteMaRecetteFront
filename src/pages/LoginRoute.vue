<template>
  <div id="container">
    <div class="aside-container d-flex mt-5 flex-column">
      <div style="max-width: 400px; width: 95%" class="m-auto">
        <div>
          <b-alert v-model="showDismissibleAlertSuccess" variant="success" dismissible>
            Votre compte a été crée avec succès
          </b-alert>
        </div>

        <div>
          <b-alert v-model="showDismissibleAlertDanger" variant="danger" dismissible>
            {{ messageAlert }}
          </b-alert>
        </div>

        <b-card
            title="Connexion"
            tag="article"
            class="m-auto"
        >
          <b-card-body>
            <b-form @submit="onSubmit">
              <b-form-group
                  id="input-group-1"
                  label="Email :"
                  label-for="input-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    placeholder="Entrez votre email"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-2"
                  label="Mot de passe :"
                  label-for="input-2"
              >
                <b-form-input
                    id="input-2"
                    type="password"
                    v-model="form.password"
                    placeholder="Entrez votre mot de passe"
                    required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Vite, connectez-moi !</b-button>
            </b-form>

          </b-card-body>
        </b-card>
        <div class="mt-2">
          <b-link :to="{name: 'signup'}">J'ai pas de compte ! Vite, inscrivez-moi !</b-link>
        </div>
      </div>
      <div class="my-spinner" v-if="isLoading">
        <b-spinner variant="primary" label="Large Spinner"
                   style="width: 10rem; height: 10rem; margin: auto"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "LoginRoute",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isLoading: false,
      showDismissibleAlertSuccess: false,
      showDismissibleAlertDanger: false,
      messageAlert: ""
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.isLoading = true;
      let connectionSuccess = await this.login({
        email: this.form.email,
        password: this.form.password
      })

      this.isLoading = false;
      if (connectionSuccess.success) {
        this.$router.push({name: "allRecipe"})
      } else if (connectionSuccess.message === "bad_credential") {
        this.showDismissibleAlertDanger = true
        this.messageAlert = "L'email et le mot de passe ne correspondent pas."
      } else {
        this.showDismissibleAlertDanger = true
        this.messageAlert = "Erreur interne."
      }
    },
    ...mapActions({
      login: "login",
    }),
  },
  created() {
    if (this.$route.query.newUser) {
      this.showDismissibleAlertSuccess = true
      let query = Object.assign({}, this.$route.query);
      delete query.newUser;
      this.$router.replace({query});
    }
  }
};
</script>