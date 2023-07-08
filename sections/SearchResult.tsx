import SearchResult, {
  MainProps,
  Props,
} from "$store/components/search/SearchResult.tsx";

function SearchResultSection(props: MainProps) {
  return <SearchResult {...props} />;
}

export default SearchResultSection;

export function loader(props: Props, req: Request) {
  const url = new URL(req.url);

  if (new URLPattern({ pathname: "/s" }).test(url)) {
    return {
      ...props,
      headingText: url.searchParams.get("q") ?? "",
    };
  }

  return {
    ...props,
    headingText: "",
  };
}
