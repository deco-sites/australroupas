import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  }
  & { quantityOfProducts: number | undefined };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions, quantityOfProducts }:
    Props,
) {
  const open = useSignal(false);

  return (
    <div class="flex flex-col justify-between mb-4 py-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:min-h-[100px]">
      <div class="hidden sm:flex flex-row items-center sm:p-0 mb-2">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      <div class="flex flex-row items-center justify-between relative mt-3">
        <Button
          class={`border-[1px] border-[#e0e0e0] p-2.5 w-[49%] rounded-[6px] text-[#636366] text-[14px] h-[45px] ${
            displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"
          }`}
          onClick={() => {
            open.value = true;
          }}
        >
          Filtrar Por
        </Button>
        {sortOptions.length > 0 && (
          <Sort
            sortOptions={sortOptions}
            quantityOfProducts={quantityOfProducts}
          />
        )}
      </div>

      <Modal
        loading="lazy"
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </div>
  );
}

export default SearchControls;
