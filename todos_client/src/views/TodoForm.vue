<script setup>
import { reactive, computed } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const store = useTodoStore();
const { addTodo } = store;


const newTodo = reactive({
  title: "",
  details: "",
  date: ""
});

const addTodoHandler = () => {
  addTodo(newTodo);
  newTodo.title = "";
  newTodo.details = "";
};
</script>

<template>
  <main>
    <h3>Ajouter une nouvelle todo...</h3>
    <form action="#" class="display-flex-col" @submit.prevent="addTodoHandler">
      <div class="label-input">
        <label for="title">Titre :</label>
        <input v-model="newTodo.title" type="text" id="title" minlength="4" required/>
      </div>
      <div class="label-input">
        <label for="desc">Description :</label>
        <textarea
          v-model="newTodo.details"
          name="desc"
          id="desc"
          cols="30"
          rows="5"
          minlength="4"
          required
        ></textarea>
      </div>
      <div class="label-input">
        <label for="date">Date limite :</label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          v-model.date="newTodo.date"
          required
        />
      </div>
      <button class="btn-valid">Valider</button>
    </form>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

form {
  width: 40%;
  height: 70%;
  gap: 5px;
  overflow: auto;

  > button {
    width: 60%;
    margin-top: 1rem;
    align-self: center;
  }
}

.label-input {
  display: flex;
  flex-flow: column nowrap;
}

textarea {
  resize: none;
}
</style>
