<template>
    <div class="tv-show-cat">
        <ul class="tv-show-cat-ul">
            <li class="tv-show-cat-li" v-for="category in categories" :key="category"
                :class="{ 'selected': selectedCategory === category }" @click="selectCategory(category)">{{ category }}</li>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    categories: {
        type: Array as () => string[],
        required: true
    },
    defaultCategory: {
        type: String,
        default: '',
        required: false
    }
});

const emit = defineEmits(['category-selected']);
const selectedCategory = ref<string>(props.defaultCategory);

const selectCategory = (category: string) => {
    selectedCategory.value = category;
    emit('category-selected', category);
};

</script>
  
<style scoped>
.tv-show-cat {
    margin: 2rem 0;
}

.tv-show-cat-ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
}

.tv-show-cat-li {
    display: block;
    color: #0f0f0f;
    border-radius: 6px;
    background: rgb(0 0 0/ 5%);
    padding: .2rem .5rem .4rem .5rem;
    font-weight: 400;
    cursor: pointer;

    &:hover {
        background: rgb(0 0 0/ 10%);
    }

    &.selected {
        background: black;
        color: white;
    }
}
</style>
  