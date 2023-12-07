import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  scroll?: "smooth" | "auto" | "instant";
  interval?: number;
  infinite?: boolean;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) {
    return 0.0;
  }

  if (element.left > container.right + delta) {
    return 0.0;
  }

  if (element.left < container.left - delta) {
    return element.right - container.left + delta;
  }

  if (element.right > container.right + delta) {
    return container.right - element.left + delta;
  }

  return element.width;
};

// as any are ok in typeguard functions
const isHTMLElement = (x: Element): x is HTMLElement =>
  // deno-lint-ignore no-explicit-any
  typeof (x as any).offsetLeft === "number";

const setup = ({ rootId, scroll, interval, infinite }: Props) => {
  const root = document.getElementById(rootId);
  const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
  const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
  const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
  const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
  const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);

  $(`#${rootId} [${ATTRIBUTES["data-slider"]}]`).slick();

  // Unregister callbacks
  return () => {
  };
};

function Slider({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
}: Props) {
  useEffect(() => setup({ rootId, scroll, interval, infinite }), [
    rootId,
    scroll,
    interval,
    infinite,
  ]);

  return <div data-slider-controller-js />;
}

export default Slider;
