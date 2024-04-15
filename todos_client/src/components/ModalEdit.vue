<script setup>
import { reactive } from "vue";
import axios from "axios";
import { useTodoStore } from "@/stores/todoStore";
import { storeToRefs } from "pinia";

const store = useTodoStore();
const { todos } = storeToRefs(store);


const props = defineProps(['todo']);
const emits = defineEmits(['closeModal'])

const updatedTodo = reactive({
  title: props.todo.title,
  details: props.todo.details
});

// const todoUpdateHandler = () => {
//   props.todo.title = updatedTodo.title;
//   props.todo.details = updatedTodo.details
// }

const todoUpdateHandler = async () => {
   await axios.put(`http://localhost:7777/edit-todo/${props.todo.id}` , { updatedTodo });
};

</script>

<template>
  <div class="modal-bg" @click.self="$emit('closeModal')">
    <div class="modal-content">
      <form action="#" @submit.prevent="todoUpdateHandler">
        <div class="label-input">
          <label for="title">New Title :</label>
          <input v-model="updatedTodo.title" type="text" id="title" />
        </div>
        <div class="label-input">
          <label for="desc">New Description :</label>
          <textarea
            v-model="updatedTodo.details"
            name="desc"
            id="desc"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <button>Submit</button>
        <button @click="$emit('closeModal')">Close</button>
      </form>
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
