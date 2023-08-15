import SearchResult, {
  MainProps,
  Props,
} from "$store/components/search/SearchResult.tsx";

function SearchResultSection(props: MainProps) {
  return <SearchResult {...props} />;
}

export default SearchResultSection;
