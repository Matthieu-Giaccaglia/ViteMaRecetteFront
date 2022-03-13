<template>
    <b-card
        :title="name"
        :img-src="realPicture"
        img-alt="Image"
        img-top
        img-width="318px"
        img-height="179px"
        tag="article"
        style="max-width: 20rem; min-height: 100%"
        class="mb-2"
    >
      <b-card-body>
        <b-card-text>
          {{ description }}
        </b-card-text>

        <b-button :to="'/recipe/' + id" variant="primary">Cuisiner la recette</b-button>
      </b-card-body>
    </b-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CardRecipe",
  data() {
    return {
      'realPicture': "",
    };
  },
  props: [
    "name",
    "description",
    "picture",
    "id"
  ],
  created() {
    this.realPicture = this.pictureUrl + this.picture
  },
  computed: {
    ...mapGetters({
      pictureUrl: "getPictureUrl",
    }),
  }
};
</script>