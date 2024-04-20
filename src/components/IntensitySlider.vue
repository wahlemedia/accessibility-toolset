<script setup lang="ts">
import { defineProps } from 'vue';
import type { Filter, IntensityRange } from '../composable/useColorVisionDeficiency';

interface Props {
    filter: Filter;
    intensityRange: IntensityRange;
}

defineProps<Props>();

const intensity = defineModel();

</script>
<template>
    <label for="intensity" class="block mb-2 text-sm font-medium text-gray-900">
        Color vision deficiency: {{ filter?.name }} <span class="text-gray-600">
            ({{ filter?.intensity?.value }}/{{ filter?.intensity?.max }})
        </span>
    </label>
    <input id="intensity" type="range" :min="intensityRange.min" :max="intensityRange.max" step="1" v-model="intensity"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        aria-describedby="intensity-description">
    <p class="mt-2 text-sm text-gray-500" id="intensity-description">
        Select the intensity of the simulation
    </p>
</template>