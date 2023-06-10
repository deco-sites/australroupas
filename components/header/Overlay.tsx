import { useUI } from "$store/sdk/useUI.ts";

function Overlay() {
  const {
    displayOverlay,
    displayCart,
    displayMenu,
    displaySearchbar,
    displayServiceMenu,
    displayOverlayServiceMenu,
  } = useUI();
  return (
    <>
      <div
        class={`${
          displayOverlay.value ? "h-screen opacity-60" : "h-0 opacity-0"
        } z-10 fixed bg-info right-full left-0 top-0 w-full transition-all duration-300 ease-linear`}
        onClick={() => {
          displayCart.value = false;
          displayMenu.value = false;
          displaySearchbar.value = false;
          displayOverlay.value = false;
          displayServiceMenu.value = false;
        }}
      >
      </div>
      
      <div class={`${
          displayOverlayServiceMenu.value ? "opacity-60 pointer-events-auto" : "pointer-events-none opacity-0"
        } fixed w-full h-screen left-0 top-0 transition-all z-10 ease-linear duration-300 bg-[#1C1C1E]`}
        onClick={() => {
          displayCart.value = false;
          displayMenu.value = false;
          displaySearchbar.value = false;
          displayOverlay.value = false;
          displayServiceMenu.value = false;
          displayOverlayServiceMenu.value = false;
        }}  
      ></div>
    </>
  );
}

export default Overlay;
