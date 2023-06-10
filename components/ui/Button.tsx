import { forwardRef } from "preact/compat";
import type { ComponentType, JSX } from "preact";

import Spinner from "./Spinner.tsx";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "as" | "size" | "loading">
  & {
    as?: keyof JSX.IntrinsicElements | ComponentType;
    variant?: keyof typeof variants;
    loading?: boolean;
    disabled?: boolean;
    type?: string;
  };

const variants = {
  primary: "",
  white:
    "flex items-center text-center bg-white text-black px-6 py-2 rounded-md text-[14px] tracking-wide",
  blue:
    "flex justify-center items-center w-full bg-primary border-none text-white py-3 px-2.5 rounded-md mt-3 hover:bg-primary hover:opacity-80",
};

const Button = forwardRef<HTMLButtonElement, Props>(({
  variant = "primary",
  as = "button",
  type = "button",
  class: _class = "",
  children,
  loading,
  disabled,
  ...props
}, ref) => {
  const Component = as as ComponentType<
    { disabled?: boolean; className: string; type: string }
  >;
  const styles = variants[variant];

  return (
    <Component
      {...props}
      className={`inline-flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${styles} ${_class}`}
      disabled={disabled}
      type={type}
      ref={ref}
    >
      {loading === true ? <Spinner size={24} /> : children}
    </Component>
  );
});

export default Button;
