import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery from "../product/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import { useEffect, useRef, useState } from "preact/compat";
import Button from "$store/components/ui/Button.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  pageType?: "Category" | "Search";
}

export interface MainProps extends Props {
  headingText: string;
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
}: Omit<MainProps, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  console.log(page.pageInfo.records);

  const marginLeft = pageType == "Category" ? "sm:ml-[80px]" : "";
  return (
    <>
      {products.length > 0
        ? (
          <>
            <div class="home-container-mobile lg:home-container px-4 sm:py-10">
              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                breadcrumb={breadcrumb}
                displayFilter={variant === "drawer"}
                quantityOfProducts={page.pageInfo.records}
              />

              <div class="flex flex-row">
                {variant === "aside" && filters.length > 0 && (
                  <aside class="hidden sm:block w-min min-w-[20%]">
                    <Filters filters={filters} />
                  </aside>
                )}
                <div class={`flex-grow ${marginLeft && marginLeft}`}>
                  <ProductGallery products={products} pageType={pageType} />
                  <div class="flex justify-center my-4">
                    <div class="btn-group">
                      <a
                        aria-label="previous page link"
                        rel="prev"
                        href={pageInfo.previousPage ?? "#"}
                        class="btn btn-ghost"
                      >
                        <Icon
                          id="ChevronLeft"
                          width={20}
                          height={20}
                          strokeWidth={2}
                        />
                      </a>
                      <span class="btn btn-ghost">
                        Page {pageInfo.currentPage + 1}
                      </span>
                      <a
                        aria-label="next page link"
                        rel="next"
                        href={pageInfo.nextPage ?? "#"}
                        class="btn btn-ghost"
                      >
                        <Icon
                          id="ChevronRight"
                          width={20}
                          height={20}
                          strokeWidth={2}
                        />
                      </a>
                    </div>
                  </div>
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
    return <NotFound headingText={props.headingText} />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
