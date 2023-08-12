import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

export interface Feature {
  /**
   * @description Image src
   */
  image: LiveImage;
  
  text: HTML;
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
        {features.map(({ image, text }) => (
          <div class="flex flex-col justify-center sm:justify-normal items-center gap-4 py-3 lg:py-6 sm:py-0 w-[260px]">
            <Image
              class="w-[40px]"
              src={image}
              alt={""}
              width={40}
            />
            <div class="flex flex-col lg:gap-5 text-center">
              <Quilltext html={text} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureHighlights;
