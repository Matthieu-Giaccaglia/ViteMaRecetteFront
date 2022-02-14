<template>
  <div id="container">
    <div>Home page</div>
    <AllRecipes />
    <img
      src="https://vitemarecettedb-7ad4.restdb.io/media/61bb1585d4fd1466000671b8"
    />
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