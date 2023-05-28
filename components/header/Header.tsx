import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { INavItem } from "$store/components/header/NavItem.tsx";

import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface CallToUsItem {
  label: string;
  href: string;
}

export type AvailableIcons =
  'icon-menu' | 
  'icon-plus' | 
  'icon-minus' | 
  'icon-arrow' | 
  'icon-close' | 
  'icon-delete' | 
  'icon-search' | 
  'icon-phone' | 
  'icon-user' | 
  'icon-minicart' | 
  'icon-heart' | 
  'icon-heart-full' | 
  'icon-mouse' | 
  'icon-share' | 
  'icon-edit' | 
  'icon-email' | 
  'icon-check' | 
  'icon-zoom' | 
  'icon-warning' | 
  'icon-hanger' | 
  'icon-rule' | 
  'icon-security' | 
  'icon-arroba' | 
  'icon-embalagem' | 
  'icon-notification' | 
  'icon-pin' | 
  'icon-play' | 
  'icon-facebook' | 
  'icon-whatsapp' | 
  'icon-instagram' | 
  'icon-youtube' | 
  'icon-pinterest';

export interface IconsHeader {
  search?: AvailableIcons;
  callToUs?: AvailableIcons;
  myAccount?: AvailableIcons;
  minicart?: AvailableIcons;
  menu?: AvailableIcons;
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
   * @title Header icons
   * @description Header icons used both on mobile and desktop
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
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
    iconsHeader
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
            iconsHeader={iconsHeader}
          />
        </div>

        <Modals />
      </header>
    </>
  );
}

export default Header;
