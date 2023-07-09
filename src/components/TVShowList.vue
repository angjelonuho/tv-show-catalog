<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else-if="totalShows === 0">No shows found</div>

  <ul v-else class="tv-show-ul">
    <li v-for="show in tvShows" :key="show.id">
      <TVShowCard :show="show" />
    </li>
  </ul>
</template>
  
<script setup lang="ts">
import TVShowCard from './TVShowCard.vue';

import { useTVShowsByGenre } from '../composable/useTVShowsGenre';
import { onMounted } from 'vue';

const { tvShows, totalShows, error, loading, fetchTvShows, } = useTVShowsByGenre('Comedy');


onMounted(async () => {
  await fetchTvShows();
});


</script>
  
<style scoped>
.tv-show-ul {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  list-style: none;
  margin: 0;
}
</style>
  