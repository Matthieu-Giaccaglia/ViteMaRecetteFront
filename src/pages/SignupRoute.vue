<template>
  <div id="container">
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
                    :state="validUsername"
                    required
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  Ce pseudo est déjà utilisé.
                </b-form-invalid-feedback>
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
                    :state="validEmail"
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  Un compte avec cet email existe déjà.
                </b-form-invalid-feedback>
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
                    :state="passwordMin"
                    required
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  Il faut au moins 8 caractères
                </b-form-invalid-feedback>

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
                <b-form-invalid-feedback :state="passwordMatch">
                  Les mots de passe ne correspondent pas.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button :disabled="validForm" type="submit" variant="primary">Vite, inscrivez-moi !</b-button>
            </b-form>

          </b-card-body>
        </b-card>

        <div class="mt-2">
          <b-link :to="{name: 'login'}" >J'ai déjà un compte ! Vite, connectez-moi !</b-link>
        </div>
      </div>

      <div class="my-spinner" v-if="isLoading">
        <b-spinner variant="primary" label="Large Spinner" style="width: 10rem; height: 10rem; margin: auto"></b-spinner>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions} from "vuex";

export default {
  name: "SignupRoute",
  data() {
    return {
      formSignIn : {
        username : "",
        email: "",
        password: "",
        passwordCopy: "",
      },
      isLoading: false,
      showDismissibleAlert: false,
      messageAlert: "",
      invalidUsername: [],
      invalidEmail: [],
    };
  },
  methods: {
    onSignIn: async function (event) {
      event.preventDefault();
      this.isLoading = true
      if (this.formSignIn.password === this.formSignIn.passwordCopy) {
        let userIsCreate = this.signIn({
          username: this.formSignIn.username,
          email: this.formSignIn.email,
          password: this.formSignIn.password
        })

        this.isLoading = false
        if (userIsCreate.success) {
          this.$router.push({name: "login", query: {newUser: "true"}})
        } else if (userIsCreate.message === 'Internal server error') {
          this.showDismissibleAlert = true
          this.messageAlert = 'Erreur serveur. Merci de réessayer ultérieurement'
        } else {
          userIsCreate.message.forEach(field => {
            if (field.field === 'email'){
              this.invalidEmail.push(this.formSignIn.email)
            } if (field.field === 'username') {
              this.invalidUsername.push(this.formSignIn.username)
            }
          })
        }

      } else {
        this.showDismissibleAlert = true
        this.messageAlert = "Les mots de passe ne correspondent pas."
      }
    },
    ...mapActions({
      signIn : "signIn"
    }),
  },
  computed: {
    passwordMatch() {
      return this.formSignIn.password === this.formSignIn.passwordCopy
    },
    passwordMin() {
      return this.formSignIn.password.length >= 8
    },
    validUsername(){
      return this.invalidUsername.includes(this.formSignIn.username) ? false : null
    },
    validEmail(){
      return this.invalidEmail.includes(this.formSignIn.email) ? false : null
    },
    validForm() {
      return !(this.passwordMatch && this.passwordMin && this.validUsername===null && this.validEmail===null)
    },
  },
}
</script>

<style scoped>

</style>