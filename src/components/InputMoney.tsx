import { ComponentProps, forwardRef } from "react";
import { IoMailOutline } from "react-icons/io5";

interface InputProps extends ComponentProps<'input'> {
  icon?: boolean;
}


export const InputMoney = forwardRef<HTMLInputElement, InputProps>(({ icon, ...props }, ref) => {
  return (
    <div className="w-full flex bg-zinc-50 text-zinc-900 hover:border-zinc-900 shadow-sm border-[1px] border-zinc-200 transition-all active:border-zinc-600 focus-within:shadow-md focus-within:border-zinc-600 rounded-lg">
      {icon &&
        <div className="flex items-center pl-3 text-zinc-900 text-base">
          R$
        </div>
      }
      <input className={`bg-transparent w-full sm:text-sm  p-3 rounded-lg`} ref={ref} {...props} />
    </div>
  )
})
