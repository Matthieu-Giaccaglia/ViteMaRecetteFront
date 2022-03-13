<template>
  <div>
    <b-container>
      <b-row>
        <b-col
            v-for="recipe in recipes"
            :key="recipe._id"
        >
          <CardRecipe
              :name="recipe.name"
              :description="recipe.description"
              :picture="recipe.picture"
              :id="recipe._id"
          >
          </CardRecipe>
        </b-col>
      </b-row>

    </b-container>

  </div>
</template>

<script>
import CardRecipe from "@/components/Recipes/CardRecipe";
import {mapGetters} from "vuex";

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