import SearchResult, {
  MainProps,
  Props,
} from "$store/components/search/SearchResult.tsx";

function SearchResultSection(props: MainProps) {
  return <SearchResult {...props} />;
}

export default SearchResultSection;

export function loader(
  { page, SeoTexts = [], variant, pageType }: Props,
  req: Request,
) {
  if (!page || page.breadcrumb.itemListElement.length === 0) {
    return null;
  }

  const url = new URL(req.url);

  const { item: canonical } = page
    .breadcrumb
    .itemListElement
    .reduce((curr, acc) => curr.position > acc.position ? curr : acc);

  const matching = SeoTexts.find(({ matcher }) =>
    new RegExp(matcher).test(canonical)
  );
  let searchParam;
  if (new URLPattern({ pathname: "/s" }).test(url)) {
    searchParam = url.searchParams.get("q") ?? "";
  }

  return {
    page: page,
    SeoText: matching,
    variant: variant,
    pageType: pageType,
    headingText: searchParam,
  };
}
