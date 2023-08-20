import { useUI } from "$store/sdk/useUI.ts";

function Overlay() {
  const {
    displayOverlay,
    displayCart,
    displayMenu,
    displaySearchbar,
    displayServiceMenu,
    displayOverlayServiceMenu,
    displayModalSelectSKU,
  } = useUI();
  return (
    <>
      <div
        class={`${
          displayOverlay.value ? "h-screen opacity-60" : "h-0 opacity-0"
        } z-20 fixed bg-info right-full left-0 top-0 w-full transition-all duration-300 ease-linear`}
        onClick={() => {
          displayCart.value = false;
          displayMenu.value = false;
          displaySearchbar.value = false;
          displayOverlay.value = false;
          displayServiceMenu.value = false;
        }}
      >
      </div>

      <div
        class={`${
          displayOverlayServiceMenu.value
            ? "opacity-60 pointer-events-auto"
            : "pointer-events-none opacity-0"
        } fixed w-full h-screen left-0 top-0 transition-all z-20 ease-linear duration-300 bg-[#1C1C1E]`}
        onClick={() => {
          displayCart.value = false;
          displayMenu.value = false;
          displaySearchbar.value = false;
          displayOverlay.value = false;
          displayServiceMenu.value = false;
          displayOverlayServiceMenu.value = false;
        }}
      >
      </div>

      <div
        class={`${
          displayCart.value
            ? "pointer-events-auto left-0"
            : "pointer-events-none"
        } fixed w-full h-screen -left-full top-0 transition-all z-50 ease-linear duration-300 bg-[#1C1C1E] opacity-60`}
        onClick={() => {
          displayCart.value = false;
          displayMenu.value = false;
          displaySearchbar.value = false;
          displayOverlay.value = false;
          displayServiceMenu.value = false;
          displayOverlayServiceMenu.value = false;
        }}
      >
      </div>

      <div
        class={`${
          displayModalSelectSKU.value
            ? "opacity-40 pointer-events-all"
            : "pointer-events-none opacity-0"
        } fixed w-full h-screen right-0 top-0 transition-all z-50 ease-linear duration-300 bg-info`}
      >
      </div>
      <div
        class={`${
          displayModalSelectSKU.value
            ? "flex pointer-events-all"
            : "pointer-events-none hidden"
        } fixed z-[52] fixed w-full h-screen right-0 top-0 flex justify-center items-center`}
        onClick={() => displayModalSelectSKU.value = false}
      >
        <div
          style={{
            animation: displayModalSelectSKU.value
              ? "swal2-show .3s"
              : "swal2-hide .15s forwards",
          }}
          class={`w-[32em] bg-white p-[1.25em] rounded-[.3125em] flex flex-col justify-center items-center`}
        >
          <div class="text-[#f8bb86] border-[.25em] border-[#facea8] w-[5em] h-[5em] rounded-[50%] m-[1.25em_auto_1.875em]">
            <p class="text-[3.75em] text-center relative top-[-10px]">!</p>
          </div>
          <h3 class="text-[#545454] text-[1.125em] mb-[1.25em]">
            Por favor selecione o tamanho desejado!
          </h3>
          <button class="bg-[#000] text-white text-[1.0625em] p-[.625em_2em] m-[.3125em]">
            OK
          </button>
        </div>
      </div>
    </>
  );
}

export default Overlay;
