import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useTodoStore = defineStore("todoStore", () => {
  const todos = ref([]);
  const API_BASE_URL = "http://localhost:7777";

  const fetchTodos = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/todos`);
      todos.value = result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const result = await axios.post(`${API_BASE_URL}/todos`, { newTodo });
      if (result.status === 200) {
        fetchTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (id) => {
    try {
      const result = await axios.delete(`${API_BASE_URL}/todos/${id}`);
      if (result.status === 200) {
        todos.value = todos.value.filter((todo) => todo.id != id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id, updatedTodo) => {
    try {
      const result = await axios.put(`${API_BASE_URL}/todos/${id}`, {
        updatedTodo,
      });
      if (result.status === 200) {
        const todoToEdit = todos.value.find((todo) => todo.id === id);
        todoToEdit.title = updatedTodo.title;
        todoToEdit.details = updatedTodo.details;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { todos, fetchTodos, removeTodo, editTodo, addTodo };
});
