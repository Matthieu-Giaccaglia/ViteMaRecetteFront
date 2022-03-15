import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import HomeRoute from "@/pages/HomeRoute";
import LoginRoute from "@/pages/LoginRoute";
import SignupRoute from "@/pages/SignupRoute";
import RecipeRoute from "@/pages/RecipeRoute";
import BadUrlRoute from "@/pages/BadUrlRoute";
import CreateRecipeRoute from "@/pages/CreateRecipeRoute";
import UpdateRecipeRoute from "@/pages/UpdateRecipeRoute";
import UserRecipeRoute from "@/pages/UserRecipeRoute";


Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "allRecipe",
      component: HomeRoute
    },
    {
      path: "/vite-connectez-moi",
      name: "login",
      component: LoginRoute
    },
    {
      path: "/vite-inscrivez-moi",
      name: "signup",
      component: SignupRoute
    },
    {
      path: "/vite-la-recette/:id",
      name: "recipe",
      component: RecipeRoute
    },
    {
      path: "/vite-ajoutez-ma-recette",
      name: "createRecipe",
      component: CreateRecipeRoute
    },
    {
      path: "/vite-modifier-ma-recette/:id",
      name: "updateRecipe",
      component: UpdateRecipeRoute
    },
    {
      path: "/vite-mes-recettes",
      name: "userRecipe",
      component: UserRecipeRoute
    },
    {
      path: '/*',
      name: '404',
      component: BadUrlRoute
    },

  ]
});

router.beforeEach((to, from, next) => {

  if ((to.name === "login" || to.name === 'signup') && store.getters.getJwt !== null) {
    next({name: "homePage"})
  } else if (!isValideRouteForNoJWT(to.name) && store.getters.getJwt === null) {
    next({name:'login'})
  } else {
    next()
  }
});

function isValideRouteForNoJWT(name) {
  let tabValideRoute=['login', 'signup'];

  for(let i = 0; i<tabValideRoute.length; i++) {
    if(tabValideRoute[i]===name)
      return true
  }
  return false
}

export default router;
