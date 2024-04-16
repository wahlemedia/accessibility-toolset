<script setup lang="ts">

interface Props {
    type?: 'button' | 'submit' | 'reset';
    title: string;
}

withDefaults(defineProps<Props>(), {
    title: 'Button',
    type: 'button'
});

const event = defineEmits(['click']);

</script>

<template>
    <button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {{ title }}
    </button>
</template>