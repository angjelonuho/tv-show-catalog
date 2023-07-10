<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else class="tv-show-favourite-container" @click="routerPush('tvshow', { slug: String(mostRatedTVShow.id) })">

        <div class="tv-show-favourite-cover">
            <img class="tv-show-favourite-image" :src="mostRatedTVShow?.image?.original" :alt="mostRatedTVShow?.name" />
        </div>

        <div class="tv-show-favourite-info">
            <h1 class="tv-show-favourite-name">{{ mostRatedTVShow?.name }}</h1>
            <h1 class="tv-show-fagourite-rating"> {{ mostRatedTVShow?.rating.average || 'no rating' }} </h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SortDirection, useSortByProperty } from '../composable/useSortByProperty';
import { routerPush } from '../router';

const props = defineProps({
    tvShows: {
        type: Array as () => TVShow[],
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

const mostRatedTVShow = computed(() => {
    const sortedShows = useSortByProperty(props.tvShows, 'rating.average', SortDirection.Descending);
    return sortedShows[0];

});

</script>

<style scoped>
.tv-show-favourite-container {
    position: relative;
    overflow: hidden;
    display: grid;
    align-items: center;
    justify-items: center;
    height: 50vh;
    border-radius: 40px;
    cursor: pointer;
}

.tv-show-favourite-cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .99;

    &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 200px;
        background: linear-gradient(0deg, #13151a 0, rgba(19, 21, 26, 0) 100%);
    }
}

.tv-show-favourite-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.tv-show-favourite-info {
    position: relative;
    z-index: 1;
    display: flex;
    padding: 2rem;
    color: #ffffff;
    width: 100%;
    height: 100%;
    align-items: flex-start;

}

.tv-show-favourite-name {
    font-size: 5rem;
    font-weight: 700;
    margin: 2rem 0;
    padding: 0;
    color: #ffffff;
    position: relative;
    z-index: 5;

}

.tv-show-fagourite-rating {
    color: #FFD700;
    font-size: 5rem;
    font-weight: 700;
}
</style>