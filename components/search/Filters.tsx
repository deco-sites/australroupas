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
    <a href={url} class="flex items-center gap-2">
      {name != "Departments" && name != "Cor" &&
        (
          <>
            <div
              aria-checked={selected}
              class="checkbox rounded w-[18px] h-[18px] border-[#878787]"
            >
            </div>
            <span class="text-sm text-[#636366] py-[5px] px-[10px]">
              {label}
            </span>
          </>
        )}
      {name == "Cor" &&
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
      {name == "Departments" &&
        <span class="text-sm text-[#636366] py-[5px]">{label}</span>}
      {name == "Departments" &&
        quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";
  const name = key;

  return (
    <ul class={`flex flex-wrap gap-2 pb-[15px] ${flexDirection}`}>
      {values.map((item) => {
        // const { url, selected, value, quantity } = item;

        // if (key === "Cor" || key === "Tamanho") {
        //   return (
        //     <a href={url}>
        //       <Avatar
        //         content={value}
        //         variant={selected ? "active" : "default"}
        //       />
        //     </a>
        //   );
        // }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
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

  return name;
};

function Filters({ filters }: Props) {
  console.log(filters);
  return (
    <div>
      <p class="text-lg lg:text-[30px] font-bold mb-5">Filtrar por</p>
      <ul class="flex flex-col">
        {filters
          .filter(isToggle)
          .map((filter) => {
            if (filter.label == "Brands") return <></>;

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
