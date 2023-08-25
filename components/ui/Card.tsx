import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface Props {
  image: LiveImage;
  mobileImage?: LiveImage;
  subTitle?: string;
  title: string;
  description: string;
  callToAction: string;
  href: string;
}

interface CardProps extends Props {
  index?: number;
}

function Card(
  { image, title, description, callToAction, href, subTitle = "", index, mobileImage = "" }:
    CardProps,
) {
  return (
    <div class={`w-full px-4.5 lg:px-0`}>
      <a class="block w-full" href={href}>
        {/* <Image
          class="w-full rounded-md"
          loading={"lazy"}
          fetchPriority={"low"}
          src={image}
          alt={title}
          width={400}
          height={250}
        /> */}
        <Picture preload={false}>
          <Source
            media="(max-width: 1024px)"
            fetchPriority={"low"}
            src={mobileImage ? mobileImage : image}
            width={400}
            height={250}
            preload={false}
          />
          <Source
            media="(min-width: 1025px)"
            fetchPriority={"low"}
            src={image}
            width={545}
            height={341}
            preload={false}
          />
          <img
            class={`w-full rounded-md`}
            loading={"lazy"}
            src={image}
            alt={title}
          />
        </Picture>
      </a>
      {subTitle &&
        <p class="mt-5 text-sm mb-2.5">{subTitle}</p>}
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
        class="text-sm text-primary underline tracking-wider block mt-2.5"
        href={href}
      >
        {callToAction}
      </a>
    </div>
  );
}

export default Card;
