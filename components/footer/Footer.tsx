import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ComponentChildren } from "preact";
import type { Props as INewsletter } from "$store/components/footer/Newsletter.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export type IconItem = { icon: AvailableIcons };

export interface LinkItem {
  label: string;
  href: string;
  openInNewPage: boolean;
}

export interface paymentItem {
  icon: IconItem;
  width?: number;
}

export interface socialMediaItem {
  icon: IconItem;
  href: string;
  openInNewPage: boolean;
}

export type Section = {
  label: string;
  href?: string;
  openInNewPage?: boolean;
  children: LinkItem[];
};

export type Logo = {
  image: LiveImage;
  alt: string;
  href: string;
  openInNewPage?: boolean;
};

export interface Props {
  newsletter: INewsletter;
  sections?: Section[];
  socialMedia?: socialMediaItem[];
  payment?: paymentItem[];
  allRightsReserved: string;
  logos?: Logo[];
}

function SocialMediaFooter({ item }: { item: socialMediaItem }) {
  return (
    <div class="border-base-100 border border-solid py-1.5 px-2.5">
      <Icon
        id={item.icon.icon}
        width={25}
        height={20}
        strokeWidth={1}
      />
    </div>
  );
}

function PaymentIconFooter({ item }: { item: paymentItem }) {
  return (
    <div class="border-base-100 border border-solid py-1.5 px-1">
      <Icon
        id={item.icon.icon}
        height={25}
        width={item.width}
        strokeWidth={1}
      />
    </div>
  );
}

function LinkItemFooter({ item }: { item: LinkItem }) {
  return (
    <a href={item.href}>
      {item.label}
    </a>
  );
}

function Footer(
  {
    newsletter,
    sections = [],
    socialMedia,
    payment,
    allRightsReserved,
    logos = [],
  }: Props,
) {
  return (
    <>
      <Newsletter {...newsletter} />
      <footer class="w-full bg-base-100 flex flex-col">
        <div class="home-container-mobile sm:home-container flex flex-col sm:flex-row">
          {/* Desktop view */}
          <ul class="hidden sm:flex flex-row justify-between w-full pt-12 pb-10">
            {sections.map((section) => (
              <li class="w-full">
                <div>
                  <span class="font-semibold text-[14px] text-info">
                    <a
                      href={section.href}
                      target={section.openInNewPage ? "_blank" : ""}
                    >
                      {section.label}
                    </a>
                  </span>

                  <ul
                    class={`flex flex-col gap-3 pt-2 flex-wrap`}
                  >
                    {section.children.map((item) => (
                      <li class="text-[14px]">
                        <LinkItemFooter item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col sm:hidden sm:flex-row sm:gap-4">
            {sections.map((section) => (
              <li>
                <span class="text-info">
                  <details
                    id="footer"
                    class="border-b-[1px] border-[#C7C7CC] group"
                  >
                    <summary class="py-[15px] relative">
                      <a
                        href={section.href}
                        target={section.openInNewPage ? "_blank" : ""}
                        class="text-[12px] font-semibold"
                      >
                        {section.label}
                      </a>
                      <span class="block absolute right-0 top-[22px] group-open:hidden text-[9px] text-info">
                        <i class="icon icon-plus"></i>
                      </span>
                      <span class="hidden absolute right-0 top-[22px] group-open:block text-[9px] text-info">
                        <i class="icon icon-minus"></i>
                      </span>
                    </summary>

                    <ul
                      class={`flex flex-col gap-2 text-[12px] mb-5`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <LinkItemFooter item={item} />
                        </li>
                      ))}
                    </ul>
                  </details>
                </span>
              </li>
            ))}
          </ul>

          <div class="flex flex-col gap-2.5 w-full sm:w-[25%] items-center pt-12 pb-10">
            <ul class="flex w-full justify-around sm:justify-center">
              {socialMedia?.map((icon) => {
                return (
                  <li class="cursor-pointer">
                    <SocialMediaFooter item={icon} />
                  </li>
                );
              })}
            </ul>

            <ul class="flex w-full justify-around sm:justify-center">
              {payment?.map((icon) => {
                return (
                  <li>
                    <PaymentIconFooter item={icon} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div class="home-container-mobile sm:home-container w-full">
          <div class="flex flex-col sm:flex-row gap-5 sm:gap-0 justify-between pt-[30px] pb-10 border-t-[1px] border-[#C7C7CC]">
            <p class="text-info text-center sm:text-left text-[12px] tracking-wide">
              {allRightsReserved}
            </p>
            <div class="flex gap-5">
              <span class="flex items-center justify-center gap-1 text-info">
                <a
                  href="https://www.deco.cx"
                  aria-label="powered by https://www.deco.cx"
                >
                  <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
                </a>
              </span>
              {logos.length > 0 &&
                logos.map((logo) => (
                  <span class="flex items-center justify-center gap-1 text-info">
                    <a
                      href={logo.href}
                      aria-label={"powered by " + logo.alt}
                    >
                      <Image
                        src={logo.image}
                        alt={logo.alt}
                        width={60}
                        class="object-cover object-center"
                      />
                    </a>
                  </span>
                ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
