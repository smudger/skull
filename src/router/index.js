import { createRouter, createWebHistory } from "vue-router";
import TheHome from "@/Pages/TheHome.vue";
import TheAbout from "@/Pages/TheAbout.vue";
import TheNotFound from "@/Pages/TheNotFound.vue";

const routes = [
  { path: "/", name: "Home", component: TheHome },
  { path: "/about", name: "About", component: TheAbout },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: TheNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
