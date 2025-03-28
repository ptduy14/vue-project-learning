<script lang="ts" setup>
    import { defineProps } from 'vue';
    const { todo } = defineProps(['todo']);
</script>       

<template>
    <li>{{ todo.todo }}</li>
</template>

<style scoped>

</style>