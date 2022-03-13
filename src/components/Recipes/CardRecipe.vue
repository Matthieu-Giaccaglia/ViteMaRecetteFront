<template>
    <b-card
        tag="article"
        style="max-width: 20rem; min-height: 100%; cursor: pointer"
        class="mr-2"
        @click="$router.push({name: 'recipe', params:{id: id}})"
        no-body
    >
      <b-card-img :src="realPicture" class="card-recipe-img" top>
      </b-card-img>
      <b-card-body>
        <b-card-title style="width: 100%; overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">
          {{name}}
        </b-card-title>
        <b-card-text style="text-align: justify">
          {{ description }}
        </b-card-text>
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
    this.realPicture = this.picture
  },
  computed: {
    ...mapGetters({
      pictureUrl: "getPictureUrl",
    }),
  }
};
</script>

<style>
.card-recipe-img {
  width : 318px;
  object-fit: contain;
  height : 179px;
}
</style>