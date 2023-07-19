import { useEffect, useState } from "preact/hooks";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { useSignal } from "@preact/signals";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

function Seller() {
  const {
    cart,
    loading,
  } = useCart();
  const displayInput = useSignal(false);
  const marketingData = cart.value?.marketingData;
  const [sellerValue, setSellerValue] = useState("");

  const toggleInput = () => {
    displayInput.value = !displayInput.value;
  };

  const removeSeller = (e: MouseEvent) => {
    e.preventDefault();

    setSellerValue("");
    toggleInput();
  };

  const editSeller = (e: MouseEvent) => {
    e.preventDefault();

    toggleInput();
  };

  const sellerVerification = (e: MouseEvent) => {
    e.preventDefault();

    if (typeof sellerValue === "string") {

      toggleInput();
    }
  };

  useEffect(() => {
    if (marketingData?.coupon) {
      setSellerValue(marketingData?.coupon);
      toggleInput();
    }
  }, []);

  return (
    <div class="flex justify-between items-center py-2.5 mx-[15px] border-b border-base-100">
      <span class="text-sm text-info w-1/2">Código do Vendedor</span>
      <form class="flex w-1/2 justify-end">
        {!displayInput.value && (
          <>
            <input
              id="coupon"
              name="coupon"
              class="w-full text-sm h-8 rounded-md p-2 text-caption font-caption outline-1 outline-[#FDB913] px-2.5 border border-[#C7C7CC]"
              type="text"
              value={sellerValue ?? ""}
              placeholder={""}
              onChange={(e: { currentTarget: { value: string } }) =>
                setSellerValue(e.currentTarget?.value)}
            />
            <Button
              class="text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md ml-[3px] border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              type="submit"
              htmlFor="coupon"
              loading={loading.value}
              onClick={sellerVerification}
            >
              OK
            </Button>
          </>
        )}
        {displayInput.value && (
          <>
            <div class="flex flex-col justify-center text-sm text-right text-info">
              {sellerValue}
            </div>
            <button
              class="ml-2.5 text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              onClick={(e) => editSeller(e)}
            >
              <i
                class={`${"icon icon-edit"} text-xs text-primary`}
              >
              </i>
            </button>
            <button
              class="ml-2.5 text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              onClick={(e) => removeSeller(e)}
            >
              <Icon id="XMark" width={17} height={17} strokeWidth={1} class="mx-auto" />
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Seller;
