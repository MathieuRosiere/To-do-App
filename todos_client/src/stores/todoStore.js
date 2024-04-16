import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useTodoStore = defineStore("todoStore", () => {
  const todos = ref([]);
  const API_BASE_URL = "http://localhost:7777";

  const fetchTodos = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/get-todo`);
      todos.value = result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const postTodo = async (newTodo) => {
    try {
      const result = await axios.post(`${API_BASE_URL}/add-todo`, { newTodo });
      if (result.status === 200) {
        fetchTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const result = await axios.delete(`${API_BASE_URL}/delete-todo/${id}`);
      if (result.status === 200) {
        todos.value = todos.value.filter((t) => t.id != id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const result = await axios.put(`${API_BASE_URL}/edit-todo/${id}`, {
        updatedTodo,
      });
      if (result.status === 200) {
        const todoToEdit = todos.value.find((t) => t.id === id);
        todoToEdit.title = updatedTodo.title;
        todoToEdit.details = updatedTodo.details;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { todos, fetchTodos, deleteTodo, updateTodo, postTodo };
});
