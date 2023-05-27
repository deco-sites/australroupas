import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Menu from "$store/islands/Menu.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import NavItem from "./NavItem.tsx";
import Overlay from "$store/islands/Overlay.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { CallToUsItem } from "./Header.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";

function Navbar({ items, searchbar, logo, callToUsItem }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo: LiveImage;
  callToUsItem: CallToUsItem[];
}) {
  const { displayOverlay } = useUI();
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden flex flex-row justify-between items-center w-full"
      >
        <div>
          <Buttons variant="menu" />
          <Menu items={items} callToUsItem={callToUsItem} />

          <Buttons variant="search" />
          <Searchbar searchbar={searchbar} />
        </div>

        <a
          href="/"
          class="flex justify-center items-center"
          aria-label="Store logo"
        >
          <Image
            src={logo}
            alt={"Austral - Loja Oficial"}
            width={120}
            class="object-cover object-center"
          />
        </a>

        <div>
          <Buttons variant="cart" />
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <Overlay />
      <div class="hidden lg:flex max-w-3xl flex-row justify-between items-center border-b border-base-200 w-full px-25 bg-white relative z-50">
        <div class="flex-none">
          <a href="/" aria-label="Store logo" class="block px-4 py-3">
            <Image
              src={logo}
              alt={"Austral - Loja Oficial"}
              width={150}
              class="object-cover object-center"
            />
          </a>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <Searchbar searchbar={searchbar} />
          <Buttons variant="search" searchDesktop={true} />
          <a
            class=""
            href="/minha-conta"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </a>
          <button
            class=""
            aria-label="Atendimento"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </button>
          <Buttons variant="cart" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
