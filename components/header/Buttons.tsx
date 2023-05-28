import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function SearchButton({ searchDesktop = false }: { searchDesktop: boolean }) {
  const { displaySearchbar, displayOverlay } = useUI();

  return (
    <>
      {!searchDesktop
        ? (displaySearchbar.value
          ? (
            <Button
              class="p-2.5 text-xl lg:text-2.5xl"
              onClick={() => {
                displaySearchbar.value = false;
                displayOverlay.value = !displayOverlay.value;
              }}
            >
              <i class="icon-close"></i>
            </Button>
          )
          : (
            <Button
              class="p-2.5 text-xl lg:text-2.5xl"
              aria-label="search icon button"
              onClick={() => {
                displaySearchbar.value = !displaySearchbar.value;
                displayOverlay.value = !displayOverlay.value;
              }}
            >
              <i class="icon-search"></i>
            </Button>
          ))
        : (
          <Button
            class={`p-2.5 text-xl lg:text-2.5xl ${
              displaySearchbar.value ? "opacity-0" : ""
            }`}
            aria-label="search icon button"
            onClick={() => {
              displaySearchbar.value = !displaySearchbar.value;
              displayOverlay.value = !displayOverlay.value;
            }}
          >
            <i class="icon-search"></i>
          </Button>
        )}
    </>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="p-2.5 text-xl lg:text-2.5xl"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <i class="icon-menu"></i>
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || 0;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <Button
      class="p-2.5 text-xl relative lg:ml-7.5"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="">
        <span class="bg-primary rounded-full absolute top-0 right-0 text-white rounded-ful text-[10px] px-1.7 py-1 w-5 h-5 flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
        <i class="icon-minicart text-xl lg:text-2.5xl"></i>
      </div>
    </Button>
  );
}

function Buttons(
  { variant, searchDesktop = false }: {
    variant: "cart" | "search" | "menu";
    searchDesktop?: boolean;
  },
) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton searchDesktop={searchDesktop} />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default Buttons;
