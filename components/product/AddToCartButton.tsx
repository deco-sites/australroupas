import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  openPdp: boolean;
  url: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name, openPdp, url }:
    Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  const classBtn =
    "flex justify-center items-center w-full bg-primary border-none text-white py-3 px-2.5 rounded-md mt-3 hover:bg-primary hover:opacity-80";

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
