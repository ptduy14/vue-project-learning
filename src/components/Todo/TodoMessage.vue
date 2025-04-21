<script lang="ts" setup>
    interface ITodoMessageProps {
        addErrorMsg: string | undefined,
        updateErrorMsg: string | undefined,
        deleteErrorMsg: string | undefined,
    }

    const { addErrorMsg, updateErrorMsg, deleteErrorMsg } = defineProps<ITodoMessageProps>()
</script>

<template>
    <div>
        <h1>{{ addErrorMsg ||  updateErrorMsg || deleteErrorMsg}}</h1>
    </div>
</template>
