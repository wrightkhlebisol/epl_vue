import Vue from "vue";
import VueRouter from "vue-router";
import Teams from "../views/Teams.vue";
import Fixtures from "../views/Fixtures.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Teams",
    component: Teams
  },
  {
    path: "/fixtures",
    name: "Fixtures",
    component: Fixtures
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;