<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import useColorVisionDeficiency, { ColorVisionDeficiencyType, type Filter } from '../composable/useColorVisionDeficiency';

const { getFilter, intensityRange } = useColorVisionDeficiency();

interface CvdType {
    name: string;
    filter: ColorVisionDeficiencyType;
}

const cvdTypes: CvdType[] = [
    { name: 'Normal', filter: ColorVisionDeficiencyType.NONE },
    { name: 'Protanomaly', filter: ColorVisionDeficiencyType.PROTANOMALY },
    { name: 'Deuteranomaly', filter: ColorVisionDeficiencyType.DEUTERANOMALY },
    { name: 'Tritanomaly', filter: ColorVisionDeficiencyType.TRITANOMALY },
    { name: 'Achromatopsia', filter: ColorVisionDeficiencyType.ACHROMATOPSIA },
];

const model = defineModel<Filter>();

const filter = ref<CvdType>(cvdTypes[0]);
const intensity = ref<number>(1);

watchEffect(() => {
    model.value = getFilter(filter.value.filter, intensity.value);
});


// watch(model, (newModel) => {
//     console.log("newModel", newModel);
//     filter.value = getFilter(newModel?.filter, 1);
// });
</script>


<template>
    <div>
        <RadioGroup v-model="filter" class="mt-2">
            <RadioGroupLabel class="sr-only">Choose a Cvd to Simulate</RadioGroupLabel>
            <div class="grid grid-cols-1 gap-3 xl:grid-cols-2">
                <RadioGroupOption as="template" v-for="type in cvdTypes" :key="type.name" :value="type"
                    v-slot="{ active, checked }">
                    <div
                        :class="[true ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25', active ? 'ring-2 ring-indigo-600 ring-offset-2' : '', checked ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50', 'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1']">
                        <RadioGroupLabel as="span">{{ type.name }}</RadioGroupLabel>
                    </div>
                </RadioGroupOption>
            </div>
        </RadioGroup>

        <div v-if="intensityRange.max > 1" class="mt-10">
            <label for="intensity" class="block mb-2 text-sm font-medium text-gray-900">Default
                range {{ model?.description }}</label>
            <input id="intensity" type="range" :min="intensityRange.min" :max="intensityRange.max" step="1"
                v-model="intensity" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ">
        </div>


    </div>
</template>