<template>
<div>
  <Recipe v-if="recipe != null"
    :id="recipe._id"
    :name="recipe.name"
    :description="recipe.description"
    :ingredients="recipe.ingredients"
    :picture="recipe.picture"
    :steps="recipe.steps"
    :nb-of-person="recipe.nbOfPerson"
    :creator="recipe.users"
  />
  <div v-if="noRecipe != null">
    Recette introuvable
  </div>
  <div class="my-spinner" v-if="recipe == null && noRecipe == null && error == null">
    <b-spinner label="Large Spinner" style="width: 10rem; height: 10rem"></b-spinner>
  </div>
</div>
</template>

<script>

import Recipe from "@/components/Recipes/Recipe";
import {mapGetters} from "vuex";

export default {
  name: "RecipeRoute",
  components: {Recipe},
  data() {
    return {
      'recipe': null,
      'noRecipe' : null,
      'error' :null
    }
  },

  async mounted() {
    try {
      this.recipe = await this.$store.dispatch('getRecipeFromDB', this.$route.params.id)
      if (!this.recipe) this.noRecipe = true;
    } catch (e) {
      this.error = true
      console.log('RecipeRoute : Internal Error')
    }
  },

  computed: {
    ...mapGetters({
      pictureUrl: "getPictureUrl",
    }),
  }
}

</script>

<style scoped>

.my-spinner {
  width: max-content;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 350px;
}

.spinner-border {
  border-width: 0.75rem;
}
</style>