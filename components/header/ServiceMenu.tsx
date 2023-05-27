import { useUI } from "$store/sdk/useUI.ts";

function ServiceMenu() {
  const { displayOverlay } = useUI();
  return (
    <>
      <button
        class="lg:ml-7.5"
        aria-label="Atendimento"
      >
        <i class="icon-phone text-2.5xl"></i>
      </button>
      <div
        class={`${
          displayOverlay.value ? "lg:h-screen lg:opacity-60" : "h-0 opacity-0"
        } z-10 absolute pointer-events-none bg-info right-full left-0 top-0 w-full transition-all duration-300 ease-linear`}
      >
      </div>
      
    </>
  );
}

export default ServiceMenu;
