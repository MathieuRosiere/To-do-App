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
    <h1 class="main-title content-center">To-do Manager</h1>
    <nav class="navbar display-flex-row">
      <div class="router-underline">
        <RouterLink class="router" to="/">Accueil</RouterLink>
        <div class="underline"></div>
      </div>
      <div class="router-underline">
        <RouterLink class="router" to="/add">Ajouter</RouterLink>
        <div class="underline"></div>
      </div>
      <div class="router-underline">
        <RouterLink class="router" to="/list">Liste</RouterLink>
        <div class="underline"></div>
      </div>
    </nav>
    <img src="/img/logo.png" alt="logo">
  </header>
  <main>
    <RouterView id="router-view" v-slot="{ Component }">
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

  > img {
    height: 80%;
    position: relative;
    left: 10rem;
  }
}

main {
  width: 100%;
  height: 80%;
  background-color: var(--body-bg-color);
}

.main-title {
  flex: 0.25;
  font-size: 3rem;
  color: var(--primary);
}

.navbar {
  flex: 0.20;
  font-size: 1.3rem;
  justify-content: space-around;

  > div .router.router-link-active {
    color: var(--secondary);
    opacity: 1;
  }
}

.router {
  text-decoration: none;
  color: var(--font-color-black);
  opacity: 0.75;
  transition: opacity 500ms ease;
}

.underline {
  background-color: var(--secondary);
  height: 5px;
  width: 0%;
  transition: width 500ms ease;
}

.router-underline:hover {
  > .router {
    opacity: 1;
  }
  > .underline {
    width: 100%;
  }
}

#router-view {
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--secondary) var(--darker-bg-color);
  padding: 1rem 5rem 1rem 5rem;
}

.switch-view-enter-active,
.switch-view-leave-active {
  transition: opacity 0.4s ease;
}

.switch-view-enter-from,
.switch-view-leave-to {
  opacity: 0;
}

footer {
  width: 100%;
  height: 10%;
  background-color: var(--darker-bg-color);
  border-top: 2px solid var(--accent);
}
</style>
