import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  image: LiveImage;
  title: string;
  description: string;
  callToAction: string;
  href: string;
}

interface Card extends Props {
  hasPaddingDesktop?: boolean;
}

function Card(
  { image, title, description, callToAction, href, hasPaddingDesktop = true }:
    Card,
) {
  const paddingY = hasPaddingDesktop ? "lg:px-2.5" : "lg:px-0";
  return (
    <div class={`w-full px-4.5 ${paddingY}`}>
      <a class="block w-full" href={href}>
        <Image
          class="w-full rounded-md"
          src={image}
          alt={title}
          width={315}
        />
      </a>
      <h3 class="font-bold text-1.5xl pt-2.5 mt-2.5">{title}</h3>
      <p
        class="text-sm h-10 mt-2.5 overflow-hidden leading-normal"
        style={{
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
        }}
      >
        {description}
      </p>
      <a
        class="text-sm text-primary underline tracking-wider mt-2.5"
        href={href}
      >
        {callToAction}
      </a>
    </div>
  );
}

export default Card;
