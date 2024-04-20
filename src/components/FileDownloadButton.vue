<script setup lang="ts">
import { ref, watch } from 'vue';
import CustomButton from '../components/CustomButton.vue';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/solid';

import useCanvas from '../composable/useCanvas'

const { getImageData } = useCanvas();

const data = ref<string | null>(null);

interface Props {
    title: string;
    fileName: string;
}

const loading = ref<boolean>(false);

const props = defineProps<Props>();

const fileDownload = () => {
    loading.value = true;

    const a = document.createElement('a');
    data.value = getImageData();
    a.href = getImageData();

    a.download = props.fileName;
    a.click();
};

watch(loading, () => {
    setTimeout(() => {
        loading.value = false;
    }, 2000);
});


</script>

<template>
    <custom-button @click="fileDownload" aria-label="Download File" :loading="loading">
        <arrow-down-tray-icon class="h-5 w-5" aria-hidden="true" />
    </custom-button>
</template>