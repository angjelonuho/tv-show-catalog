<template>
  <div class="dashboard-view">
    <TVShowCategories :categories="categories" @category-selected="onCategorySelected" :defaultCategory="selectedCategory" />
    <TVShowList v-if="selectedCategory === 'All'" :tv-shows="tvShows" :total-shows="totalShows" :error="error" :loading="loading" />
    <TVShowList v-else :tv-shows="tvShowsByGenre" :total-shows="totalShowsByGenre" :error="tvShowByGenreError" :loading="tvShowByGenreLoading" />
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { useTVShows } from '../composable/useTVShows';
import TVShowList from '../components/TVShowList.vue';
import TVShowCategories from '../components/TVShowCategories.vue';
import { useTVShowCategories } from '../composable/useTVShowCategories';
import { useTVShowsByGenre } from '../composable/useTVShowsGenre';


const { fetchCategories, categories } = useTVShowCategories();
const { tvShowsByGenre, totalShowsByGenre, tvShowByGenreError, tvShowByGenreLoading, fetchTvShowsByGenre } = useTVShowsByGenre();
const { fetchTvShows, tvShows, totalShows, error, loading } = useTVShows();


onMounted(async () => {
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

<style scoped></style>