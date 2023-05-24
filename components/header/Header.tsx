import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";

import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  red?: true | false;
  children?: Array<{
    label: string;
    href: string;
    red?: true | false;
  }>;
  image?: Array<{
    src?: Image;
    alt?: string;
  }>;
}

export interface CallToUsItem {
  label: string;
  href: string;
}

export interface IconsHeader {
  /**
   * @title Menu Icon
   * @description Menu Icon used both on mobile
   */
  menuIcon?: AvailableIcons;

  /**
   * @title Search Icon
   * @description Search Icon used both on mobile and desktop
   */
  searchIcon?: AvailableIcons;

  /**
   * @title Call To Us Icon
   * @description Call To Us Icon used both on mobile and desktop
   */
  callToUsIcon?: AvailableIcons;

  /**
   * @title My Account Icon
   * @description My Account Icon used both on mobile and desktop
   */
  myAccountIcon?: AvailableIcons;

  /**
   * @title Cart Icon
   * @description Cart Icon used both on mobile and desktop
   */
  cartIcon?: AvailableIcons;
}

export interface Props {
  //alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

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
   * @title Icons Header
   * @description Icons Header used both on mobile and desktop
   */
  iconsHeader: IconsHeader;

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
    iconsHeader,
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
          <Navbar iconsHeader={iconsHeader} callToUsItem={callToUsItems} logo={logo} items={navItems} searchbar={searchbar} />
        </div>
        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
