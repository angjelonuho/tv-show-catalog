<template>
  <div class="dashboard-view">
    <TVShowCategories :categories="categories" @category-selected="onCategorySelected" />
    <TVShowList :tv-shows="tvShows" :total-shows="totalShows" :error="error" :loading="loading" />
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { useTVShows } from '../composable/useTVShows';
import TVShowList from '../components/TVShowList.vue';
import TVShowCategories from '../components/TVShowCategories.vue';
import { useTVShowCategories } from '../composable/useTVShowCategories';
import { useTVShowsByGenre } from '../composable/useTVShowsGenre';

const selectedCategory = ref('');
const { fetchCategories, categories } = useTVShowCategories();
const { tvShows, totalShows, error, loading, fetchTvShowsByGenre } = useTVShowsByGenre();
const { fetchTvShows } = useTVShows();

onMounted(async () => {
  await fetchTvShows();
  await fetchCategories();

});

watch(selectedCategory, async () => {
  await fetchTvShowsByGenre(selectedCategory.value);
});

const onCategorySelected = (category: string) => {
  selectedCategory.value = category;
};

</script>

<style scoped></style>