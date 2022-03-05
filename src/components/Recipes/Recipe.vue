<template>
  <div class="recipe-content">
    <h1>Recette {{ this.name }}</h1>
    <p>par {{ this.creator.username }}</p>

    <img :src="picture" alt="">

    <div class="recipe-description mt-5">
      <h2>Description</h2>
      <p>{{ this.description }}</p>
    </div>

    <div class="recipe-ingredients mt-5">
      <div class="d-flex">
        <h2>Ingrédients</h2>
        <h3 class="ml-auto">
          Pour {{ this.nbOfPerson }} personnes
        </h3>
      </div>
      <b-container fluid="md">
        <b-row>
          <b-col class="col" cols="6"
                 v-for="ingredient in ingredients"
                 :key="ingredient.name"
          >
            <div class="recipe-ingredient">
              <div class="recipe-name">
                {{ ingredient.name }}
              </div>
              <div class="recipe-quantity text-right">
                {{ ingredient.quantity + ' ' + ingredient.unit }}
              </div>
            </div>

          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="recipe-steps mt-5">
      <h2>Préparation</h2>
      <b-list-group>
        <b-list-group-item
            v-for="step in steps"
            :key="step.step"
        >
          <b-badge variant="primary" pill>{{ step.step }}</b-badge>
          {{ step.action }}
        </b-list-group-item>
      </b-list-group>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";


export default {
  name: "Recipe",
  props: [
    "id",
    "name",
    "description",
    "ingredients",
    "picture",
    "steps",
    "nbOfPerson",
    "creator",
  ],
  computed: {
    ...mapGetters({
      pictureUrl: "getPictureUrl",
    }),
  }
}
</script>

<style scoped>
.recipe-content {
  max-width: 1000px;
  width: 100%;
  margin: 20px auto 50px;
  text-align: center;
  padding: 50px;
}

.recipe-description {
  text-align: justify;
  padding: 10px;
  font-weight: bolder;
}

.recipe-ingredients {
  text-align: justify;
}

.recipe-ingredient {
  height: 100%;
  width: 100%;
  display: flex;
}

.recipe-name {
  margin: auto auto auto 0;
  height: max-content;
}

.recipe-quantity {
  margin: auto 0 auto auto;
  width: max-content;
}

.recipe-steps {
  text-align: justify;
}

.col {
  border: silver 1px solid;
  min-height: 40px;
}

img {
  width: 100%;
  border: silver 2px solid;
  border-radius: 20px;
}
</style>