<script lang="ts" setup>
    import TodoItem from './TodoItem.vue';
    import { defineProps } from 'vue';
    
    const { todos, isLoading} = defineProps(['todos', 'isLoading']);
</script>

<template>
    <div v-if="isLoading">Loading</div>
    <div v-else-if="!todos">Cannot fetching to do list</div>
    <ul v-else>
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
</template>

<style scoped>

</style>