import type { Context } from "deco-sites/std/packs/vtex/accounts/vtex.ts";
import productListingPage, {
  Props as LoaderProps,
} from "deco-sites/std/packs/vtex/loaders/legacy/productListingPage.ts";

export type Props = LoaderProps & {
  url?: string;
};

const loader = (
  props: Props,
  req: Request,
  ctx: Context,
) =>
  productListingPage(
    props,
    new Request(props.url || req.url, { headers: req.headers }),
    ctx,
  );

export default loader;
