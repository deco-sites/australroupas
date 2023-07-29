import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Feature {
  /**
   * @description Image src
   */
  image: LiveImage;
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Description and Image alt text
   */
  description: string;
}

export interface Props {
  features: Feature[];
}

function FeatureHighlights(
  { features }: Props,
) {
  return (
    <div class="container lg:mb-20">
      <div class="flex flex-col justify-center items-center lg:gap-10 mx-6 sm:flex-row sm:mx-0 sm:my-10">
        {features.map(({ image, title, description }) => (
          <div class="flex flex-col justify-center sm:justify-normal items-center gap-4 py-3 lg:py-6 sm:py-0 w-[260px]">
            <Image
              class="w-[40px]"
              src={image}
              alt={title}
              width={40}
            />
            <div class="flex flex-col gap-5 text-center">
              <span class="text-sm leading-[1.4] text-info  font-bold">{title}</span>
              <span class="text-[#3A3A3C] text-xs leading-[1.4]">{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureHighlights;
