import { ref } from 'vue';

const fileRef = ref<string | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);

const useFile = () => {

    const fileUpload = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (files) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const result = event.target?.result as string;

                fileRef.value = result;

                console.log('File:', file);
                getImage(result);
            };

            reader.readAsDataURL(file);
        }
    };

    const getImage = (data: string) => {
        const image = new Image();

        image.src = data;

        image.onload = () => {
            imageRef.value = image;
            console.log('Image width:', image.width);
            console.log('Image height:', image.height);
        }
    }

    const fileDownload = (file: string, filename: string) => {
        const link = document.createElement('a');
        link.href = file;
        link.download = filename;
        link.click();
    }

    const clear = () => {
        fileRef.value = null;
        imageRef.value = null;
    }

    return {
        imageRef,
        fileRef,
        fileUpload,
        fileDownload,
        clear,
    };
}

export default useFile;