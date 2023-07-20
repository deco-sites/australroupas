import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";

export interface Props {
  title: string;
}

export default function ({ title }: Props) {
  return (
    <div>
      <div class="w-full flex justify-center items-center bg-[#F2F2F7]">
        <h1 class="py-[45px] sm:py-25 text-[18px] sm:text-[30px] tracking-[0.04em]">
          {title}
        </h1>
      </div>
      <div class="px-25">
        <Breadcrumb
          itemListElement={[
            { name: "Institucional", item: "/", position: 1, "@type":"ListItem" }, 
            {
              name: title,
              item: "/",
              position: 2,
              "@type":"ListItem"
            }]}
        />
      </div>
    </div>
  );
}
