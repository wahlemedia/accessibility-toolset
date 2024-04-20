import { ref, watch } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);


const useCanvas = () => {

    const setCanvas = (canvas: HTMLCanvasElement) => {
        canvasRef.value = canvas;
        ctx.value = canvas.getContext('2d');
    };

    const clearCanvas = () => {
        if (ctx.value) {
            ctx.value.clearRect(0, 0, canvasRef.value?.width as number, canvasRef.value?.height as number);
        }
    }

    const applyFilter = (filter: string) => {
        if (ctx.value) {
            ctx.value.filter = filter;
            ctx.value.drawImage(canvasRef.value as HTMLCanvasElement, 0, 0);
        }
    }

    const setImageFromDataUrl = (dataUrl: string) => {
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => {
            if (ctx.value) {
                ctx.value.drawImage(image, 0, 0);
            }
        }
    }

    const getImageData = (quality = 80): string => {
        if (!canvasRef.value) {
            return '';
        }
        return canvasRef.value.toDataURL('image/png', quality);
    }

    watch(canvasRef, (canvas) => {
        if (canvas) {
            setCanvas(canvas);
        }
    });

    return {
        clearCanvas,
        canvasRef,
        ctx,
        // setCanvas,
        setImageFromDataUrl,
        applyFilter,
        getImageData,
    };
}

export default useCanvas;