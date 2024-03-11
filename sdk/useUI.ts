/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";
import type { Product } from "apps/commerce/types.ts";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchbar = signal(false);
const displayOverlay = signal(false);
const displayServiceMenu = signal(false);
const displayOverlayServiceMenu = signal(false);
const displayFilterMenu = signal(false);
const displayModalSelectSKU = signal(false);
const displayModalShare = signal(false);
const displayModalLogin = signal(false);
const productSimilares = signal<{ product: Product[] }>({ product: [] });
const productSelected = signal(0);
const productName = signal("");
const productVariant = signal("");
const vtexIdScriptsLoaded = signal(false);

const state = {
  displayCart,
  displayMenu,
  displaySearchbar,
  displayOverlay,
  displayServiceMenu,
  displayOverlayServiceMenu,
  displayFilterMenu,
  displayModalSelectSKU,
  displayModalShare,
  vtexIdScriptsLoaded,
  displayModalLogin,
  productSimilares,
  productSelected,
  productName,
  productVariant,
};

export const useUI = () => state;
