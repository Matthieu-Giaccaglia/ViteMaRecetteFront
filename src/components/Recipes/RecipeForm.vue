<template>
  <div class="aside-container d-flex mt-5 mb-5 flex-column">
    <div style="width: 95%" class="m-auto">
      <div>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ messageAlert }}
        </b-alert>
      </div>

      <b-card
          :title="(existing? 'Modifier' : 'Créer') + ' ma recette'"
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
              />
            </b-form-group>

            <b-form-group
                id="input-group-1"
                label="Description de la recette :"
                label-for="input-1"
            >
              <b-form-textarea
                  id="input-1"
                  v-model="formCreatRecipe.description"
                  type="text"
                  placeholder="Entrez le nom de votre recette"
                  required
              />
            </b-form-group>


            <b-form-group
                id="input-group-2"
                label="Image d'illustration de la recette :"
                label-for="input-2"
                v-model="formCreatRecipe.picture"
            >
              <img :src="formCreatRecipe.picture" class="form-recipe-img mb-2">
              <b-form-file name="file1" id="file1" ref="myFiles" @change="previewFiles"/>
            </b-form-group>

            <b-form-group
                id="npOfPersonInputGroup"
                label="Pour combien de personne ?"
                label-for="npOfPersonInput"
            >
              <b-form-input
                  id="npOfPersonInput"
                  v-model="formCreatRecipe.nbOfPerson"
                  type="number"
                  required
              />
            </b-form-group>

            <div>
              <p style="margin-bottom: 0.5rem">
                Ingrédient(s) de la recette :
              </p>
              <b-input-group
                  v-for="(ingredient, index) in formCreatRecipe.ingredients"
                  :key="'ingredient_'+index"

                  id="input-ingredient-1"
                  label-for="input-ingredient-1"
                  style="margin-bottom: 5px"
              >
                <b-form-input placeholder="nom" type="text" v-model="ingredient.name" required></b-form-input>

                <b-form-input min="0" step=".01" placeholder="quantité" type="number" v-model="ingredient.quantity"
                              required></b-form-input>

                <b-form-select :options="units" placeholder="" type="text" v-model="ingredient.unit"
                               required></b-form-select>

                <b-button variant="danger" is-text style="cursor: pointer" v-if="index>0"
                          @click="formCreatRecipe.ingredients.splice(index, 1)">
                  -
                </b-button>
              </b-input-group>
              <div style="text-align: right">
                <b-button variant="success" @click="addIngredient">+</b-button>
              </div>
            </div>


            <div>
              <p style="margin-bottom: 0.5rem">
                Étape(s) de la recette :
              </p>
              <b-input-group
                  v-for="(step, index) in formCreatRecipe.steps"
                  :key="'step_'+index"
                  :label="'Etape ' + (index +1)"
                  :id="'input-group-'+index"
                  style="margin-bottom: 5px"
              >
                <b-form-textarea
                    :id="'step'+index+'Textarea'"
                    v-model="step.action"
                    :placeholder="'Étape n°'+(index+1)"
                    type="text"
                    required

                />
                <b-button variant="danger" is-text style="cursor: pointer" v-if="index>0" @click="formCreatRecipe.steps.splice(index, 1)">
                  -
                </b-button>
              </b-input-group>
              <div style="text-align: right; margin-bottom: 10px">
                <b-button variant="success" @click="addStep">+</b-button>
              </div>
            </div>

            <b-button type="submit" v-if="existing && !isLoading" variant="primary">Modifier cette recette</b-button>
            <b-button type="submit" v-if="!existing && !isLoading" variant="primary">Créer une recette</b-button>
          </b-form>

        </b-card-body>
      </b-card>
    </div>
    <div class="my-spinner" v-if="isLoading">
      <b-spinner variant="primary" label="Large Spinner" style="width: 10rem; height: 10rem; margin: auto"></b-spinner>
    </div>
  </div>


</template>

<style>
.form-recipe-img {
  max-height: 75px;
  object-fit: contain;
  border: silver 1px solid;
  border-radius: 5px;
}
.my-spinner {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 1300;
  display: flex;
  background-color: #11111182;
}
</style>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "RecipeForm",
  props: [
    "id",
    "name",
    "description",
    "picture",
    "ingredients",
    "nbOfPerson",
    "steps",
    "existing",
  ],
  data() {

    return {
      formCreatRecipe: {
        id: this.id,
        name: this.name,
        description: this.description,
        picture: this.picture,
        ingredients: this.ingredients ? this.ingredients : [{name: "", quantity: "", unit: ""}],
        nbOfPerson: this.nbOfPerson,
        steps: this.steps ? this.steps : [{step: 1, action: ""}],
      },
      showDismissibleAlert: false,
      messageAlert: "",
      units: ['gramme', 'litre', 'c. à c.', 'c. à s.', "", "pincée", 'cube', 'noix', 'branche', 'gousse','sachet'],
      isLoading: false,
    };
  }
  ,
  methods: {
    addStep() {
      console.log("ok")
      this.formCreatRecipe.steps.push({
        step: this.formCreatRecipe.steps.length + 1,
        action: ""
      })
    }
    ,
    addIngredient() {
      console.log("ok")
      this.formCreatRecipe.ingredients.push({
        name: "",
        quantity: "",
        unit: "",
      })
    }
    ,
    async sendRecipe(event) {
      event.preventDefault();
      this.isLoading = true
      let response;
      if (this.existing)
        response = await this.$store.dispatch('updateRecipe', this.formCreatRecipe);
      else
        response = await this.$store.dispatch('createRecipe', this.formCreatRecipe);

      if (response.success) {
        window.alert("Recette sauvegardée !")
        window.location = "/"
      } else {
        window.alert("Votre recette n'a pas pu être sauvegardé :\n" + response.message)
        this.isLoading = false
      }
    },
    async previewFiles(event) {
      let reader = new FileReader();
      await new Promise(resolve => {
        reader.onload = ev => {
          this.formCreatRecipe.picture = reader.result
          resolve(ev.target.result)
        }
        reader.readAsDataURL(event.target.files[0])
      })
    }
  }
  ,
  computed: {
    validation() {
      return this.formCreatRecipe.password === this.formCreatRecipe.passwordCopy
    }
    ,
    ...
        mapGetters({
          urlApi: "getApiUrl",
        }),
    ...
        mapActions({
          createUser: "createUser",
        }),
  }
  ,
}
;
</script>