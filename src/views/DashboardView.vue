<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <Header title="Most liked TV Show" />
      <TVShowSearch />
    </div>
    <TVShowMostLiked :tv-shows="tvShows" :error="error" :loading="loading" />
    <TVShowCategories :categories="categories" @category-selected="onCategorySelected"
      :defaultCategory="selectedCategory" />
    <TVShowList v-if="selectedCategory === 'All'" :tv-shows="tvShows" :total-shows="totalShows" :error="error"
      :loading="loading" />
    <TVShowList v-else :tv-shows="tvShowsByGenre" :total-shows="totalShowsByGenre" :error="tvShowByGenreError"
      :loading="tvShowByGenreLoading" />
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { useTVShows } from '../composable/useTVShows';
import TVShowList from '../components/TVShowList.vue';
import TVShowCategories from '../components/TVShowCategories.vue';
import { useTVShowCategories } from '../composable/useTVShowCategories';
import { useTVShowsByGenre } from '../composable/useTVShowsByGenre';
import TVShowSearch from '../components/TVShowSearch.vue';
import TVShowMostLiked from '../components/TVShowMostLiked.vue';
import Header from '../components/AppHeader.vue';

const { fetchCategories, categories } = useTVShowCategories();
const { tvShowsByGenre, totalShowsByGenre, tvShowByGenreError, tvShowByGenreLoading, fetchTvShowsByGenre } = useTVShowsByGenre();
const { fetchTvShows, tvShows, totalShows, error, loading } = useTVShows();


onMounted(async () => {
  // fetthing tv shows for to prepare for caching
  await fetchTvShows();
  await fetchCategories();

});

const selectedCategory = ref('All');
watch(selectedCategory, async () => {
  await fetchTvShowsByGenre(selectedCategory.value);
});

const onCategorySelected = (category: string) => {
  selectedCategory.value = category;
};

</script>

<style scoped>
.dashboard-view {
  width: 90vw;
  margin: 0 auto;
}

.dashboard-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  margin: 0;
  padding: .5rem;
  border-radius: 6px;
}

@media screen and (max-width: 768px) {
  .dashboard-header {
    gap: 0;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "."
      ".";
  }
}
</style>../composable/useTVShowsByGenre