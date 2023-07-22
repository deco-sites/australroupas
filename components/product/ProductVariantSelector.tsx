import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product, product: { url } }: Props) {
  const possibilities = useVariantPossibilities(product);
  const variantsProduct = product?.isVariantOf?.hasVariant;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .color-label[data-color="STONE VINHO" i] {
              background-color: #924e54 !important
          }
          
          .color-label[data-color="Salmão" i] {
              background-color: #e5bbae !important
          }
          
          .color-label[data-color="AZUL" i] {
              background-color: #324576 !important
          }
          
          .color-label[data-color="AZUL CLARO" i] {
              background-color: #6d9acd !important
          }
          
          .color-label[data-color="AZUL MARINHO" i] {
              background-color: #1c202b !important
          }
          
          .color-label[data-color="BEGE" i] {
              background-color: #c3a78b !important
          }
          
          .color-label[data-color="BRANCO" i] {
              background-color: #f8f8f8 !important
          }
          
          .color-label[data-color="CARVÃO" i],.color-label[data-color="CARVAO" i],.color-label[data-color="Carvão" i] {
              background-color: #5d5d5f !important
          }
          
          .color-label[data-color="CINZA" i] {
              background-color: #9b9b9b !important
          }
          
          .color-label[data-color="CINZA MESCLA ESCURO" i] {
              background-color: #505050 !important
          }
          
          .color-label[data-color="CREME" i] {
              background-color: #e3dccb !important
          }
          
          .color-label[data-color="JEANS CLARO" i] {
              background-color: #aac0d0 !important
          }
          
          .color-label[data-color="KHAKI" i] {
              background-color: #c3aa86 !important
          }
          
          .color-label[data-color="MARROM" i] {
              background-color: #5b4633 !important
          }
          
          .color-label[data-color="NATURAL" i] {
              background-color: #dfdbcc !important
          }
          
          .color-label[data-color="OFF WHITE" i] {
              background-color: #eee9d9 !important
          }
          
          .color-label[data-color="PRETO" i] {
              background-color: #0f0f0f !important
          }
          
          .color-label[data-color="PRETO PLAIN" i] {
              background-color: #000 !important
          }
          
          .color-label[data-color="STONE AZUL BRAZILIAN" i] {
              background-color: #526ca8 !important
          }
          
          .color-label[data-color="STONE AZUL MEDITERRANEO" i] {
              background-color: #6b87af !important
          }
          
          .color-label[data-color="STONE AZUL MIDNIGHT" i] {
              background-color: #3f4362 !important
          }
          
          .color-label[data-color="STONE AZUL ROYAL" i] {
              background-color: #566372 !important
          }
          
          .color-label[data-color="STONE AZUL VERÃO" i],.color-label[data-color="STONE AZUL VERAO" i] {
              background-color: #99b5db !important
          }
          
          .color-label[data-color="STONE BEGE" i] {
              background-color: #bf9a76 !important
          }
          
          .color-label[data-color="STONE CINZA CLARO" i] {
              background-color: #c9c9c9 !important
          }
          
          .color-label[data-color="STONE CINZA OLD" i] {
              background-color: #5d5d5f !important
          }
          
          .color-label[data-color="STONE CORAL" i] {
              background-color: #d9a1a3 !important
          }
          
          .color-label[data-color="STONE PRETO OLD" i] {
              background-color: #2a292e !important
          }
          
          .color-label[data-color="STONE VERDE FLORESTA" i] {
              background-color: #5e6963 !important
          }
          
          .color-label[data-color="STONE VERDE MUSGO" i] {
              background-color: #8b8f6d !important
          }
          
          .color-label[data-color="STONE VERDE VERÃO" i],.color-label[data-color="STONE VERDE VERAO" i] {
              background-color: #0ea2a4 !important
          }
          
          .color-label[data-color="TAUPE" i] {
              background-color: #d8ccbe !important
          }
          
          .color-label[data-color="VERDE" i] {
              background-color: #717e67 !important
          }
          
          .color-label[data-color="VERDE MILITAR" i] {
              background-color: #5d6650 !important
          }
          
          .color-label[data-color="VERDE OLIVA" i] {
              background-color: #989f86 !important
          }
        `,
        }}
      />
      <ul class="flex flex-col gap-4">
        {Object.keys(possibilities).map((name) => (
          <li class="flex flex-col gap-2">
            <span class="text-sm">{name}</span>
            <ul class="flex flex-row gap-3">
              {Object.entries(possibilities[name]).map(([value, [link]]) => {
                // deno-lint-ignore no-explicit-any
                const hasStock = variantsProduct?.find((variant: any) =>
                  // deno-lint-ignore no-explicit-any
                  variant?.additionalProperty.find((property: any) =>
                    property.value == value
                  )
                )?.offers?.offers[0].availability ==
                  "https://schema.org/InStock";

                return (
                  <li>
                    <a
                      href={hasStock ? link : ""}
                      style={{ pointerEvents: !hasStock ? "none" : "" }}
                    >
                      <Avatar
                        content={value}
                        variant={link === url ? "active" : "PDP"}
                        name={name}
                        disponibility={hasStock}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default VariantSelector;
