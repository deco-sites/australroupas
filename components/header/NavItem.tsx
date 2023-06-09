import Image from "deco-sites/std/components/Image.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { Props as ICard } from "$store/components/ui/Card.tsx";
import Card from "$store/components/ui/Card.tsx";

export interface INavItem {
  label: string;
  href: string;
  red?: true | false;
  children?: INavItem[];
  firstCard?: ICard;
  secondCard?: ICard;
  opacityMenu?:
    | "0.10"
    | "0.20"
    | "0.30"
    | "0.40"
    | "0.50"
    | "0.60"
    | "0.70"
    | "0.80"
    | "0.90"
    | "1";
}

function NavItem({ item, index }: { item: INavItem; index: number }) {
  const { href, label, children, firstCard, secondCard, red } = item;
  const { displayOverlay, displaySearchbar } = useUI();
  return (
    <li
      class={`group flex items-center NavItemFather${index}`}
      onMouseEnter={() => {
        displayOverlay.value = true;
        displaySearchbar.value = false;
      }}
      onMouseLeave={() => displayOverlay.value = false}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .NavItemFather${index}:hover .NavItemChildren {
            opacity: ${item.opacityMenu}
          }
        `,
        }}
      />
      <a
        href={href}
        class="border-b-2 border-b-transparent transition-all duration-300 ease-linear px-5 py-8.5 pl-8.5 group-hover:border-b-primary"
      >
        <span
          class={`text-sm tracking-widest leading-none ${
            red ? "text-[#DB1616]" : "text-[#636366]"
          }`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`NavItemChildren fixed opacity-0 group-hover:pointer-events-auto min-h-[366px] transition-all duration-300 ease-linear pointer-events-none py-8.5 bg-white z-50 w-screen`}
            style={{ top: "0px", left: "0px", marginTop: "95px" }}
          >
            <div class="max-w-3xl flex justify-evenly items-start mx-auto">
              <ul class="flex flex-col items-start justify-center">
                {children.map((node) => (
                  <li class="py-1.7">
                    <a class="text-base text-info" href={node.href}>
                      <span class={`${node.red ? "text-[#DB1616]" : ""}`}>
                        {node.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div class="flex gap-5 max-w-[850px]">
                {firstCard && (
                  <div class="max-w-md">
                    <Card {...firstCard} />
                  </div>
                )}
                {secondCard && (
                  <div class="max-w-md">
                    <Card {...secondCard} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
