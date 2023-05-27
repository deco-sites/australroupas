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

function SearchButton({searchDesktop = false}: {searchDesktop: boolean}) {
  const { displaySearchbar } = useUI();

  return (
    <>
      
      {!searchDesktop ? 
        (displaySearchbar.value ? (
            <Button
              class="btp-2 text-xl"
              onClick={() => (displaySearchbar.value = false)}
            >
              <Icon id="XMark" width={20} height={20} strokeWidth={2} />
            </Button>
          ) : (
            <Button
              class="p-2 text-xl"
              aria-label="search icon button"
              onClick={() => {
                displaySearchbar.value = !displaySearchbar.value;
              }}
            >
              <Icon
                id="MagnifyingGlass"
                width={20}
                height={20}
                strokeWidth={0.1}
              />
            </Button>
          )) : 
          <Button
            class="p-2 text-xl"
            aria-label="search icon button"
            onClick={() => {
              displaySearchbar.value = !displaySearchbar.value;
            }}
          >
            <Icon
              id="MagnifyingGlass"
              width={20}
              height={20}
              strokeWidth={0.1}
            />
          </Button>
      }
    </>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="p-2 text-xl"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={20} height={20} strokeWidth={0.01} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
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
      class="p-2 text-xl relative"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="indicator">
        {totalItems && (
          <span class="indicator-item badge badge-secondary badge-sm">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        <Icon id="ShoppingCart" width={20} height={20} strokeWidth={2} />
      </div>
    </Button>
  );
}

function Buttons({ variant, searchDesktop = false }: { variant: "cart" | "search" | "menu", searchDesktop?: boolean }) {
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
