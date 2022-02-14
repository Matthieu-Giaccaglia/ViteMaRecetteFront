<template>
  <div>
    <b-card
      :title="name"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-body>
        <b-card-text>
          {{ description }}
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
console.log("salut");

export default {
  name: "CardRecipe",
  props: ["name", "description"],
};
</script>