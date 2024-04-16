import { ref } from 'vue';
import { colorVisionDeficiencyMap } from '../utils/colorVisionDeficency';

export const enum ColorVisionDeficiencyType {
    NONE = 'none',
    PROTANOMALY = 'protanomaly',
    DEUTERANOMALY = 'deuteranomaly',
    TRITANOMALY = 'tritanomaly',
    ACHROMATOPSIA = 'achromatopsia',
}

export interface IntensityRange{
    min: number;
    max: number;
}

export interface Filter {
    name: string;
    matrix: string;
    description: string;

}

const useColorVisionDeficiency = () => {

    const intensityRange = ref<IntensityRange>({ min: 1, max: 10 });


    const getFilter = (type: ColorVisionDeficiencyType = ColorVisionDeficiencyType.NONE, intensity: number = 1): Filter => {
        const map = colorVisionDeficiencyMap[type];

        if (!map) {
            throw new Error(`Invalid color vision deficiency type: ${type}`);
        }

        // Get the number of keys in the map
        const keyCount = Object.keys(map).length;

        // Clamp intensity between 1 and keyCount
        const key = Math.min(keyCount, Math.max(1, intensity));

        // Update the intensity range
        intensityRange.value.max = keyCount;

        return {
            name: type.toString(),
            matrix: map[key],
            description: `Color vision deficiency: ${type} (${key}/${keyCount})`,
        };
    }

    return {
        intensityRange,
        getFilter
    }
}


export default useColorVisionDeficiency;