<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else-if="totalShows === 0">No shows found</div>

  <ul v-else class="tv-show-ul">
    <li class="tv-show-li" v-for="show in sortedShows" :key="show.id" @click="routerPush('tvshow', { slug: String(show.id) })">
      <TVShowCard :show="show" />
    </li>
  </ul>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import { routerPush } from '../router';
import TVShowCard from './TVShowCard.vue';
import { SortDirection, useSortByProperty } from '../composable/useSortByProperty';


const props = defineProps({
  tvShows: {
    type: Array as () => TVShow[],
    required: true
  },
  totalShows: {
    type: Number,
    required: true
  },
  error: {
    type: String,
    required: false
  },
  loading: {
    type: Boolean,
    required: true
  }
});

const sortedShows = computed(() => {
  return useSortByProperty(props.tvShows, 'rating.average', SortDirection.Descending);
});

</script>
  
<style scoped>
.tv-show-ul {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}

.tv-show-li {
  cursor: pointer;
}
</style>
  