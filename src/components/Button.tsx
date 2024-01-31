import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<'button'> {
  title: any;
  variant?: "blue" | "gray" | "gray400" | "red";
  icon?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "blue",
  icon = false,
  title,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`
    ${variant == "blue" && "bg-zinc-800"}
    ${variant == "gray" && "bg-zinc-500"}
    ${variant == "gray400" && "bg-[#0000004d]"}
    ${variant == "red" && "bg-red-600"}
     w-full rounded-md shadow-lg transition-all p-3 text-white font-medium hover:opacity-90 disabled:cursor-not-allowed disabled:shadow-inner  disabled:bg-[#47474719]
    `}
      {...props}
    >
      <div className="flex items-center justify-center sm:text-sm">
        {title}
        {children}
      </div>
    </button>
  )
}