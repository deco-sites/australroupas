import { useUI } from "$store/sdk/useUI.ts";

function Overlay() {
  const {
    displayOverlay,
    displayCart,
    displayMenu,
    displaySearchbar,
    displayServiceMenu,
  } = useUI();
  return (
    <>
      <div
        class={`${
          displayOverlay.value ? "h-screen opacity-60" : "h-0 opacity-0"
        } z-10 absolute bg-info right-full left-0 top-0 w-full transition-all duration-300 ease-linear`}
        onClick={() => {
          displayCart.value = false;
          displayMenu.value = false;
          displaySearchbar.value = false;
          displayOverlay.value = false;
          displayServiceMenu.value = false;
        }}
      >
      </div>
    </>
  );
}

export default Overlay;
