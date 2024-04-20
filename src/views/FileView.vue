<script setup lang="ts">
import { watch, ref } from 'vue';
import ImageUpload from '../components/ImageUpload.vue';
import ControlPanel from '../components/ControlPanel.vue';
import SvgFilter from '../components/SvgFilter.vue';
import useFile from '../composable/useFile';
import useCanvas from '../composable/useCanvas';
import FileDownloadButton from '../components/FileDownloadButton.vue';
import { NORMAL_MAP } from '../utils/colorVisionDeficency.ts';

import { type Filter } from '../composable/useColorVisionDeficiency';

const { fileRef, imageRef, fileName } = useFile();
const copy = ref<string | null>(null);
const { canvasRef, setImageFromDataUrl, applyFilter } = useCanvas();
const downloadFileName = ref<string>('image.png');

watch(fileRef, (newFile) => {
    if (newFile) {
        copy.value = newFile;
        setImageFromDataUrl(newFile);
    }
});

const filter = ref<Filter>({
    name: 'Normal',
    matrix: NORMAL_MAP[0],
});

const changeFileName = (name: string, filter: Filter) => {
    const [
        originalName,
        // ending
    ] = name.split('.')
    // ${filter.intensity?.value}-${filter.intensity?.max}
    return `${originalName}-${filter.name}.jpeg`;
}

watch(filter, () => {
    // console.log("newMatrix", newMatrix);
    if (!copy.value) return;
    setImageFromDataUrl(copy.value);
    applyFilter(`url(#cvd)`);

    downloadFileName.value = changeFileName(fileName.value, filter.value);
});

</script>

<template>
    <div class="">
        <header class="flex justify-between mb-6 items-center">
            <h1 class="text-2xl font-semibold text-gray-900 ">Color Simulation</h1>
            <file-download-button :title="'Download Image'" :fileName="downloadFileName" v-if="fileRef" />
        </header>

        <ImageUpload title="Upload a file" v-if="!fileRef" />

        <div v-else>
            <div class="w-full flex gap-6">

                <div class="w-3/4">
                    <canvas ref="canvasRef" :width="imageRef?.width" :height="imageRef?.height"
                        class="border border-gray-900/25 rounded-lg w-full" />
                </div>

                <ControlPanel class="w-1/4" v-model="filter" />
            </div>
        </div>
        <svg-filter :matrix="filter.matrix" id="cvd" v-if="filter.matrix" />
    </div>
</template>