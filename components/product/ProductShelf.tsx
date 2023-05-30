import ProductCard from "$store/components/product/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

export interface Props {
  title?: HTML;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="sm:home-container relative grid grid-cols-[48px_1fr_48px] grid-rows-[94px_1fr_48px_1fr] py-10 px-0 my-10 mb-10"
    >
      {title &&
        (
          <div class="absolute home-container-mobile sm:home-container">
            <Quilltext html={title} />
          </div>
        )}

      <Slider class="carousel carousel-center sm:carousel-end col-span-full row-start-2 row-end-5 gap-4 sm:gap-[1.33%] pb-10">
        {products?.map((product, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-[80%] sm:w-[24%] first:ml-[15px] sm:first:ml-0 last:mr-[15px] sm:last:mr-0"
          >
            <ProductCard product={product} itemListName={title} />
          </Slider.Item>
        ))}
      </Slider>

      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="absolute left-[-35px] -rotate-90">
            <i class="icon icon-arrow"></i>
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="absolute right-[-35px] rotate-90">
            <i class="icon icon-arrow"></i>
          </Slider.NextButton>
        </div>
      </>

      <Dots
        products={products}
        interval={0}
      />

      <SliderJS rootId={id} />
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </div>
  );
}

export default ProductShelf;

function Dots(
  { products, interval = 0 }: {
    products: Product[];
    interval: number | undefined;
  },
) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              @property --dot-progress {
                syntax: '<percentage>';
                inherits: false;
                initial-value: 0%;
              }
              `,
        }}
      />
      <ul class="flex w-full absolute bottom-0 carousel justify-center col-span-full gap-2 z-10 row-start-4">
        {products?.map((_, index) => (
          <li class={`carousel-item ${(index + 1) % 4 != 0 && "sm:hidden"}`}>
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class={`w-2 h-2 rounded-full bg-[rgba(0,0,0,0.2)] group-disabled:bg-[#000]`}
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}
