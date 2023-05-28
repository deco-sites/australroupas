import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { INavItem } from "$store/components/header/NavItem.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";

import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface CallToUsItem {
  label: string;
  href: string;
}

export interface Props {
  //alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: INavItem[];

  /**
   * @title Image logo
   * @description Image logo used both on mobile and desktop
   */
  logo: Image;

  /**
   * @title Call to Us items
   * @description Call to Us items used both on mobile and desktop
   */
  callToUsItems: CallToUsItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header(
  {
    logo,
    callToUsItems,
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      <header style={{ height: headerHeight }}>
        <div class="bg-white fixed w-full z-50 shadow-header">
          <Navbar
            callToUsItem={callToUsItems}
            logo={logo}
            items={navItems}
            searchbar={searchbar}
          />
        </div>

        <Modals />
      </header>
    </>
  );
}

export default Header;
