import { ComponentProps } from "react";

interface CalenderProps extends ComponentProps<'input'> {
  value: any;
}

export function Calender({ value = "dd/mm/aaaa", ...props }: CalenderProps) {
  return (
    <div className="relative
     w-[100%] transition-all border-transparent border-[1px] shadow-sm border-zinc-200 hover:border-zinc-900 active:border-zinc-900 focus:border-zinc-900 rounded-lg focus-within:shadow-md">
      <input
        type="date"
        id="input-date"
        lang="brl"
        value={value}
        {...props}
      />
      <button className="cursor-pointer p-[11px] w-full flex bg-zinc-50 text-zinc-900  border-[1px] border-transparent transition-all active:border-zinc-600 active:border-[1px] hover:border-[1px] hover:border-zinc-900  focus:border-[1px] focus-within:shadow-md focus:border-zinc-900 rounded-lg">
        <p className="text-start sm:text-sm">
          {value ? value : "dd/mm/aaaa"}
        </p>
      </button>
    </div>
  )
}