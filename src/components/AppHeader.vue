<template>
    <h1 class="header-title">{{ title }}</h1>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    }
});

</script>

<style scoped>
.header-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 2rem 0;
    padding: 0;
    color: #000000;
}
</style>