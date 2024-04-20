<script setup lang="ts">

interface Props {
    type?: 'button' | 'submit' | 'reset';
    title?: string;
    loading?: boolean;
}

withDefaults(defineProps<Props>(), {
    title: 'Button',
    type: 'button',
    loading: false,
});

const event = defineEmits(['click']);

</script>

<template>
    <button :type="type" :class="[
        loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        'rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    ]" @click="$emit('click')">
        <slot name="loading" v-if="loading">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <!-- <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5"></path> -->
            </svg>
        </slot>
        <slot v-else>
            {{ title }}
        </slot>
    </button>
</template>