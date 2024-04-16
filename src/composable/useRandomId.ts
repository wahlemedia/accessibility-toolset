import { onMounted, ref } from 'vue';

const useRandomId = () => {
    
    const randomId = ref<string>();

    const generate = (value?: string) => {
        randomId.value = Math.random().toString(36).substring(2, 9);

        if (value) {
            randomId.value = `${value}-${randomId.value}`;
        }

        return randomId.value;
    };

    onMounted(() => {
        generate();
    });

    return { randomId, generate };
}

export default useRandomId;

