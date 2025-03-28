<script lang="ts" setup>

</script>

<template>
    <div>
        <h1>To do list</h1>
        <input type="text" placeholder="Add a new task" />
        <button>Add</button>
    </div>
</template>

<style scoped>
    h1 {
        color: white;
    }
    input {
        padding: 10px;
        margin: 10px 0;
        width: 100%;
    }
    button {
        padding: 10px;
        background-color: #333;
        color: #fff;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #555;
    }
</style>