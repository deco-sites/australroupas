import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";
import { useUI } from "$store/sdk/useUI.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  openPdp: boolean;
  url: string;
  currentUrl: string;
}

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    openPdp,
    url,
    currentUrl,
  }: Props,
) {
  const {
    displayModalSelectSKU,
  } = useUI();

  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  const classBtn =
    "flex cursor-pointer justify-center items-center w-full bg-primary border-none text-white py-3 px-2.5 rounded-md mt-3 hover:bg-primary hover:opacity-80 max-w-[385px]";

  if (openPdp) {
    return (
      <a
        href={url}
        class={classBtn}
      >
        Adicionar à Sacola
      </a>
    );
  }

  if (currentUrl.indexOf("skuId") == -1) {
    return (
      <>
        <div
          class={classBtn}
          onClick={() => displayModalSelectSKU.value = true}
        >
          Adicionar à Sacola
        </div>
      </>
    );
  }

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class={classBtn}
    >
      Adicionar à Sacola
    </Button>
  );
}

export default AddToCartButton;
