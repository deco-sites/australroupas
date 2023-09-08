import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Menu from "$store/components/header/Menu.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import NavItem from "./NavItem.tsx";

import { navbarHeight } from "./constants.ts";
import ServiceMenu from "$store/islands/ServiceMenu.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { CallToUsItem } from "./Header.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { IconsHeader } from "$store/components/header/Header.tsx";

function Navbar({ items, searchbar, logo, callToUsItem, iconsHeader }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo: LiveImage;
  callToUsItem: CallToUsItem[];
  iconsHeader: IconsHeader;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden flex flex-row justify-between items-center w-full px-1.5 bg-white relative z-50"
      >
        <div>
          <Buttons variant="menu" iconsHeader={iconsHeader} />
          <Menu items={items} callToUsItem={callToUsItem} />

          <Buttons variant="search" iconsHeader={iconsHeader} />
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
            height={35}
            class="object-cover object-center"
          />
        </a>

        <div>
          <a
            class="p-2.5"
            href="/minha-conta"
            aria-label="Log in"
          >
            <i class={`${iconsHeader?.myAccount || "icon-user"} text-xl`}></i>
          </a>
          <Buttons variant="cart" iconsHeader={iconsHeader} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex mx-auto max-w-3xl flex-row justify-between items-center border-b border-base-200 w-full px-25 bg-white relative z-50">
        <div class="absolute w-full h-full left-0 bg-white z-30" />
        <div class="flex-none z-30">
          <a href="/" aria-label="Store logo" class="block px-4 py-3">
            <Image
              src={logo}
              alt={"Austral - Loja Oficial"}
              width={150}
              height={44}
              class="object-cover object-center"
            />
          </a>
        </div>
        <div class="containerNavItems flex justify-center ml-20 z-30">
          {items.map((item, index) => <NavItem item={item} index={index} />)}
        </div>

        <div
          class={`overlayNavItems h-0 opacity-0 z-20 fixed bg-info right-full left-0 top-0 w-full transition-all duration-300 ease-linear`}
        />

        <div class="flex-none flex items-center justify-end gap-2 relative z-30">
          <Searchbar searchbar={searchbar} />
          <Buttons
            variant="search"
            searchDesktop={true}
            iconsHeader={iconsHeader}
          />

          <ServiceMenu callToUsItem={callToUsItem} iconsHeader={iconsHeader} />

          <a
            class="p-2.5 lg:ml-7.5"
            href="/minha-conta"
            aria-label="Log in"
          >
            <i class={`${iconsHeader?.myAccount || "icon-user"} text-2.5xl`}>
            </i>
          </a>
          <Buttons variant="cart" iconsHeader={iconsHeader} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
