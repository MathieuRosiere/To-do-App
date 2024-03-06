<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
<RouterLink to="/">Home</RouterLink>
<RouterLink to="/add">Add</RouterLink>
<RouterLink to="/list">List</RouterLink>
<RouterView></RouterView>
</template>

<style scoped>

</style>
