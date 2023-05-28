import Image from "deco-sites/std/components/Image.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface INavItem {
  label: string;
  href: string;
  red?: true | false;
  children?: INavItem[];
  image?: Array<{ src: string; alt: string }>;
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
  const { href, label, children, image, red } = item;
  const { displayOverlay, displaySearchbar, displayServiceMenu } = useUI();
  return (
    <li
      class={`group flex items-center NavItemFather${index}`}
      onMouseEnter={() => {
        displayOverlay.value = true;
        displaySearchbar.value = false;
        displayServiceMenu.value = false;
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
            class={`NavItemChildren fixed flex opacity-0 group-hover:pointer-events-auto min-h-[366px] transition-all duration-300 ease-linear pointer-events-none max-w-3xl py-8.5 bg-white z-50 items-start justify-center w-screen`}
            style={{ top: "0px", left: "0px", marginTop: "95px" }}
          >
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
            {image?.map((item: { src: string; alt: string }) => (
              <Image
                class="p-6"
                src={item.src}
                alt={item.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            ))}
          </div>
        )}
    </li>
  );
}

export default NavItem;
