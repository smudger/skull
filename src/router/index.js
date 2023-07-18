import { createRouter, createWebHistory } from "vue-router";
import TheHome from "@/Pages/TheHome.vue";
import TheNotFound from "@/Pages/TheNotFound.vue";
import TheGame from "@/Pages/TheGame.vue";

const routes = [
  { path: "/", name: "Home", component: TheHome },
  {
    path: "/games/:id",
    name: "Game",
    component: TheGame,
    props: (route) => ({ id: route.params.id, code: route.query.code }),
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: TheNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
