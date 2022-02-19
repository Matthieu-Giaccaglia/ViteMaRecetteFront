import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import HomeRoute from "@/pages/HomeRoute";
import SecondPageRoute from "@/pages/SecondPageRoute";
import LoginRoute from "@/pages/LoginRoute";
import SignupRoute from "@/pages/SignupRoute";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "homePage",
      component: HomeRoute
    },
    {
      path: "/second",
      name: "secondPage",
      component: SecondPageRoute
    },
    {
      path: "/login",
      name: "login",
      component: LoginRoute
    },
    {
      path: "/sign-up",
      name: "signup",
      component: SignupRoute
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
