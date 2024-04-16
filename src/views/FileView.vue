<script setup lang="ts">
import { watch, ref } from 'vue';
import ImageUpload from '../components/ImageUpload.vue';
import ControlPanel from '../components/ControlPanel.vue';
import SvgFilter from '../components/SvgFilter.vue';
import useFile from '../composable/useFile';
import useCanvas from '../composable/useCanvas';

import { type Filter } from '../composable/useColorVisionDeficiency';

const { fileRef, imageRef } = useFile();
const copy = ref<string | null>(null);
const { canvasRef, setImageFromDataUrl, applyFilter } = useCanvas();

watch(fileRef, (newFile) => {
    console.log("newFile", newFile);
    if (newFile) {
        copy.value = newFile;
        setImageFromDataUrl(newFile);
    }
});

const matrix = ref<Filter>({
    name: 'Normal',
    matrix: "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0",
    description: '(1/1)'
});

watch(matrix, () => {
    // console.log("newMatrix", newMatrix);
    if(!copy.value) return;
    setImageFromDataUrl(copy.value);
    applyFilter(`url(#cvd)`);
});

</script>

<template>
    <div class="">
        <h1 class="text-2xl font-semibold text-gray-900 mb-4">Color Simulation</h1>

        <ImageUpload title="Upload a file" v-if="fileRef == null" />

        <div class="w-full flex gap-6" v-else>
            <div class="w-3/4">
                <canvas ref="canvasRef" :width="imageRef?.width" :height="imageRef?.height"
                    class="border border-gray-900/25 rounded-lg mt-4 w-full" />
            </div>

            <ControlPanel class="w-1/4" v-model="matrix" />
        </div>

        <svg-filter :matrix="matrix.matrix" id="cvd" />
    </div>
</template>