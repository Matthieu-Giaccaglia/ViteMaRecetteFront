<template>
  <div id="container">
    <RecipeForm v-if="recipe !== null"
        :id="recipe._id"
        :name="recipe.name"
        :description="recipe.description"
        :ingredients="recipe.ingredients"
        :picture="recipe.picture"
        :steps="recipe.steps"
        :nb-of-person="recipe.nbOfPerson"
        :creator="recipe.users"
        :existing="true"
    />
  </div>
</template>

<script>
import RecipeForm from "@/components/Recipes/RecipeForm";


export default {
  name: "CreateRecipeRoute",
  components: {
    RecipeForm
  },
  data() {
    return {
      'recipe': null,
      'noRecipe': null,
      'error': null
    }
  },
  async mounted() {
    try {
      this.recipe = await this.$store.dispatch('getRecipeFromDB', this.$route.params.id)
      if (!this.recipe) this.noRecipe = true;
    } catch (e) {
      this.error = true
    }
  },
}
</script>

<style scoped>

</style>