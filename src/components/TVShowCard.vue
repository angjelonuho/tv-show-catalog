<template>
    <div>
        <h2>{{ show.name }}</h2>
        <img :src="show.image.medium" :alt="show.name" />
        <p v-html="show.rating.average ?? 'no rating'"></p>
    </div>
</template>

<script setup lang="ts">

defineProps({
    show: {
        type: Object,
        required: true
    }
})


</script>