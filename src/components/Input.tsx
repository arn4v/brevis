import clsx from "clsx";
import * as React from "react";

type Props = JSX.IntrinsicElements["input"] & {};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={clsx([
          "h-full w-2/3 px-4 focus:outline-none border border-gray-200 focus:ring-2 focus:ring-black rounded-md",
          className,
        ])}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
