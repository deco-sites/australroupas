import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import type { IconsHeader } from "$store/components/header/Header.tsx";
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

function SearchButton(
  { searchDesktop = false, iconsHeader }: {
    searchDesktop: boolean;
    iconsHeader?: IconsHeader;
  },
) {
  const {
    displaySearchbar,
    displayOverlay,
    displayServiceMenu,
    displayOverlayServiceMenu,
  } = useUI();

  return (
    <>
      {!searchDesktop
        ? (displaySearchbar.value
          ? (
            <Button
              class="p-2.5 text-xl lg:text-2.5xl"
              onClick={() => {
                displaySearchbar.value = false;
                displayOverlay.value = false;
                displayOverlayServiceMenu.value = false;
              }}
            >
              <i class={`icon-close`}></i>
            </Button>
          )
          : (
            <Button
              class="p-2.5 text-xl lg:text-2.5xl"
              aria-label="search icon button"
              onClick={() => {
                displaySearchbar.value = true;
                displayOverlay.value = true;
              }}
            >
              <i
                class={`${iconsHeader?.search || "icon-search"} text-[#636366]`}
              >
              </i>
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
              displayServiceMenu.value = false;
              displayOverlay.value = true;
            }}
          >
            <i class={`${iconsHeader?.search || "icon-search"} text-[#636366]`}>
            </i>
          </Button>
        )}
    </>
  );
}

function MenuButton({ iconsHeader }: { iconsHeader?: IconsHeader }) {
  const { displayMenu, displaySearchbar, displayOverlay } = useUI();

  return (
    <Button
      class="p-2.5 text-xl lg:text-2.5xl"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
        displaySearchbar.value = false;
        displayOverlay.value = false;
      }}
    >
      <i class={iconsHeader?.menu || "icon-menu"}></i>
    </Button>
  );
}

function CartButton({ iconsHeader }: { iconsHeader?: IconsHeader }) {
  const {
    displayCart,
    displayServiceMenu,
    displaySearchbar,
    displayOverlayServiceMenu,
  } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || 0;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    displaySearchbar.value = false;
    displayServiceMenu.value = false;
    displayOverlayServiceMenu.value = false;
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
        <i
          class={`${
            iconsHeader?.minicart || "icon-minicart"
          } text-xl lg:text-2.5xl`}
        >
        </i>
      </div>
    </Button>
  );
}

function Buttons(
  { variant, searchDesktop = false, iconsHeader }: {
    variant: "cart" | "search" | "menu";
    searchDesktop?: boolean;
    iconsHeader?: IconsHeader;
  },
) {
  if (variant === "cart") {
    return <CartButton iconsHeader={iconsHeader} />;
  }

  if (variant === "search") {
    return (
      <SearchButton iconsHeader={iconsHeader} searchDesktop={searchDesktop} />
    );
  }

  if (variant === "menu") {
    return <MenuButton iconsHeader={iconsHeader} />;
  }

  return null;
}

export default Buttons;
