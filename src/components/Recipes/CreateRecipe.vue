<template>
  <div class="aside-container d-flex mt-5 flex-column">
    <div style="max-width: 400px;width: 95%" class="m-auto">
      <div>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ messageAlert }}
        </b-alert>
      </div>

      <b-card
          title="Creer une recette"
          tag="article"
      >
        <b-card-body>
          <b-form @submit="sendRecipe">

            <b-form-group
                id="input-group-1"
                label="Nom de la recette :"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="formCreatRecipe.name"
                  type="text"
                  placeholder="Entrez le nom de votre recette"
                  required
              ></b-form-input>
            </b-form-group>


            <b-form-group
                id="input-group-2"
                label="Enregistrez une image"
                label-for="input-2"
            >
              <input type="file" name="file1" id="file1"  ref="myFiles" @change="previewFiles">
            </b-form-group>
            <!--
                       <b-form-group
                           id="input-group-3"
                           label="Vos ingredients :"
                           label-for="input-3"
                       >
                         <b-form-input
                             id="input-3"
                             type="text"
                             v-model="formCreatRecipe.ingredients"
                             placeholder="..."
                             required
                         ></b-form-input>

                       </b-form-group>


                       <b-form-group
                           id="inputSteps"
                           label="Etapes :"
                           label-for="input-4"
                       >
                         <b-form-textarea
                             id="step-1"
                             label="Etape 1"
                         ></b-form-textarea>
                       </b-form-group>
                       <b-button >
                         +Ajouter une étape
                       </b-button>
                       -->

            <b-button type="submit" variant="primary">Créer une recette</b-button>
          </b-form>

        </b-card-body>
      </b-card>
    </div>


  </div>


</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "CreateRecipe",
  data() {

    return {
      nbStep:1 ,
      formCreatRecipe: {
        name: "",
        image: "",
      },
      showDismissibleAlert: false,
      messageAlert: "",
    };
  },
  methods: {
    addStep(event) {
      event.preventDefault();
      this.nbStep++;
      document.getElementById('inputSteps').innerHTML += " <b-form-textarea id=\"step-" + this.nbStep + "\" label=\"Etape " + this.nbStep + "\"></b-form-textarea>"
    },
    async sendRecipe(event){
      event.preventDefault();
      console.log(this.formCreatRecipe)
      await this.$store.dispatch('createRecipe', {
        name: this.formCreatRecipe.name,
        picture: this.formCreatRecipe.image
      });

    },
    previewFiles(event){
      let image = event.target.files || event.dataTransfer.files
      this.formCreatRecipe.image = image[0];
    }
  },
  computed: {
    validation() {
      return this.formCreatRecipe.password === this.formCreatRecipe.passwordCopy
    },
    ...mapGetters({
      urlApi: "getApiUrl",
    }),
    ...mapActions({
      createUser: "createUser",
    }),
  },
};
</script>