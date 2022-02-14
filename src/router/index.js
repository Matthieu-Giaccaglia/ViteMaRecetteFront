import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import SecondPage from "@/pages/SecondPage";
import Login from "@/pages/Login";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "homePage",
      component: Home
    },
    {
      path: "/second",
      name: "secondPage",
      component: SecondPage
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log("router beforeach");
  if (to.name !== "login" && store.getters.getJwt === null)
    next({ name: "login" });
  else if (to.name === "login" && store.getters.getJwt !== null) {
    console.log(store.getters.getJwt);
    next({ name: "homePage" });
  } else next();
});

export default router;
