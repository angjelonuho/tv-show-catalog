<template>
    <div class="tv-show-search">
        <input class="tv-show-input" type="text" placeholder="Search for a TV Show" v-model="searchQuery"
            @input="handleSearch" />
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>

        <ul class="tv-show-search-ul" v-else-if="searchResults.length > 0">
            <li v-for="item in searchResults" :key="item">
                <TVShowSearchItem :show="item" />
            </li>
        </ul>

    </div>
</template>
  
<script setup lang="ts">
import { useSearch } from '../composable/useSearch';
import TVShowSearchItem from './TVShowSearchItem.vue';


const { searchResults, loading, error, search, searchQuery } = useSearch();

const handleSearch = async () => {
    if (searchQuery.value.length === 3) {
        await search();
    }
};


</script>

<style scoped>
.tv-show-search {
    margin: 2rem 0;
}

.tv-show-input {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    margin: 0;
    padding: .5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
}

.tv-show-search-ul {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    list-style: none;
    gap: 1rem;
    padding: 1rem 0 1rem 0;
    margin: 1rem 0;
    background: white;
    position: absolute;
    z-index: 1;
    width: 90vw;
    overflow-x: hidden;
    height: 40vh;
    border: 7px solid white;
    border-radius: 20px;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
  