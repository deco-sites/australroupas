import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <div class="collapse relative">
      {item.children?.length
        ? (
          <Icon
            class="text-neutral absolute right-0 w-12 top-4"
            strokeWidth={1}
            size={17}
            id="ChevronRight"
          />
        )
        : ""}
      <input class="absolute right-0 w-12" type="checkbox" />
      <div class="collapse-title px-0 py-4 min-h-min">
        <a
          class="w-full block whitespace-nowrap uppercase text-sm leading-none"
          href={item.href}
        >
          {item.label}
        </a>
      </div>
      {item.children?.length
        ? (
          <div class="collapse-content">
            <ul>
              {item.children?.map((node) => (
                <li>
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

function Menu({ items }: Props) {
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
        <ul class={`px-4 flex-grow flex flex-col divide-y divide-base-100`}>
          {items.map((item) => (
            <li>
              <MenuItem item={item} />
            </li>
          ))}
        </ul>

        <ul class="flex flex-col py-2 bg-white">
          <li>
            <a
              class="flex items-center gap-4 px-4 py-2"
              href="/wishlist"
            >
              <Icon id="Heart" width={20} height={20} strokeWidth={2} />
              <span class="text-sm">Lista de desejos</span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center gap-4 px-4 py-2"
              href="https://www.deco.cx"
            >
              <Icon id="MapPin" width={20} height={20} strokeWidth={2} />
              <span class="text-sm">Nossas lojas</span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center gap-4 px-4 py-2"
              href="https://www.deco.cx"
            >
              <Icon id="Phone" width={20} height={20} strokeWidth={2} />
              <span class="text-sm">Fale conosco</span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center gap-4 px-4 py-2"
              href="https://www.deco.cx"
            >
              <Icon id="User" width={20} height={20} strokeWidth={2} />
              <span class="text-sm">Minha conta</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
