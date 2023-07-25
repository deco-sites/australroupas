import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

export interface Props {
  content: HTML[];
}

export default function TextInstitutional({ content }: Props) {
  return (
    <div class="home-container home-container-mobile">
      <div class="max-w-[900px] mx-auto my-8 text-[14px]">
        {content.map((content) => {
          return <Quilltext html={content} />;
        })}
      </div>
    </div>
  );
}
