<template>
  <div id="container">
    <div>Home page</div>
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