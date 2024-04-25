<script setup>
import { reactive } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const store = useTodoStore();
const { editTodo } = store;

const props = defineProps(["todo"]);
const emits = defineEmits(["closeModal"]);

const updatedTodo = reactive({
  title: props.todo.title,
  details: props.todo.details,
});
</script>

<template>
  <div class="modal-bg" @click.self="$emit('closeModal')">
    <div class="modal-content">
      <form action="#" @submit.prevent="editTodo(props.todo.id, updatedTodo)">
        <div class="label-input">
          <label for="title">Modifier Titre :</label>
          <input v-model="updatedTodo.title" type="text" id="title" />
        </div>
        <div class="label-input">
          <label for="desc">Modifier Description :</label>
          <textarea
            v-model="updatedTodo.details"
            name="desc"
            id="desc"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <button>Valider</button>
      </form>
      <button @click="$emit('closeModal')">Fermer</button>
    </div>
  </div>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  place-content: center;
}

.modal-content {
  height: 600px;
  padding: 5%;
  box-sizing: border-box;
  border: solid 4px var(--font-color-white);
  border-radius: 1rem;
  aspect-ratio: 1 / 1;
  background-color: var(--body-bg-color);
  display: flex;
  flex-flow: column nowrap;
}

form {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
}

.label-input {
  display: flex;
  flex-flow: column nowrap;
}

textarea {
  resize: none;
}
</style>
