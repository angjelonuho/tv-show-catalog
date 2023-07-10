<template>
    <div class="tv-show-item">
        <img class="tv-show-item-image" v-if="show.image" :src="show.image.medium" :alt="show.name" />
        <img class="tv-show-item-image" v-else src="https://via.placeholder.com/210x295?text=No%20Image" :alt="show.name" />
        <h3 class="tv-show-item-title">{{ show.name }} ({{ premieredYear }})</h3>
        <p class="tv-show-item-genre">{{ show.genres.join(' ') }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
    show: {
        type: Object,
        required: true
    }
})
const premieredYear = computed(() => {
    return props.show.premiered?.split('-')[0] ?? 'no year';
})
</script>

<style scoped>
.tv-show-item {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 0fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
        "a b"
        "a c";
}

.tv-show-item-image {
    width: 3rem;
    height: auto;
    margin-right: 1rem;
    grid-area: a;
}

.tv-show-item-title {
    font-size: 1rem;
    font-weight: 500;
    color: #212529;
    grid-area: b;

}

.tv-show-item-genre {
    font-size: .8rem;
    color: #6c757d;
    font-weight: 400;
    grid-area: c;
}
</style>