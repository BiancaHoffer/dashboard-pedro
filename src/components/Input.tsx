import { ComponentProps } from "react";
import { IoMailOutline } from "react-icons/io5";

interface InputProps extends ComponentProps<'input'> {
  width?: string;
  icon?: boolean
}

export function Input({ width = "max-w-full", icon = false, ...props }: InputProps) {
  return (
    <div className="w-full flex bg-zinc-50 text-zinc-900 hover:border-zinc-900 shadow-sm border-[1px] border-zinc-200 transition-all active:border-zinc-600 focus-within:shadow-md focus-within:border-zinc-600 rounded-lg">
      {icon &&
        <div className="flex items-center pl-3 text-zinc-900 text-xl">
          <IoMailOutline />
        </div>
      }

      <input className={`${width} bg-transparent w-full sm:text-sm  p-3 rounded-lg`} {...props} />
    </div>
  )
}