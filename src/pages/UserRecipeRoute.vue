<template>
  <div>
    <RecipesList
        v-if="recipes.length > 0"
        :recipes="recipes"
    />
    <div v-if="recipes.length === 0">
      Vous n'avez pas de recettes.
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

import RecipesList from "@/components/Recipes/RecipesList";

export default {
  name: "ViteMesRecettesRoute",
  data() {
    return {
      recipes: null
    };
  },
  created() {
    this.recipes = this.getUserRecipe
  },
  components: {RecipesList},
  computed: {
    ...mapGetters({
      getUserRecipe: "getUserRecipe",
    }),
  },
}
</script>

<style scoped>

</style>