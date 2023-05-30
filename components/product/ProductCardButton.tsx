import Avatar from "$store/components/ui/Avatar.tsx";
import { useSignal } from "@preact/signals";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import type { Product, ProductGroup } from "deco-sites/std/commerce/types.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

type Variant = [string, string[]];

export default function ProductCardButton({ isVariantOf, variants }: { isVariantOf: ProductGroup | undefined; variants: Variant[] }) {

  const productGroupID = isVariantOf?.productGroupID;

  const selectedUrl = useSignal("");

  const selected = useSignal({
    skuId: "",
    sellerId: "",
    price: 0,
    discount: 0,
    name: "",
    productGroupId: "",
  });

  return (
    <figcaption class=" absolute bottom-0 left-0 w-full transition-opacity bg-[rgba(255,255,255,0.8)] hidden sm:group-hover:block py-3 px-4">
      {/* SKU Selector */}
      <ul class="flex justify-center items-center gap-2 w-full">
        {variants.map(([value, [link]]) => {
          const currentProduct = isVariantOf?.hasVariant.filter(
            (variant) => variant.url == link,
          )!;
          const { listPrice, price, seller, availability } = useOffer(
            currentProduct[0].offers,
          );
          return (
            <button
              disabled={availability == "https://schema.org/OutOfStock"}
              onClick={() => {
                selectedUrl.value = link;
                selected.value = {
                  skuId: currentProduct[0].productID,
                  sellerId: seller ?? "1",
                  price: price ?? 0,
                  discount: price && listPrice ? listPrice - price : 0,
                  name: currentProduct[0].name ?? "",
                  productGroupId: productGroupID ?? "",
                };
              }}
            >
              <Avatar
                variant={availability == "https://schema.org/OutOfStock"
                  ? "disabled"
                  : link === selectedUrl.value
                  ? "active"
                  : "default"}
                content={value}
              />
            </button>
          );
        })}
      </ul>
      <AddToCartButton
        skuId={selected.value.skuId}
        sellerId={selected.value.sellerId}
        price={selected.value.price}
        discount={selected.value.discount}
        name={selected.value.name}
        productGroupId={selected.value.productGroupId}
      />
    </figcaption>
  );
}
