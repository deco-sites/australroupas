import SearchResult, {
  MainProps,
  Props,
} from "$store/components/search/SearchResult.tsx";
import { Context } from "deco/deps.ts";
import { UAParser } from "https://esm.sh/ua-parser-js@1.0.35";

function SearchResultSection(props: MainProps & { device: string }) {
  return <SearchResult {...props} />;
}

export const loader = (
  props: MainProps,
  req: Request,
  ctx: Context,
) => {
  console.log(req)
  const ua: string | null = req.headers.get("user-agent") || "";
  const cfDeviceHint: string | null = req.headers.get("cf-device-type") ||
    "";

  const device = cfDeviceHint ||
    (ua && new UAParser(ua).getDevice().type);
  console.log("device", device)
  return {
    ...props,
    device: device || "desktop",
  };
};

export default SearchResultSection;
