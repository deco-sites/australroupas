import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Video from "deco-sites/std/components/Video.tsx";

import Icon from "deco-sites/australroupas/components/ui/Icon.tsx";
import Button from "deco-sites/australroupas/components/ui/Button.tsx";

import Slider from "deco-sites/australroupas/components/ui/Slider.tsx";
import SliderJS from "deco-sites/australroupas/islands/SliderJS.tsx";


import { useId } from "preact/hooks";


export interface VideoProps {
    videoPlatform: "Vimeo" | "Youtube";
    /** @description o código do vídeo que fica no final da url ex: 539309773 */
    videoUrlCodeMobile: string;
    /** @description o código do vídeo que fica no final da url ex: 539309773 */
    videoUrlCodeDesktop: string;
    /** @description O título do seu vídeo */
    title: string;
}

export interface ImageProps {
    /** @description Seu banner Mobile */
    imageMobile: LiveImage;
    /** @description Seu banner Desktop */
    imageDesktop: LiveImage;
    /** @description Texto Alternativo */
    altImage?: string;
    /** @description Link para redirecionar */
    hrefImage?: string;
}

export type Item = ImageProps | VideoProps 

export interface Creative{
    creative: Item;
    label?: string;
    /** @description Textos e Botões */
    content?: Content;
    /** @description Margem interna */
    padding?: Padding;
}

export interface Carousel{
    autoplay?: boolean;
    /** @description Intervalo de tempo para o Carrossel */
    interval?: number;
}

export interface Button{
    /** @description Texto do botão */
    text?: string;
    /** @description Link do botão */
    href?: string;
    /** @description Cor do botão */
    color: "blue" | "black" | "white" | "transparent" | "link"
}

export interface Title{
    text: HTML;
    font: "lusitana" | "nunito-sans" | "Roboto-ligth" | "Palatino";
}

export interface Content{
    /** @description Dentro ou fora da imagem? */
    where?: "Dentro" | "Fora";
    /** @description Textos */
    title?: Title[];
    /** @description Alinhamento dos botões */
    align?: "center" | "left" | "right";
    /** @description Alinhamento vertical */
    verticalAlign?: "center" | "top" | "bottom";
    /** @description Botões */
    buttons?: Button[];
}

export interface Padding{
    /** @description Margem interna esquerda */
    paddingLeft?: number;
    /** @description Margem interna direita */
    paddingRight?: number;
    /** @description Margem interna cima */
    paddingTop?: number;
    /** @description Margem interna baixo */
    paddingBottom?: number;
}

export interface Column{
    /** @description Suas imagens e vídeos */
    creativeCarousel: Creative[];
    /** @description Carrossel automático */
    carouselOptions?: Carousel;
}

export interface Props{
    /** @description Colunas */
    column: Column;
    /** @description Largura máxima total */
    maxWidth?: number;
    /** @description Tela cheia */
    fullScreen: boolean;
}

const isImage= (item: Item): item is ImageProps =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.altImage === "string";

export default function Container({column, maxWidth, fullScreen} : Props){
    
    return(
        <div class={`lg:max-w-${maxWidth ? "[" + maxWidth + "px]" : "none"} mx-auto flex flex-wrap justify-center mb-10`}>
            <div>
                <BannerAustral column={column} maxWidth={maxWidth} fullScreen={fullScreen}/>
            </div>


        </div>
    )
}

function BannerAustral({column, maxWidth, fullScreen} : {column: Column; maxWidth: number | undefined; fullScreen: boolean}){
    const { creativeCarousel, carouselOptions} = column
    const id = useId();
    return(
        <div class={`relative`}>
            <div
            id={id}
            class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_48px]"
            >
            <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
                {creativeCarousel?.map((creative, index) => {
                    const { content, padding } = creative
                    if(isImage(creative.creative)){
                        return(
                            <Slider.Item index={index}  class={`carousel-item ${fullScreen ? "min-w-[100vw]" : "max-w-[calc(100vw-40px)]"}`}>
                                <div class={`${fullScreen ? `min-w-[100vw]` : ``}`}>
                                    <Image creative={creative.creative} />
                                </div>
                                <Content padding={padding} content={content}/>
                            </Slider.Item>
                        )
                    }else{
                        return(
                            <Slider.Item index={index} class={`carousel-item ${fullScreen ? "min-w-[100vw]" : "max-w-[calc(100vw-40px)]"}`}>
                                <VideoComponent creative={creative.creative} />
                                <Content padding={padding} content={content}/>
                            </Slider.Item>

                        )
                    } 
                })}
            </Slider>
            
            {
                creativeCarousel.length > 1 && <Controls />
            }

            {
                creativeCarousel.length > 1 && <Dots creativeCarousel={creativeCarousel} interval={carouselOptions?.interval} />
            }

            <a href="#scroll" class="absolute bottom-[10px] hover:bottom-[5px] left-1/2 transform -translate-x-1/2 px-4 py-3 transition-all duration-150 cursor-pointer">
                <i class="icon icon-mouse text-white text-[26px]"></i>
            </a>

            <SliderJS rootId={id} interval={carouselOptions?.interval && carouselOptions.interval * 1e3} />
            </div>
        </div>
    )
}

function Content({padding, content} : {padding: Padding | undefined; content: Content | undefined}){

    const align = content?.align == "center" ? "justify-center" : content?.align == "left" ? "justify-start" : "justify-end"
    const verticalAlign = content?.verticalAlign == "center" ? "justify-center" : content?.verticalAlign == "top" ? "justify-start" : "justify-end"

    return(
        <div class={`w-full h-full ${content?.where == "Dentro" ? "absolute top-0" : ""} flex flex-col ${verticalAlign} 
            pl-[${padding?.paddingLeft}px]
            pr-[${padding?.paddingRight}px]
            pt-[${padding?.paddingTop}px]
            pb-[${padding?.paddingBottom}px]`}>
            <div class="w-full">
                {
                    content?.title?.map(title => {
                        return(
                            <div class={`font-${title.font}`}>
                                <Quilltext html={title.text} />
                            </div>
                        )
                    })
                }
            </div>
            <div class={`w-full flex gap-5 py-2.5 ${align}`}>
                {
                    content?.buttons?.map(button => {
                        const color = button.color;
                        return(
                            <Button 
                                as="a"
                                href={button.href}
                                class="flex items-center text-center"
                            >{button.text}</Button>
                        )
                    })
                }
            </div>
        </div>
    )
}

function Image({creative} : Creative){
    return(
        <a href={(creative as ImageProps).hrefImage}>
            <Picture>
            <Source
                media="(max-width: 1024px)"
                fetchPriority={"high"}
                src={(creative as ImageProps).imageMobile}
                width={360}
                height={600}
            />
            <Source
                media="(min-width: 1025px)"
                fetchPriority={"high"}
                src={(creative as ImageProps).imageDesktop}
                width={1440}
                height={680}
            />
            <img
                class="object-cover w-full sm:h-full"
                loading={"eager"}
                src={(creative as ImageProps).imageDesktop}
                alt={(creative as ImageProps).altImage}
            />
            </Picture>
        </a>
    )
}

function VideoComponent({creative} : Creative){
    return(
        <>
            <div class="block lg:hidden">
                <Video
                src={(creative as VideoProps).videoUrlCodeMobile}
                width={150}
                height={150}
                class="w-full h-auto"
                loop
                muted
                autoPlay
                playsInline
                loading={"eager"}
                >
                </Video>
            </div>
            <div class="hidden lg:block">
                <Video
                src={(creative as VideoProps).videoUrlCodeDesktop}
                width={150}
                height={150}
                class="w-full h-auto"
                loop
                muted
                autoPlay
                playsInline
                loading={"eager"}
                >
                </Video>
            </div>
            </>
    )
}

function Controls() {
    return (
        <>
          <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
            <Slider.PrevButton class="">
              <Icon
                class="text-base-100"
                size={50}
                id="ChevronLeft"
                strokeWidth={1}
              />
            </Slider.PrevButton>
          </div>
          <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
            <Slider.NextButton class="">
              <Icon
                class="text-base-100"
                size={50}
                id="ChevronRight"
                strokeWidth={1}
              />
            </Slider.NextButton>
          </div>
        </>
      );
  }
  

function Dots({ creativeCarousel, interval = 0 }: {creativeCarousel: Creative[]; interval: number | undefined}) {
    return (
        <>
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @property --dot-progress {
                syntax: '<percentage>';
                inherits: false;
                initial-value: 0%;
              }
              `,
            }}
          />
          <ul class="flex w-full absolute top-[100%] carousel justify-center col-span-full gap-2 z-10 row-start-4">
            {creativeCarousel?.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div class="py-5">
                    <div
                      class="w-2 h-2 rounded-full bg-[rgba(0,0,0,0.2)] group-disabled:bg-[#000] "
                      style={{ animationDuration: `${interval}s` }}
                    />
                  </div>
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </>
      );
  }