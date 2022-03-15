<template>
  <div id="container">
    <RecipeForm v-if="recipe"
        :id="recipe._id"
        :name="recipe.name"
        :description="recipe.description"
        :ingredients="recipe.ingredients"
        :picture="recipe.picture"
        :steps="recipe.steps"
        :nb-of-person="recipe.nbOfPerson"
        :creator="recipe.users"
        :isUpdating="true"
    />
  </div>
</template>

<script>
import RecipeForm from "@/components/Recipes/RecipeForm";
import {mapGetters} from "vuex";


export default {
  name: "UpdateRecipeRoute",
  components: {
    RecipeForm
  },
  data() {
    return {
      'recipe': null,
    }
  },
  created() {
    this.recipe = this.getRecipe(this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      'getRecipe': 'getRecipe',
    }),
  },
}
</script>

<style scoped>

</style>