import Image from "deco-sites/std/components/Image.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { sendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ProductCardButton from "deco-sites/australroupas/islands/ProductCardButton.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 338;
const HEIGHT = 506;

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  let groupName = "";
  if (isVariantOf?.hasVariant) {
    groupName = isVariantOf.name!;
  }

  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[1] ?? {});

  const findStock = isVariantOf?.hasVariant.filter((variant) =>
    variant.offers?.offers[0].availability == "https://schema.org/InStock"
  );

  const clickEvent = {
    name: "select_item" as const,
    params: {
      item_list_name: itemListName,
      items: [
        mapProductToAnalyticsItem({
          product,
          price,
          listPrice,
        }),
      ],
    },
  };

  return (
    <div
      class="card card-compact card-bordered border-transparent group w-full rounded-md"
      data-deco="view-product"
      id={`product-card-${productID}`}
      {...sendEventOnClick(clickEvent)}
    >
      <figure class="relative " style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        {/* Product Images */}
        <a
          href={findStock && findStock[0] ? findStock[0].url : url}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity rounded-md w-full block group-hover:hidden z-10"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity rounded-md w-full block"
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>
        <ProductCardButton
          isVariantOf={isVariantOf}
          variants={variants}
          urlInStock={findStock && findStock[0] ? findStock[0].url : ""}
        />
      </figure>
      {/* Prices & Name */}
      <div class="py-2.5">
        <h2 class="whitespace-nowrap overflow-hidden text-[14px]">
          {groupName != "" ? groupName : name}
        </h2>
        <div class="flex items-end gap-2">
          {listPrice != price && (
            <span class="text-[12px] text-[#878787] line-through self-start">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </span>
          )}
          <span class="text-[14px] font-semibold">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
          <span class="text-[14px] text-[#878787]">
            {installments}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
