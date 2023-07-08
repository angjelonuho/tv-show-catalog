<template>
    <div class="tv-show-card">
        <figure class="tv-show-figure">
            <img :src="show.image.medium" :alt="show.name" class="tv-show-poster" />
            <span class="tv-show-year" v-html="premieredYear" />
            <span class="tv-show-rating" v-html="show.rating.average ?? 'no rating'" />
            <div class="tv-show-text">
                <h3 class="tv-show-title">{{ show.name }}</h3>
                <h5 class="tv-show-genres">{{ showGenres }}</h5>
            </div>
        </figure>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
    show: {
        type: Object,
        required: true
    }
})

const premieredYear = computed(() => {
    return props.show.premiered?.split('-')[0] ?? 'no year';
})

const showGenres = computed(() => {
    return props.show.genres.join(', ');
})

</script>

<style scoped>
.tv-show-card {
    color: black;
    position: relative;
}

.tv-show-figure {
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem rgb(207 206 206);
    display: flex;
}

.tv-show-poster {
    height: auto;
    width: 100%;
    vertical-align: middle;
    filter: brightness(.5);
}

.tv-show-year {
    background-color: rgb(0 0 0 / 69%);
    border-radius: 0.5rem;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    position: absolute;
    align-self: flex-start;
    left: 0.5rem;
    top: 0.5rem;
}

.tv-show-rating {
    background-color: rgb(0 0 0 / 69%);
    border-radius: 0.5rem;
    color: #FFD700;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    position: absolute;
    align-self: flex-start;
    right: 0.5rem;
    top: 0.5rem;
}

.tv-show-text {
    position: absolute;
    align-self: flex-end;
    width: 100%;
    padding: 1rem;
}

.tv-show-title {
    color: white;
    font-weight: 500;
    text-align: center;
}

.tv-show-genres {
    color: #b5b5b5;
    text-align: center;
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-weight: bolder;
    font-variant: all-petite-caps;
}
</style>