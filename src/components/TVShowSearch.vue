<template>
    <div class="tv-show-search">
        <input class="tv-show-input" type="text" placeholder="Search for a TV Show" v-model="searchQuery"
            @input="handleSearch" />
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>

        <ul class="tv-show-search-ul" v-else-if="searchResults.length > 0 && showResults">
            <li class="tv-show-search-li" v-for="item in searchResults" :key="item.id"
                @click="routerPush('tvshow', { slug: String(item.id) })">
                <TVShowSearchItem :show="item" />
            </li>
        </ul>

    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSearch } from '../composable/useSearch';
import { routerPush } from '../router';
import TVShowSearchItem from './TVShowSearchItem.vue';
const showResults = ref(true);

const { searchResults, loading, error, search, searchQuery } = useSearch();

const handleSearch = async () => {
    showResults.value = true;
    if (searchQuery.value.length > 2) {
        await search();
    }
};

onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});

const handleClickOutside = (event: any) => {
    const searchContainer = document.querySelector('.tv-show-search');
    if (!searchContainer?.contains(event.target)) {
        showResults.value = false;
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
    padding: 1rem;
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
    background: white;
    position: absolute;
    width: 90vw;
    overflow-x: hidden;
    height: 40vh;
    border: 7px solid white;
    border-radius: 20px;
    margin: 2rem 0rem 1rem -16rem;
    width: 30rem;
    z-index: 5;

    &::-webkit-scrollbar {
        display: none;
    }
}

.tv-show-search-li {
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1;
    }

}

@media (max-width: 768px) {
    .tv-show-search-ul {
        width: 90vw;
    }

    .tv-show-search-ul {
        margin: 2rem -0.5rem;
    }
}
</style>
  