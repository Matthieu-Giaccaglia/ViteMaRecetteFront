<template>
  <div id="container">
    <br> <!-- this is an easter egg for romain le breton -->
    <AllRecipes />
  </div>
</template>

<script>
import AllRecipes from "@/components/Recipes/AllRecipes";

export default {
  name: "Home",
  components: {
    AllRecipes,
  },
};
</script>