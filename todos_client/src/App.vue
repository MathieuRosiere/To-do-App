<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <h1 class="main-title">To-do Manager</h1>
  <VueQueryDevtools/>
  <RouterView id="router-view"></RouterView>
  <nav class="navbar">
    <RouterLink to="/">Home | </RouterLink>
    <RouterLink to="/add">Add Todo | </RouterLink>
    <RouterLink to="/list">List</RouterLink>
  </nav>
</template>

<style scoped>
.main-title {
  margin-top: 20px;
  font-size: 3.5rem;
}

.navbar {
    font-size: 2rem;
  margin-bottom: 20px;
}

#router-view {
  height: 70%;
  width: 70%;
  border: 2px solid var(--font-color-black);
  border-radius: 35px 0px 35px 0px;
  background-color: var(--primary);
  padding: 10px;
  color: var(--font-color-white);
  overflow: hidden;
}
</style>
