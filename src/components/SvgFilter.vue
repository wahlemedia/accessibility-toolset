<script setup lang="ts">
interface Props {
   matrix: string;
   id: string;
}

defineProps<Props>();
</script>

<template>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="0">
        <filter :id="id">
            <feColorMatrix type="matrix" :values="matrix" />
        </filter>
    </svg>
</template>