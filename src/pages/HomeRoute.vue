<template>
  <div id="container">
    <RecipesList
    :recipes="recipes"
    />
  </div>
</template>

<script>
import RecipesList from "@/components/Recipes/RecipesList";

export default {
  name: "Home",
  data() {
    return {
      recipes: this.$store.getters.getRecipes
    };
  },
  components: {
    RecipesList,
  },
};
</script>