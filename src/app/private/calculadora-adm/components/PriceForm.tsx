import { formatCurrency } from "@/utils/formatCurrency";
import { Dispatch, SetStateAction } from "react";

interface PriceForm {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export function PriceForm({ value, setValue }: PriceForm) {
  return (
    <div data-aos="zoom-in" className="flex flex-col gap-6 h-full w-full max-w-[400px]">
      <div className='w-full flex items-end justify-center text-center mb-[-20px]'>
        <span className='text-primary text-4xl font-semibold pb-[12px]'>
          R$
        </span>
        <p className='text-primary text-8xl sm:text-7xl p-0 m-0 w-full font-medium '>
          {formatCurrency(Number(value))}
        </p>
      </div>
      <input
        className='w-full bg-primary'
        type="range"
        min="100"
        max="10000"
        step="100"
        value={value}
        id="slider"
        onChange={e => setValue(e.target.value)}
      />
      <p className="text-center text-zinc-400 text-xs">
        * Selecione o valor do empréstimo
      </p>
    </div>
  )
}