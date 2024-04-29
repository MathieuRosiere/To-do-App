<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, Transition } from "vue";
import { useTodoStore } from "./stores/todoStore";

const store = useTodoStore();
const { fetchTodos } = store;

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <header class="display-flex-row">
    <h1 class="main-title">To-do Manager</h1>
    <nav class="navbar display-flex-row">
      <RouterLink class="router" to="/">Accueil</RouterLink>
      <RouterLink class="router" to="/add">Ajouter</RouterLink>  
      <RouterLink class="router" to="/list">Liste</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView id="router-view" v-slot="{ Component}">
    <Transition name="switch-view" mode="out-in">
    <component :is="Component"></component>
    </Transition>
    </RouterView>
  </main>
  <footer class="content-center">
    <h3>Powered by LeColonDeJack</h3>
  </footer>
</template>

<style scoped>
header {
  height: 10%;
  width: 100%;
  align-items: center;
  background-color: var(--darker-bg-color);
  border-bottom: 2px solid var(--accent);
}

.main-title {
  font-size: 3rem;
  color: var(--primary);
  margin-left: 30px;
  margin-right: 75px;
}

.navbar {
  font-size: 1.3rem;

  > .router.router-link-active {
    color: var(--secondary);
  }
}

.router {
  text-decoration: none;
  color: var(--font-color-black);
  margin-right: 2rem;
  opacity: 0.75;
  transition: 300ms;
}

.router:hover {
  opacity: 1;
}

main {
  width: 100%;
  height: 80%;
  background-color: var(--body-bg-color);
}

#router-view {
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color:var(--secondary) var(--darker-bg-color) ;
  padding: 1rem 5rem 1rem 5rem;
}

.switch-view-enter-active,
.switch-view-leave-active {
  transition: opacity 0.4s ease;
}

.switch-view-enter-from,
.switch-view-leave-to {
  opacity:0;
}


footer {
  width: 100%;
  height: 10%;
  background-color: var(--darker-bg-color);
  border-top: 2px solid var(--accent);
}
</style>
