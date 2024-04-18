<script setup>
import { ref, reactive, computed } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const store = useTodoStore();
const { postTodo } = store;


const newTodo = reactive({
  title: "",
  details: "",
  date: ""
});

// console.log(Date.parse('2024-04-17T15:15'));

// console.log(formatteddate.value);

const postTodoHandler = () => {
  console.log(newTodo);
  postTodo(newTodo);
  newTodo.title = "";
  newTodo.details = "";
};
</script>

<template>
  <main>
    <h3>Ajouter une nouvelle todo...</h3>
    <form action="#" @submit.prevent="postTodoHandler">
      <div class="label-input">
        <label for="title">Titre :</label>
        <input v-model="newTodo.title" type="text" id="title" />
      </div>
      <div class="label-input">
        <label for="desc">Description :</label>
        <textarea
          v-model="newTodo.details"
          name="desc"
          id="desc"
          cols="30"
          rows="5"
        ></textarea>
      </div>
      <div>
        <label for="date">Date limite :</label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          v-model.date="newTodo.date"
        />
      </div>
      <button>Valider</button>
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
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  overflow: auto;
}

.label-input {
  display: flex;
  flex-flow: column nowrap;
}

textarea {
  resize: none;
}
</style>
