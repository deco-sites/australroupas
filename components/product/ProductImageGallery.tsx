import { useSignal } from "@preact/signals";
import ProductImageZoom from "$store/components/product/ProductImageZoom.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props{
  product: ProductDetailsPage["product"];
}

const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function ProductImageGallery({product}: Props) {

  const { productSimilares, productSelected } = useUI();

  if(productSimilares.value.product.length > 1 ){
    const imagesVariant = useStableImages(productSimilares.value.product[productSelected.value]);
    return(
      <>
        <div class="hidden lg:flex flex-wrap gap-[5px]">
          {imagesVariant.map((img, index) => (
            <ProductImageZoom
              image={img.url!}
              width={424}
              height={635}
              aspectRatio={"424 / 635"}
              index={index}
              alternativeText={img.alternateName!}
            />
          ))}
        </div>
      </>
    )
  }
  console.log(productSimilares.value.product)
  const images = useStableImages(product)
  return (
    <>
      <div class="hidden lg:flex flex-wrap gap-[5px]">
        {images.map((img, index) => (
          <ProductImageZoom
            image={img.url!}
            width={424}
            height={635}
            aspectRatio={"424 / 635"}
            index={index}
            alternativeText={img.alternateName!}
          />
        ))}
      </div>
    </>
  );
}

export default ProductImageGallery;
