import type { Props as ICard } from "$store/components/ui/Card.tsx";
import type { Props as IProductShelf } from "$store/components/product/ProductShelf.tsx";
import Card from "$store/components/ui/Card.tsx";
import ProductShelf from "$store/sections/ProductShelf.tsx";

import type { Manifest } from "deco-sites/australroupas/live.gen.ts";
import { BlockInstance } from "$live/engine/block.ts";

export interface Props {
  card: ICard;
  // productShelf: IProductShelf;
  productShelf: BlockInstance<"deco-sites/australroupas/sections/ProductShelf.tsx", Manifest>
}

function CardPlusShelf(
  { card, productShelf }: Props,
) {
  return (
    <div class="sm:home-container mb-10 lg:mb-15">
      <div>
        <Card {...card} />
      </div>
      <div>
        {/* <ProductShelf {...productShelf} /> */}
      </div>
    </div>
  );
}

export default CardPlusShelf;
