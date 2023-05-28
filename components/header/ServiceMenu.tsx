import { useUI } from "$store/sdk/useUI.ts";
import type { CallToUsItem } from "$store/components/header/Header.tsx";
import { useState } from "preact/compat";

function ServiceMenu({ callToUsItem }: { callToUsItem: CallToUsItem[] }) {
  const { displayOverlay, displayServiceMenu, displaySearchbar } = useUI();

  return (
    <div class="relative">
      <button
        class="lg:ml-7.5"
        aria-label="Atendimento"
        onClick={() => {
          displayOverlay.value = !displayOverlay.value;
          displayServiceMenu.value = !displayServiceMenu.value;
          displaySearchbar.value = false;
        }}
      >
        <i class="icon-phone text-2.5xl"></i>
      </button>
      <div
        class={`${
          displayServiceMenu.value
            ? "opacity-1 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } absolute top-14 -left-36 min-w-[240px] bg-white rounded-md shadow-service py-8.5 px-4.5`}
      >
        <div
          class={"w-3 h-3 border-l border-l-[#C7C7CC] border-t border-t-[#C7C7CC] rotate-45 bg-white absolute top-[-7px] right-11"}
        >
        </div>
        <div class="flex flex-col gap-5">
          {callToUsItem.map((item) => (
            <a class="text-sm" href={item.href}>{item.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceMenu;