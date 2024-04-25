<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import { useTodoStore } from "./stores/todoStore";


const store = useTodoStore();
const { fetchTodos } = store;

onMounted( () => {
  fetchTodos()
});

</script>

<template>
  <h1 class="main-title">To-do Manager</h1>
  <RouterView id="router-view"></RouterView>
  <nav class="navbar">
    <RouterLink class="router" to="/">Accueil | </RouterLink>
    <RouterLink class="router" to="/add">Ajouter | </RouterLink>
    <RouterLink class="router" to="/list">Lister</RouterLink>
  </nav>
</template>

<style scoped>
.main-title {
  margin-top: 20px;
  font-size: 3.5rem;
  color: var(--font-color-white);
}

.navbar {
  font-size: 2rem;
  margin-bottom: 20px; 
}

.router {
  text-decoration: none;
  color: var(--font-color-white);
}

#router-view {
  height: 70%;
  width: 70%;
  border: 4px solid var(--font-color-white);
  border-radius: 35px 0px 35px 0px;
  background-color: var(--body-bg-color);
  padding: 10px;
  color: var(--font-color-white);
  overflow: hidden;
}
</style>
