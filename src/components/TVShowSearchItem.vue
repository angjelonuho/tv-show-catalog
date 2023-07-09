<template>
    <div class="tv-show-item">
        <img class="tv-show-item-image" v-if="show.image" :src="show.image.medium" :alt="show.name" />
        <h3 class="tv-show-item-title">{{ show.name }}</h3>
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

<style scoped>
.tv-show-item {
    display: flex;
    ;
}

.tv-show-item-image {
    width: 3rem;
    height: auto;
    margin-right: 1rem;
}

.tv-show-item-title {
    font-size: 1rem;
    font-weight: 500;
    color: #212529;
    ;

}</style>