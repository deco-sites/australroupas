import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

function Simulation() {
  const {
    cart,
    loading,
  } = useCart();
  const displayInput = useSignal(false);
  const postalCodeInit = cart.value?.shippingData?.availableAddresses?.at(-1)
    ?.postalCode;
  const shippingPriceInit = cart.value?.totalizers.find((item) =>
    item.id === "Shipping"
  );
  const orderFormId = cart.value?.orderFormId || 0;
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const [postalCode, setPostalCode] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);

  const toggleInput = () => {
    displayInput.value = !displayInput.value;
  };

  const removeShipping = async (e: MouseEvent) => {
    e.preventDefault();

    const data = {
      address: null,
    };

    try {
      const response = await fetch(
        "/api/shippingsimulation?id=" + orderFormId,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            "accept": "application/json",
          },
        },
      );

      // const result = await response.json();
      if (response.status == 200) {
        setPostalCode("");
        toggleInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const simulateShipping = async (e: MouseEvent) => {
    e.preventDefault();

    if (typeof postalCode === "string") {
      const data = {
        address: {
          addressType: "residential",
          postalCode: postalCode,
          country: "BRA",
        },
      };

      try {
        const response = await fetch(
          "/api/shippingsimulation?id=" + orderFormId,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
              "accept": "application/json",
            },
          },
        );

        const result = await response.json();
        setShippingPrice(
          // deno-lint-ignore no-explicit-any
          result.totalizers.find((item: any) => item.id === "Shipping")?.value,
        );
        toggleInput();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (shippingPriceInit?.value) {
      setShippingPrice(shippingPriceInit.value);
      setPostalCode(postalCodeInit ?? "");
      toggleInput();
    }
  }, []);

  return (
    <div class="flex justify-between items-center py-2.5 px-[15px] border-b border-base-100">
      <span class="text-sm text-info w-1/2">Calcular Frete</span>
      <form class="flex w-1/2 justify-end">
        {!displayInput.value && (
          <>
            <input
              id="simulate"
              name="simulate"
              class="w-full text-sm h-8 rounded-md p-2 text-caption font-caption outline-1 outline-[#FDB913] px-2.5 border border-[#C7C7CC]"
              type="text"
              value={postalCode ?? ""}
              placeholder={""}
              onChange={(e: { currentTarget: { value: string } }) =>
                setPostalCode(e.currentTarget?.value)}
            />
            <Button
              class="text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md ml-[3px] border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              type="submit"
              htmlFor="simulate"
              loading={loading.value}
              onClick={simulateShipping}
            >
              OK
            </Button>
          </>
        )}
        {displayInput.value && (
          <>
            <div class="flex flex-col text-sm text-right text-info">
              {postalCode}
              <span class="text-primary text-xs font-bold">
                + {formatPrice(shippingPrice / 100, currencyCode!, locale)}
              </span>
            </div>
            <button
              class="ml-2.5"
              onClick={(e) => removeShipping(e)}
            >
              <Icon id="XMark" width={15} height={15} strokeWidth={1} />
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Simulation;
