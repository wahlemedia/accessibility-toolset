<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasPreviewRef = ref<HTMLCanvasElement | null>(null);
const fileRef = ref<string | null>(null);

let context: CanvasRenderingContext2D;
let contextPreview: CanvasRenderingContext2D;

onMounted(() => {
    context = canvasRef.value?.getContext('2d')!;
    contextPreview = canvasPreviewRef.value?.getContext('2d')!;
})

const PROTANOMALY_FILTER = "0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0";
const PROTANOMALY_MAP = "0.152286 1.052583 -0.204868 0.114503 0.786281 0.099216 -0.003882 -0.048116 1.051998 ";


const matrixRef = ref(PROTANOMALY_FILTER);

// watch(fileRef, (newFile) => {
//     if (newFile) {
//         context?.clearRect(0, 0, 800, 600);
//         const image = new Image();
//         image.src = newFile;
//         image.onload = () => {
//             context?.drawImage(image, 0, 0, 800, 600);
//             // contextPreview?.drawImage(image, 0, 0, 800, 600);

//         };
//         // console.log(newFile);
//     }
// });

const fileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const result = event.target?.result as string;
            fileRef.value = result;
        };
        reader.readAsDataURL(file);
    }
};

const fileDownload = () => {
    const dataURL = canvasRef.value?.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL as string;
    a.download = 'image.png';
    a.click();
};

const applyFilter = () => {
    // const imageData = context?.getImageData(0, 0, 800, 600);
    // const data = imageData?.data;
    console.log(matrixRef.value);

    if (context) {
        context.filter = `url(#cvd)`;
        context.drawImage(canvasRef.value as HTMLCanvasElement, 0, 0);
    }

};



</script>

<template>
    <div>
        <h1>Home</h1>
        <canvas ref="canvasRef" width="800" height="600"></canvas>

        <!-- <canvas ref="canvasPreviewRef" width="800" height="600"></canvas> -->

        <input type="file" @change="fileUpload" />

        <div class="space-x-2 mt-4">
            <button type="button"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="applyFilter">Apply PROTANOMALY filter</button>
            <button type="button"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="fileDownload">Download</button>
        </div>
    </div>

    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="0">
        <filter id="cvd">
            <feColorMatrix type="matrix" :values="matrixRef" />
        </filter>
    </svg>
</template>
