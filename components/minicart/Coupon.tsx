import { useRef } from "preact/hooks";
// import { useSignal } from "@preact/signals";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import Button from "$store/components/ui/Button.tsx";

function Coupon() {
  const { cart, loading, addCouponsToCart } = useCart();
  const ref = useRef<HTMLInputElement>(null);
  const coupon = cart.value?.marketingData?.coupon;

  const applyCouponToCart = (e: MouseEvent) => {
    e.preventDefault();

    const text = ref.current?.value;

    if (typeof text === "string") {
      addCouponsToCart({ text });
    }
  };

  return (
    <div class="flex justify-between items-center py-2.5 mx-[15px] border-b border-base-100">
      <span class="text-sm text-info w-1/2">Cupom de Desconto</span>
      <form class="flex w-1/2">
        <input
          id="coupon"
          name="coupon"
          ref={ref}
          class="w-full text-sm h-8 rounded-md p-2 text-caption font-caption outline-1 outline-[#FDB913] px-2.5 border border-[#C7C7CC]"
          type="text"
          value={coupon ?? ""}
          placeholder={""}
        />
        <Button
          class="text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md ml-[3px] border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
          type="submit"
          htmlFor="coupon"
          loading={loading.value}
          onClick={applyCouponToCart}
        >
          OK
        </Button>
      </form>
    </div>
  );
}

export default Coupon;
