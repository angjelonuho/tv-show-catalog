<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div class="tv-show-details">
        <div class="tv-show-details-cover">
            <img class="tv-show-details-image" :src="tvShowById?.image?.original" :alt="tvShowById?.name" />
        </div>

        <div class="tv-show-details-info">

            <img class="tv-show-details-info-image" :src="tvShowById?.image?.medium" :alt="tvShowById?.name" />
            <div class="tv-show-details-info-grid">
                <h1 class="tv-show-details-title">{{ tvShowById?.name }}</h1>
                <p class="tv-show-details-summary" v-html="tvShowById?.summary" />

                <div class="tv-show-details-stats">
                    <p class="tv-show-details-stats-title"> <span class="tv-show-details-stats-title-span">Released: </span>
                        {{ tvShowById?.premiered }}</p>
                    <p class="tv-show-details-stats-title"> <span class="tv-show-details-stats-title-span">Genre: </span> {{
                        tvShowById?.genres.join(', ') }}</p>
                    <p class="tv-show-details-stats-title"> <span class="tv-show-details-stats-title-span">Rating: </span>
                        {{ tvShowById?.rating.average || 'no rating' }}</p>
                    <p class="tv-show-details-stats-title"> <span class="tv-show-details-stats-title-span">Duration: </span>
                        {{ tvShowById?.runtime }} min</p>
                </div>
            </div>
        </div>
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
    overflow: hidden;
    display: grid;
    align-items: center;
    justify-items: center;
}

.tv-show-details-cover {
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

.tv-show-details-image {
    z-index: -1;
    position: relative;
    filter: brightness(0.5);
    width: 100vw;
    min-height: 70vh;
}

.tv-show-details-info {
    position: relative;
    z-index: 5;
    color: rgb(255 255 255 / 72%);
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1rem;
    grid-template-areas:
        ". .";

    justify-items: center;
    align-items: center;
    padding: 3rem;

}

.tv-show-details-info-image {
    width: 100%;
    max-width: 400px;
    border-radius: 5%;
    border: 1px solid white;
}

.tv-show-details-title {
    font-size: xxx-large;
    font-weight: 500;
}

.tv-show-details-summary {
    font-size: large;
    font-weight: 500;
}

.tv-show-details-stats-title {
    font-size: large;
    font-weight: 500;

}

.tv-show-details-stats-title-span {
    font-weight: 700;
    color: white;
}

.tv-show-details-stats {
    padding-top: 1rem;
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        ". ."
        ". .";
}

@media (max-width: 768px) {
    .tv-show-details-info {

        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 1rem;
        grid-template-areas:
            "."
            ".";
    }
}</style>