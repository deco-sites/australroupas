import Image from "deco-sites/std/components/Image.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface INavItem {
  label: string;
  href: string;
  red?: true | false;
  children?: INavItem[];
  image?: Array<{ src: string; alt: string;}>;
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;
  const { displayOverlay } = useUI();
  return (
    <li class="group flex items-center" onMouseEnter={() => displayOverlay.value = !displayOverlay.value} onMouseLeave={() => displayOverlay.value = !displayOverlay.value}>
      <a
        href={href}
        class="border-b-2 border-b-transparent transition-all duration-300 ease-linear px-5 py-8.5 pl-8.5 group-hover:border-b-primary"
      >
        <span class="text-sm text-[#636366] tracking-widest leading-none">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed flex opacity-0 hover:opacity-90 group-hover:opacity-90 min-h-[366px] transition-all duration-300 ease-linear max-w-3xl py-8.5 bg-white z-50 items-start justify-center w-screen"
            style={{ top: "0px", left: "0px", marginTop: "95px" }}
          >
            <ul class="flex flex-col items-start justify-center">
              {children.map((node) => (
                <li class="py-1.7">
                  <a class="text-base text-info" href={node.href}>
                    <span>{node.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            {
              image?.map((item:{src: string; alt: string;}) => (
                <Image
                  class="p-6"
                  src={item.src}
                  alt={item.alt}
                  width={300}
                  height={332}
                  loading="lazy"
                />

              ))
            }
          </div>
        )}
    </li>
  );
}

export default NavItem;
