<script setup>
import { reactive } from "vue";
import axios from "axios";

const props = defineProps(['todoID']);
const emits = defineEmits(['closeModal'])

const updatedTodo = reactive({
  title: "",
  details: "",
});

const todoUpdateHandler = async () => {
   await axios.put(`http://localhost:3000/edit-todo/${props.todoID}` , { updatedTodo });
};
</script>

<template>
  <div class="modal-bg" @click.self="$emit('closeModal')">
    <div class="modal-content">
      <form action="#" @submit.prevent="todoUpdateHandler">
        <div class="label&input">
          <label for="title">Title :</label>
          <input v-model="updatedTodo.title" type="text" id="title" />
        </div>
        <div class="label&input">
          <label for="desc">Description :</label>
          <textarea
            v-model="updatedTodo.details"
            name="desc"
            id="desc"
            cols="30"
            rows="10"
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
        border-radius: 1rem;
        aspect-ratio: 1 / 1;
        background-color: hsl(0, 0%, 95%);
    }</style>
