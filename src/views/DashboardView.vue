<template>
  <div class="dashboard-view">
    <TVShowList />
  </div>
</template>

<script setup lang="ts">
import TVShowList from '../components/TVShowList.vue';
import { onMounted } from 'vue';
import { useTVShows } from '../composable/useTVShows';

const { fetchTvShows } = useTVShows();

onMounted(async () => {
  await fetchTvShows();
});

</script>

<style scoped></style>