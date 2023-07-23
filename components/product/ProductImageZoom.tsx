import { useSignal } from "@preact/signals";
import Image from "deco-sites/std/components/Image.tsx";
import Modal from "$store/components/ui/Modal.tsx";

interface Props {
  image: string;
  alternativeText: string;
  index: number;
  width: number;
  height: number;
  aspectRatio: string;
}

const id = "product-zoom";

function ProductImageZoom(
  { image, alternativeText, width, height, aspectRatio, index }: Props,
) {
  const open = useSignal(false);

  return (
    <>
      <Image
        class="w-[49%] rounded-md cursor-pointer"
        sizes="(max-width: 640px) 100vw, 40vw"
        style={{ aspectRatio: aspectRatio }}
        src={image!}
        alt={alternativeText}
        width={width}
        height={height}
        // Preload LCP image for better web vitals
        preload={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        onClick={() => open.value = true}
      />
      <Modal
        loading="lazy"
        mode="center"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
        datatype={"zoom"}
      >
        <div>
          <Image
            class="h-screen w-full"
            sizes="(max-width: 640px) 100vw, 40vw"
            style={{ aspectRatio: aspectRatio }}
            src={image!}
            alt={alternativeText}
            width={width}
            height={height}
            // Preload LCP image for better web vitals
            preload={false}
            loading={"lazy"}
            onClick={() => open.value = false}
          />
        </div>
      </Modal>
    </>
  );
}

export default ProductImageZoom;
