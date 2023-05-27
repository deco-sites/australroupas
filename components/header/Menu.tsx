import { useState } from "preact/compat";
import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { CallToUsItem } from "./Header.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  items: INavItem[];
  callToUsItem: CallToUsItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  const [show, setShow] = useState(false);
  return (
    <div class="collapse relative">
      {item.children?.length
        ? (
          <Icon
            class="text-neutral absolute -right-1 w-12 top-4"
            strokeWidth={1}
            size={17}
            id="ChevronRight"
          />
        )
        : ""}
      <input
        class="absolute right-0 w-12"
        type="checkbox"
        onClick={() => setShow(!show)}
      />
      <div class="collapse-title px-0 py-4 min-h-min">
        <a
          class="w-full block whitespace-nowrap text-sm leading-none"
          href={item.href}
        >
          {item.label}
        </a>
      </div>
      {item.children?.length
        ? (
          <div
            class={`${
              show ? "left-0" : "-left-full"
            } fixed top-0 transition-all w-[calc(100%-40px)] bg-white z-50 h-full duration-300 ease-linear`}
          >
            <ul class="">
              <li class="border-b border-b-base-100 bg-base-100 py-4 leading-none">
                <Icon
                  class="text-primary absolute -left-2 w-12 top-4 pointer-events-none"
                  strokeWidth={1}
                  size={17}
                  id="ChevronLeft"
                />
                <button
                  class="w-full h-full text-left text-primary text-base leading-none px-12"
                  onClick={() => setShow(!show)}
                >
                  Voltar
                </button>
              </li>
              {item.children?.map((node) => (
                <li class="border-b border-b-base-100 px-4">
                  <MenuItem item={node} />
                </li>
              ))}
            </ul>
          </div>
        )
        : ""}
    </div>
  );
}

function Menu({ items, callToUsItem }: Props) {
  const { displayMenu } = useUI();
  return (
    <>
      <div
        class={`${
          displayMenu.value ? "left-0" : "-left-full"
        } fixed top-0 transition-all w-full bg-info opacity-60 z-40 h-full duration-300 ease-linear`}
      >
      </div>
      <div
        class={`${
          displayMenu.value ? "left-0" : "-left-full"
        } fixed top-0 transition-all w-[calc(100%-40px)] bg-white z-50 h-full duration-300 ease-linear`}
      >
        <Button
          class="absolute -right-10 top-2"
          onClick={() => {
            displayMenu.value = !displayMenu.value;
          }}
        >
          <Icon
            id="XMark"
            width={35}
            height={35}
            strokeWidth={1.5}
            class="text-white"
          />
        </Button>
        <ul class={`px-4 flex-grow flex flex-col`}>
          {items.map((item) => (
            <li class="border-b border-b-base-100">
              <MenuItem item={item} />
            </li>
          ))}
        </ul>

        <ul class="flex flex-col mt-7 bg-white">
          <li>
            <a
              class="flex items-center gap-4 px-4"
              href="/"
            >
              <Icon id="Heart" width={20} height={20} strokeWidth={2} />
              <span class="text-sm">ATENDIMENTO</span>
            </a>
          </li>
          {callToUsItem.map((item) => (
            <li>
              <a
                class="flex items-center gap-5 px-4 pt-4"
                href={item.label}
              >
                <span class="text-sm">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Menu;
