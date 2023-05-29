import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx"
import Quilltext from "deco-sites/std/components/QuillText.tsx";

import Icon from "deco-sites/australroupas/components/ui/Icon.tsx";
import Button from "deco-sites/australroupas/components/ui/Button.tsx";

import Slider from "deco-sites/australroupas/components/ui/Slider.tsx";
import SliderJS from "deco-sites/australroupas/islands/SliderJS.tsx";

import { useId } from "preact/hooks";

export interface InstagramImage{
    image: LiveImage;
    href: string;
    altText?: string;
}

export interface Props{
    images: InstagramImage[];
    title: HTML;
}

export default function Instafeed({ images, title } : Props){

    const id = useId();

    return(
        <div class="sm:home-container">
            <div class="home-container-mobile">
                <Quilltext html={title} />
            </div>
            <div
                id={id}
                class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_48px] relative"
            >
                <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
                    {
                        images.map((image, index) => {
                            return(
                                <Slider.Item
                                index={index}
                                class={`relative carousel-item w-[80%] sm:w-[23.5%] first:ml-[15px] last:mr-[15px]`}
                                >
                                    <a class="" src={image.href} target="_blank">
                                        <Image
                                            class="w-full rounded-md"
                                            src={image.image}
                                            width={290}
                                        />
                                    </a>
                                </Slider.Item>
                            )
                        })
                    }
                
                </Slider>

                <Controls />


                <SliderJS
                rootId={id}
                interval={0}
                />
            </div>
        </div>
    )
}

function Controls() {
    return (
      <>
        <div class="hidden sm:flex items-center justify-center z-10 absolute left-[-50px] top-[calc(50%-25px)]">
          <Slider.PrevButton class="">
            <Icon
              class="text-[#636366]"
              size={50}
              id="ChevronLeft"
              strokeWidth={1}
            />
          </Slider.PrevButton>
        </div>
        <div class="hidden sm:flex items-center justify-center z-10 absolute right-[-50px] top-[calc(50%-25px)]">
          <Slider.NextButton class="">
            <Icon
              class="text-[#636366]"
              size={50}
              id="ChevronRight"
              strokeWidth={1}
            />
          </Slider.NextButton>
        </div>
      </>
    );
  }