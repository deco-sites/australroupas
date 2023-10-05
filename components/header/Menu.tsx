import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { CallToUsItem } from "./Header.tsx";

export interface Props {
  items: INavItem[];
  callToUsItem: CallToUsItem[];
}

function MenuItem({ item, index }: { item: INavItem; index: number }) {
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .MenuItem${index}:checked ~ .MenuItemChildren {
            left: 0;
          }
        `,
        }}
      />

      <input
        type="checkbox"
        class={`MenuItem${index} hidden`}
        name={`item${index}`}
        id={`item${item.label}`}
      />
      <label
        class="absolute right-0 w-12 h-[46px] z-10"
        for={`item${item.label}`}
      >
      </label>
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
            class={`-left-full 
            MenuItemChildren fixed top-0 transition-all w-[calc(100%-40px)] bg-white z-50 h-full duration-300 ease-linear`}
          >
            <ul class="">
              <li class="border-b border-b-base-100 bg-base-100 py-4 leading-none">
                <Icon
                  class="text-primary absolute -left-2 w-12 top-4 pointer-events-none"
                  strokeWidth={1}
                  size={17}
                  id="ChevronLeft"
                />
                <label
                  aria-label="Voltar"
                  for={`item${index}`}
                  class="w-full h-full text-left text-primary text-base leading-none px-12"
                >
                  Voltar
                </label>
              </li>
              {item.children?.map((node: INavItem, index: number) => (
                <li class="border-b border-b-base-100 px-4">
                  <MenuItem
                    item={node}
                    index={Number(index.toString() + index.toString())}
                  />
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
  return (
    <>
      <input
        type="checkbox"
        class="menuModalCheckbox hidden"
        name="menu"
        id="menu"
      />
      <div
        class={`overlayMenu -left-full fixed top-0 transition-all w-full bg-info opacity-60 z-40 h-full duration-300 ease-linear`}
      />
      <div
        class={`MenuModal -left-full fixed top-0 transition-all w-[calc(100%-40px)] bg-white z-50 h-full duration-300 ease-linear`}
      >
        <label
          aria-label="Close"
          class="absolute -right-10 top-2"
          for="menu"
        >
          <Icon
            id="XMark"
            width={35}
            height={35}
            strokeWidth={1.5}
            class="text-white"
          />
        </label>
        <ul class={`px-4 flex-grow flex flex-col`}>
          {items.map((item, index) => (
            <li class="border-b border-b-base-100">
              <MenuItem item={item} index={index} />
            </li>
          ))}
        </ul>

        <ul class="flex flex-col mt-7 bg-white">
          <li>
            <a
              class="flex items-center gap-4 px-4"
              href="/"
            >
              <i class="icon-phone text-xl"></i>
              <span class="text-sm text-[#636366] leading-none">
                ATENDIMENTO
              </span>
            </a>
          </li>
          {callToUsItem.map((item) => (
            <li>
              <a
                class="flex items-center gap-5 px-4 pt-4"
                href={item.label}
              >
                <span class="text-sm leading-none">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Menu;
