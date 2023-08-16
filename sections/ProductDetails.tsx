import ProductDetails, {
  MainProps,
  Props,
} from "$store/components/product/ProductDetails.tsx";

function ProductDetailsSection(props: MainProps) {
  return <ProductDetails {...props} />;
}

export default ProductDetailsSection;

export function loader({ page, variant }: Props, req: Request) {
  return {
    currentUrl: req.url,
    page: page,
    variant: variant,
  };
}
