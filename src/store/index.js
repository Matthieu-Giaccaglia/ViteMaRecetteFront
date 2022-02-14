import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: "https://vite-ma-recette-api.herokuapp.com/",
    imgUrl: "https://vitemarecettedb-7ad4.restdb.io/media/",
    jwt: null,
    recipes: []
  },
  getters: {
    getApiUrl: (state) => {
      return state.apiUrl;
    },
    getJwt: (state) => {
      return state.jwt;
    },
    getRecipes: (state) => {
      return state.recipes;
    }
  },
  mutations: {
    setJwt(state, jwt) {
      state.jwt = jwt;
      window.localStorage.setItem("jwt", jwt);
    },
    setRecipes(state, recipes) {
      state.recipes = recipes;
    }
  },
  actions: {
    initJwt(context) {
      console.log("initJwt");
      if (window.localStorage.getItem("jwt")) {
        context.commit("setJwt", window.localStorage.getItem("jwt"));
      }
    },
    setJwtAction({ commit, state }, data) {
      axios
        .post(state.apiUrl + "login", {
          email: data.email,
          password: data.password
        })
        .then((response) => {
          console.log("JWT 1 ", response.data.jwt);
          commit("setJwt", response.data.jwt);
        })
        .catch((err) => console.log(err));
    },
    setRecipesAction({ commit, state }) {
      axios
        .get(state.apiUrl + "recipes")
        .then((response) => {
          console.log(response.data);
          commit("setRecipes", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    testRestDB() {
      axios
        .get(
          "https://vitemarecettedb-7ad4.restdb.io/media/61bb1585d4fd1466000671b8/",
          {
            "x-apikey": "355f7d06674e62234859354b2f57d3ce8d8b6"
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
