import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

interface FilterToggleValueWithName extends FilterToggleValue {
  name: string;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity, name }: FilterToggleValueWithName,
) {
  return (
    <a href={url} class="flex items-center gap-2 w-full">
      {name != "Departments" && name != "cor" &&
        (
          <>
            <div
              aria-checked={selected}
              class="checkbox checkbox-primary rounded w-[18px] h-[18px] border-[#878787]"
            >
            </div>
            <span class="text-sm text-[#636366] py-[5px] px-[10px]">
              {label}
            </span>
          </>
        )}
      {name == "cor" &&
        (
          <>
            <div
              aria-checked={selected}
              class="checkbox filterColor rounded flex justify-center items-center w-[18px] h-[18px] border-[#878787] p-[2px]"
              title={label.toUpperCase()}
            >
              <div class="h-full w-full bg-clip-content"></div>
            </div>
            <span class="text-sm text-[#636366] py-[5px] px-[10px]">
              {label}
            </span>
          </>
        )}
      {name == "Categories" &&
        <span class="text-sm text-[#636366] py-[5px]">{label}</span>}
      {name == "Categories" &&
        quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";
  const name = key;

  if (key === "price") {
    values.sort((a, b) => {
      const rangeA = parseRange(a.value);
      const rangeB = parseRange(b.value);
      if (rangeA!.from < rangeB!.from) {
        return -1;
      }
      if (rangeA!.from > rangeB!.from) {
        return 1;
      }
      return 0;
    });
  }
  return (
    <ul class={`flex flex-wrap gap-2 pb-[15px] ${flexDirection}`}>
      {values.map((item) => {
        if (key === "price") {
          const range = parseRange(item.value);
          return range && (
            <ValueItem
              {...item}
              label={`Preço (${formatPrice(range.from)} - ${
                formatPrice(range.to)
              })`}
              name={name}
            />
          );
        }

        return <ValueItem {...item} name={name} />;
      })}
    </ul>
  );
}

const beautifyName = (name: string) => {
  if (name == "Departments") return "Categorias";
  if (name == "Brands") return "Marcas";
  if (name == "Cor") return "Cor";
  if (name == "Tamanho") return "Tamanho";
  if (name == "Preço") return "Faixa de preço";

  return name;
};

function Filters({ filters }: Props) {
  return (
    <div>
      <p class="text-lg lg:text-[30px] font-bold mb-5">Filtrar por</p>
      <ul class="flex flex-col overflow-y-scroll h-[calc(100vh-280px)] container-filter">
        {filters
          .filter(isToggle)
          .map((filter) => {
            if (filter.label == "Marca") return <></>;

            return (
              <details class="flex flex-col border-b border-b-[#C7C7CC]">
                <summary
                  class="filter cursor-pointer relative py-[15px] text-[#636366] text-sm lg:text-base"
                  style={{
                    color: beautifyName(filter.label) == "Categorias"
                      ? "#5881CA"
                      : "inherit",
                  }}
                >
                  <p>{beautifyName(filter.label)}</p>
                </summary>
                <FilterValues {...filter} />
              </details>
            );
          })}
      </ul>
    </div>
  );
}

export default Filters;
