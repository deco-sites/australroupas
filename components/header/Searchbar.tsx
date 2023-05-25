import { lazy, Suspense } from "preact/compat";

import { useUI } from "$store/sdk/useUI.ts";
import Loading from "$store/components/ui/Loading.tsx";
import { headerHeight } from "$store/components/header/constants.ts";
import Searchcar, { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

// const LazySearchbar = lazy(() =>
//   import("$store/components/search/Searchbar.tsx")
// );

interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  const { displaySearchbar } = useUI();
  const open = displaySearchbar.value;

  return (
    <div
      class={`${
        open ? "block border-y border-base-200 shadow" : "hidden"
      } absolute left-0 top-0 w-screen z-50 bg-base-100`}
      style={{ marginTop: headerHeight }}
    >
      
        <>
          <div class={`z-20 fixed h-0 w-full bg-white transition-all duration-300 ease-linear opacity-0 ${open ? 'opacity-100 h-12' : ''}`}>
            <Searchcar {...searchbar} variant="desktop" />
          </div>
          <div class={`z-10 fixed h-full w-full bg-black transition-all duration-300 ease-linear opacity-0 ${open ? 'opacity-60 h-full' : ''}`}></div>
        </>
      
    </div>
  );
}

export default Searchbar;
