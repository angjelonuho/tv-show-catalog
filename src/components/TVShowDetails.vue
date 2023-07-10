<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div class="tv-show-details">
        <img class="tv-show-details-image" :src="tvShowById?.image?.original" :alt="tvShowById?.name" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useTVShowById } from '../composable/useTVShowsById';

const route = useRoute()
const slug = route.params.slug as string
const { tvShowById, loading, error, fetchTVShowById } = useTVShowById()


onMounted(async () => {
    await fetchTVShowById(slug)
})



</script>

<style scoped>
.tv-show-details {
    position: relative;
}

.tv-show-details-image {
    width: 100vw;

}
</style>