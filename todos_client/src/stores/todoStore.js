import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore("todoStore", () => {
  const todos = ref([]);

  return { todos };
});
