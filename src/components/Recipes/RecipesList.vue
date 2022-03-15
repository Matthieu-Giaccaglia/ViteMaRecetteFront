<template>
  <div class="mt-3">

    <b-pagination
        :total-rows="recipes.length"
        :per-page="perPage"
        v-model="currentPage"
        @change="changeRecipePage"
        align="center"
        first-number
        last-number
    >

    </b-pagination>

    <b-container>
      <b-row>
        <b-col
            v-for="recipe in recipesPage"
            :key="recipe._id"
            class="mb-2"
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

export default {
  name: "RecipeList",
  components: {
    CardRecipe,
  },
  props: [
    'recipes'
  ],
  data() {
    return {
      currentPage : 1,
      perPage: 6,
      recipesPage: [],
    }
  },
  created() {
    this.changeRecipePage(this.currentPage)
  },
  methods: {
    changeRecipePage(pageNumber) {

      this.recipesPage = []

      let min = (pageNumber - 1) * this.perPage
      let max = min + this.perPage

      console.log('min',min);
      console.log('max',max);

      if (max > this.recipes.length - 1)
        max = this.recipes.length - 1

      for (let i = min; i < max; i++) {
        this.recipesPage.push(this.recipes[i])
      }
    },
  },
};
</script>