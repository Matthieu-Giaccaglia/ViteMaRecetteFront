<template>
  <div class="recipe-content">
    <h1>Recette {{ this.name }}</h1>
    <p>par {{ this.creator.username }}</p>
    <div class="mb-2">
      <b-button variant="primary" class="mr-2" :to="'/updateRecipe/'+this.id"
                v-if="creator.email === $store.state.user.email">Modifier
      </b-button>
      <b-button variant="danger" class="ml-2" @click="deleteRecipe" v-if="creator.email === $store.state.user.email">
        Supprimer
      </b-button>
    </div>


    <img class="recipe-img" :src="picture" alt="">

    <div class="recipe-description mt-5">
      <h2>Description</h2>
      <p>{{ this.description }}</p>
    </div>

    <div class="recipe-ingredients mt-5">
      <div class="d-flex">
        <h2>Ingrédients</h2>
        <h3 class="ml-auto">
          Pour
          <b-form-spinbutton id="sb-inline" v-model="nbOfPerson_" inline min="1"></b-form-spinbutton>
          personnes
        </h3>
      </div>
      <b-container fluid="md">
        <b-row>
          <b-col class="col" cols="6"
                 v-for="ingredient in ingredients_"
                 :key="ingredient.name"
          >
            <div class="recipe-ingredient">
              <div class="recipe-name">
                {{ ingredient.name }}
              </div>
              <div class="recipe-quantity text-right">
                {{ (ingredient.quantity * (nbOfPerson_ / nbOfPerson)) + ' ' + ingredient.unit }}
              </div>
            </div>

          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="recipe-steps mt-5">
      <h2>Préparation</h2>
      <b-list-group>
        <b-list-group-item
            v-for="step in steps"
            :key="step.step"
        >
          <b-badge variant="primary" pill>{{ step.step }}</b-badge>
          {{ step.action }}
        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="my-spinner" v-if="isLoading">
      <b-spinner variant="primary" label="Large Spinner" style="width: 10rem; height: 10rem; margin: auto"></b-spinner>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";


export default {
  name: "Recipe",
  methods: {
    async deleteRecipe() {
      this.isLoading = true
      let response = await this.$store.dispatch('deleteRecipe', this.id);

      if (response.success) {
        window.alert("Votre recette a été supprimé !")
        window.location = "/"
      } else {
        window.alert("Votre recette n'a pas pu être supprimé :\n" + response.message)
        this.isLoading = true
      }

    },
  },
  data() {
    return {
      nbOfPerson_: this.nbOfPerson,
      isLoading: false,
      ingredients_: {...this.ingredients}
    }
  },
  props: [
    "id",
    "name",
    "description",
    "ingredients",
    "picture",
    "steps",
    "nbOfPerson",
    "creator",
  ],
  computed: {
    ...mapGetters({
      pictureUrl: "getPictureUrl",
    }),
  },
}
</script>

<style scoped>
.recipe-content {
  max-width: 1000px;
  width: 100%;
  margin: 20px auto 50px;
  text-align: center;
  padding: 50px;
}

.recipe-description {
  text-align: justify;
  padding: 10px;
  font-weight: bolder;
}

.recipe-ingredients {
  text-align: justify;
}

.recipe-ingredient {
  height: 100%;
  width: 100%;
  display: flex;
}

.recipe-name {
  margin: auto auto auto 0;
  height: max-content;
}

.recipe-quantity {
  margin: auto 0 auto auto;
  width: max-content;
}

.recipe-steps {
  text-align: justify;
}

.col {
  border: silver 1px solid;
  min-height: 40px;
}

.recipe-img {
  max-height: 420px;
  object-fit: contain;
  border: silver 2px solid;
  border-radius: 20px;
}
</style>