<template>
  <div>
    <b-card
      :title="name"
      :img-src="picture"
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
import {mapGetters} from "vuex";

export default {
  name: "CardRecipe",
  props: ["name", "description", "picture"],
  created() {
    this.picture = this.pictureUrl + this.picture
  },
  computed: {
    ...mapGetters({
      pictureUrl: "getPictureUrl",
    }),
  }
};
</script>