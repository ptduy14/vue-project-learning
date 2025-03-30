<script lang="ts" setup>
const inputValue = defineModel('inputValue')
const selectedLimit = defineModel('selectedLimit')
const { isAdding } = defineProps<{
  isAdding: boolean
}>()
const emit = defineEmits(['add-todo'])
</script>

<template>
  <div>
    <h1>To do list</h1>
    <input type="text" placeholder="Add a new task" v-model="inputValue" />
    <div class="action-container">
      <button @click="() => emit('add-todo')" :disabled="isAdding">
        {{ isAdding ? 'Adding' : 'Add' }}
      </button>
      <select name="selected-limit" v-model="selectedLimit">
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  text-align: center;
}

input {
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.action-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #555;
}

button:disabled {
  background-color: #777;
  cursor: not-allowed;
}

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}
</style>
