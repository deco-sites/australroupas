import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

const CHECKOUT_URL = "https://austral.vtexcommercestable.com.br/checkout";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const totalItems = cart.value?.items.length || 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  console.log(cart)
  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6">
        <span class="font-medium text-2xl">Sua sacola está vazia</span>
        <Button
          class="btn-outline"
          onClick={() => {
            displayCart.value = false;
          }}
        >
          Escolher produtos
        </Button>
      </div>
    );
  }

  return (
    <>
      <div class="absolute top-3 left-[30%]">
        <div class="p-1.5 text-xl relative ml-1 lg:ml-0">
          <span class="bg-primary rounded-full absolute top-1 right-0 text-white rounded-ful text-[10px] px-1.7 py-1 w-4 h-4 flex items-center justify-center">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
          <i
            class={`${"icon-minicart"} text-lg lg:text-xl`}
          >
          </i>
        </div>
      </div>
      {/* Cart Items */}
      <ul
        role="list"
        class="p-[15px] flex-grow overflow-y-auto flex flex-col"
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer class="shadow-minicart">
        {/* Subtotal */}
        <div class="border-b border-base-100py-4 flex flex-col gap-4">
          {discounts?.value && (
            <div class="flex justify-between items-center px-4">
              <span class="text-sm">Descontos</span>
              <span class="text-sm">
                {formatPrice(discounts.value / 100, currencyCode!, locale)}
              </span>
            </div>
          )}
          <Coupon />
        </div>
        {/* Total */}
        {total?.value && (
          <div class="border-b border-base-100 pt-4 flex flex-col justify-end items-end gap-2 mx-4">
            <div class="flex justify-between items-center w-full">
              <span>Total</span>
              <span class="font-medium text-xl">
                {formatPrice(total.value / 100, currencyCode!, locale)}
              </span>
            </div>
          </div>
        )}
        <div class="flex gap-2.5 px-[15px] pb-7.5">
          <a
            class="flex cursor-pointer justify-center items-center w-full bg-transparent border border-primary text-primary py-3 px-2.5 rounded-md mt-3 hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
            onClick={() => {
              displayCart.value = false;
            }}
          >
            <Button
              data-deco="buy-button"
              class="w-full text-xs"
              disabled={loading.value || cart.value.items.length === 0}
            >
              Continuar Comprando
            </Button>
          </a>
          <a
            class="flex justify-center items-center w-full bg-primary border-none text-white py-3 px-2.5 rounded-md mt-3 hover:text-info hover:opacity-80 transition duration-150"
            target="_blank"
            href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}
          >
            <Button
              data-deco="buy-button"
              class="w-full text-sm font-bold"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total?.value
                      ? (total?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              Finalizar Compra
            </Button>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Cart;
