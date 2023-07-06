import type { SectionProps } from "$live/mod.ts";

export interface Props {
  text: string;
}

export const loader = ({ text }: Props, req: Request) => {
  const url = new URL(req.url);
  console.log(req)
  console.log(text)

  if (new URLPattern({ pathname: "/s" }).test(url)) {
    return {
      headingText: url.searchParams.get("q") ?? "",
      text: text,
      url: url
    };
  }

  return {
    headingText: "",
    text: text,
    url: url
  };
};

export default function HeadingSearchResult({ text, headingText, url }: SectionProps<typeof loader>) {
  console.log(headingText)
  console.log(url)
  return (
    <div class="home-container-mobile sm:home-container text-center py-12">
      <div class="max-w-[1280px] mx-auto">
        <p>{text ? text : "Você buscou por:"}</p>
        <h1>{headingText ? headingText : ""}</h1>
      </div>
    </div>
  );
}
