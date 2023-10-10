import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { useEffect, useRef, useState } from "preact/compat";
import Button from "$store/components/ui/Button.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
// import Quilltext from "deco-sites/std/components/QuillText.tsx";

import ProductGallery from "$store/islands/ProductGallery.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";

export interface SeoText {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  title?: string;
  description?: HTML;
}

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  pageType?: "Category" | "Search";
  SeoTexts?: SeoText[];
}

export interface MainProps extends Props {
  /**
   * @description Texto para página não encontrada
   */
  headingText?: string;
  SeoText?: SeoText;
}

function NotFound({ headingText }: { headingText: string }) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  return (
    <div class="home-container-mobile lg:home-container bg-white relative top-[-90px] lg:top-[-150px] pt-[100px]">
      <div class="text-center">
        <h1 class="text-info text-base lg:text-[22px] mb-5 leading-[130%] mx-auto">
          Desculpe, a página não foi encontrada
        </h1>
        <p class="text-black text-base lg:text-[22px] font-bold mb-5 capitalize">
          {'"'}
          {headingText}
          {'"'}
        </p>
      </div>
      <div class="text-center">
        <p class="text-info text-base lg:text-[22px] mb-8">
          Por favor, refaça a busca
        </p>
        <div class="hidden lg:block">
          <div class="flex items-center gap-4 px-4 lg:px-5 h-12 w-80 mx-auto">
            <form
              id="searchbar"
              action={"/s"}
              class="flex-grow flex gap-3 px-5 lg:px-0 items-center border-b border-b-black"
            >
              <input
                ref={searchInputRef}
                id="search-input"
                class="h-full bg-transparent flex-grow outline-none placeholder:text-black text-xs text-black pl-3"
                name={"q"}
                required={true}
                onInput={(e) => {
                  const value = e.currentTarget.value;

                  setSearchTerm(value);
                }}
                value={searchTerm}
                placeholder={"O que você está buscando?"}
                role="combobox"
                aria-controls="search-suggestion"
                autocomplete="off"
              />
              <Button
                class="relative right-[-35px] top-0 lg:text-2.5xl"
                aria-label="Search"
                htmlFor="searchbar"
                tabIndex={-1}
                type="submit"
              >
                <i class="icon-search text-[#636366]"></i>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Result({
  page,
  variant,
  pageType = "Category",
  headingText = "",
  SeoText = { matcher: "", title: "", description: "" },
}: Omit<MainProps, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, sortOptions } = page;
  const marginLeft = pageType == "Category" ? "sm:ml-[80px]" : "";
  return (
    <>
      {products.length > 0
        ? (
          <>
            <div class="home-container-mobile lg:home-container px-4 sm:pb-10">
              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                breadcrumb={breadcrumb}
                displayFilter={variant === "drawer"}
                quantityOfProducts={page.pageInfo.records}
              />

              <div class="flex flex-row">
                {variant === "aside" && filters.length > 0 && (
                  <aside class="hidden sm:block w-min min-w-[20%] sticky h-full top-[120px]">
                    <Filters filters={filters} />
                  </aside>
                )}
                <div class={`flex-grow ${marginLeft && marginLeft}`}>
                  <ProductGallery
                    pageType={pageType}
                    page={page}
                  />
                  {SeoText.title &&
                    SeoText.description &&
                    (
                      <div>
                        <h1 class="text-xl capitalize text-black font-bold text-center mb-5">
                          {SeoText.title}
                        </h1>
                        <div class="text-base text-[#3A3A3C] text-center tracking-[.1px] leading-[1.2]">
                          <div dangerouslySetInnerHTML={{__html: SeoText.description}} />
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <SendEventOnLoad
              event={{
                name: "view_item_list",
                params: {
                  // TODO: get category name from search or cms setting
                  item_list_name: "",
                  item_list_id: "",
                  items: page.products?.map((product) =>
                    mapProductToAnalyticsItem({
                      ...(useOffer(product.offers)),
                      product,
                      breadcrumbList: page.breadcrumb,
                    })
                  ),
                },
              }}
            />
          </>
        )
        : <NotFound headingText={headingText} />}
    </>
  );
}

function SearchResult({ page, ...props }: MainProps) {
  if (!page) {
    return <NotFound headingText={props.headingText || ""} />;
  }

  const filteredPageProps: ProductListingPage = {
    "@type": "ProductListingPage",
    breadcrumb: page.breadcrumb,
    filters: page.filters,
    pageInfo: page.pageInfo,
    sortOptions: page.sortOptions,
    seo: page?.seo,
    products: page.products.map((product) => {
      return {
        "@type": "Product",
        productID: product.productID,
        url: product.url,
        name: product.name,
        isVariantOf: {
          "@type": "ProductGroup",
          additionalProperty: [],
          hasVariant: product.isVariantOf!.hasVariant,
          name: product.isVariantOf!.name,
          productGroupID: product.isVariantOf!.productGroupID,
          url: product.isVariantOf!.url,
        },
        image: [
          // @ts-expect-error: type
          product.image[0],
          // @ts-expect-error: type
          product.image[1],
        ],
        sku: product.sku,
        offers: product.offers,
      };
    }),
  };

  return <Result {...props} page={filteredPageProps} />;
}

export default SearchResult;
