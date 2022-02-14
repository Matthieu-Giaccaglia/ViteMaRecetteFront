<template>
  <div>
    <CardRecipe
      v-for="recipe in recipes"
      :key="recipe._id"
      :name="recipe.name"
      :description="recipe.description"
    >
    </CardRecipe>
  </div>
</template>

<script>
import CardRecipe from "@/components/Recipes/CardRecipe";
import { mapGetters } from "vuex";

export default {
  name: "AllRecipes",
  components: {
    CardRecipe,
  },
  computed: {
    ...mapGetters({
      recipes: "getRecipes",
    }),
  },
};
</script>