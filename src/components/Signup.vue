<template>
  <div class="aside-container d-flex mt-5 flex-column">
    <div style="max-width: 400px;width: 95%" class="m-auto">
      <div>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ messageAlert }}
        </b-alert>
      </div>

      <b-card
          title="Inscription"
          tag="article"
      >
        <b-card-body>
          <b-form @submit="onSignIn">

            <b-form-group
                id="input-group-1"
                label="Pseudo :"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="formSignIn.username"
                  type="text"
                  placeholder="Entrez votre pseudo"
                  required
              ></b-form-input>
            </b-form-group>


            <b-form-group
                id="input-group-2"
                label="Email :"
                label-for="input-2"
            >
              <b-form-input
                  id="input-2"
                  v-model="formSignIn.email"
                  type="email"
                  placeholder="Entrez votre email"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Mot de passe :"
                label-for="input-3"
            >
              <b-form-input
                  id="input-3"
                  type="password"
                  v-model="formSignIn.password"
                  placeholder="Entrez votre mot de passe"
                  required
              ></b-form-input>

            </b-form-group>

            <b-form-group
                id="input-group-4"
                label="Confirmation de mot de passe :"
                label-for="input-4"
            >
              <b-form-input
                  id="input-4"
                  type="password"
                  v-model="formSignIn.passwordCopy"
                  placeholder="Entrez votre mot de passe"
                  required
              ></b-form-input>
              <b-form-invalid-feedback :state="validation">
                Les mots de passe ne correspondent pas.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary">Créer un compte</b-button>
          </b-form>

        </b-card-body>
      </b-card>

      <div class="mt-2">
        <b-link to="/login" >Vous possédez déjà un compte ? Connectez-vous !</b-link>
      </div>
    </div>


  </div>


</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name : "Signin",
  data() {
    return {
      formSignIn : {
        username : "",
        email: "",
        password: "",
        passwordCopy: "",
      },
      showDismissibleAlert: false,
      messageAlert: "",
    };
  },
  methods: {
    async onSignIn(event) {
      event.preventDefault();
      if (this.formSignIn.password === this.formSignIn.passwordCopy) {
        let userIsCreate = await this.$store.dispatch("createUser", {
          username: this.formSignIn.username,
          email: this.formSignIn.email,
          password: this.formSignIn.password
        })

        if (userIsCreate === "success") {
          this.$router.push({name: "login", query: {newUser: "true"}})
        } else {
          this.showDismissibleAlert = true
          this.messageAlert = "Erreur interne."
        }

      } else {
        this.showDismissibleAlert = true
        this.messageAlert = "Les mots de passe ne correspondent pas."
      }
    }
  },
  computed: {
    validation() {
      return this.formSignIn.password === this.formSignIn.passwordCopy
    },
    ...mapGetters({
      urlApi: "getApiUrl",
    }),
    ...mapActions({
      createUser : "createUser"
    }),
  },
};
</script>