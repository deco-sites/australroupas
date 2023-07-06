import { Product } from "deco-sites/std/commerce/types.ts";

import ProductCard from "./ProductCard.tsx";

export interface Props {
  products: Product[] | null;
  pageType?: "Category" | "Search";
}

function ProductGallery({ products, pageType = "Category" }: Props) {
  const itemsLine = pageType == "Category" ? "sm:grid-cols-3" : "sm:grid-cols-4";
  return (
    <div class={`grid grid-cols-2 gap-2 items-center  sm:gap-5 ${itemsLine && itemsLine}`}>
      {products?.map((product, index) => (
        <ProductCard product={product} preload={index === 0} />
      ))}
    </div>
  );
}

export default ProductGallery;
