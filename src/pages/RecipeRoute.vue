<template>
  <div>
    <Recipe
        v-if="recipe != null"
        :id="recipe._id"
        :name="recipe.name"
        :description="recipe.description"
        :ingredients="recipe.ingredients"
        :picture="recipe.picture"
        :steps="recipe.steps"
        :nb-of-person="recipe.nbOfPerson"
        :creator="recipe.users"
    />
    <div v-if="!recipe">
      Recette introuvable
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
    }
  },
  created() {
    try {
      this.recipe = this.getRecipe(this.$route.params.id)
    } catch (e) {
      this.error = true
    }
  },
  computed: {
    ...mapGetters({
      getRecipe: "getRecipe",
    }),
  }
}

</script>