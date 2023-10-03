import { effect, signal } from "@preact/signals";
import { Runtime } from "deco-sites/australroupas/runtime.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

const productGroupID = signal<null | string>(null);
const selectedSku = signal<undefined | string>(undefined);

const loading = signal<boolean>(true);
const payload = signal<
  null | {
    product: Product;
    selectedID?: string;
  }
>(
  null,
);

effect(() => {
  const groupID = productGroupID.value;

  if (groupID == null) {
    return;
  }

  const fn = async () => {
    try {
      loading.value = true;
      const invoked = await Runtime.invoke({
        list: {
          key:
            "deco-sites/std/loaders/vtex/intelligentSearch/productListingPage.ts",
          props: { query: `product:${groupID}`, count: 1, similars: true },
        },
      });

      if (invoked.list && invoked.list.products.length > 0) {
        payload.value = {
          product: invoked.list.products[0],
        };
      }
    } finally {
      loading.value = false;
    }
  };

  fn();
});

const select = (props: { productID: string } | { productGroupID: string }) => {
  // deno-lint-ignore no-explicit-any
  const p = props as any;
  if (p.productID && payload.value) {
    payload.value = {
      ...payload.value,
      selectedID: p.productID,
    };
  }

  if (p.productID && !payload.value) {
    selectedSku.value = p.productID;
  }

  if (p.productGroupID) {
    productGroupID.value = p.productGroupID;
  }
};

const state = {
  select,
  payload,
  selectedSku,
  loading,
};

export const useQuickView = () => state;
