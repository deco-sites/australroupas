import { useUI } from "$store/sdk/useUI.ts";

function Overlay() {
  const { displayOverlay } = useUI();
  return (
    <>
      <div
        class={`${
          displayOverlay.value ? "lg:h-screen lg:opacity-60" : "h-0 opacity-0"
        } z-10 absolute pointer-events-none bg-info right-full left-0 top-0 w-full transition-all duration-300 ease-linear`}
      >
      </div>
    </>
  );
}

export default Overlay;
