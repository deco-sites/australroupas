import { useUI } from "$store/sdk/useUI.ts";

interface Props{
  name: string;
}

export default function ProductName({name}: Props){
  const { productName } = useUI();

  return (
    <>
      {/* Code and name */}
      <div class="">
        <h1 id="product-name" class="text-base leading-[140%] tracking-[.04rem] text-info lg:text-[22px]">
            {!productName.value ? name : productName.value}
        </h1>
      </div>
    </>
  );
}
