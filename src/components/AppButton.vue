<script setup lang="ts">

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
    },
});

const handleClick = () => {
    console.log('Button clicked!');
};
</script>

<template>
    <button class="app-button" :class="props.buttonClass" @click="handleClick">
        {{ props.buttonText }}
    </button>
</template>