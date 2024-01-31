"use client"

import { ComponentProps, useState } from "react";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoLockClosedOutline
} from "react-icons/io5";

interface InputProps extends ComponentProps<'input'> {
  width?: string;
  icon?: boolean
}

export function InputPass({ width = "max-w-full", icon = false, ...props }: InputProps) {
  const [show, setShow] = useState(true);

  return (
    <div className="flex bg-zinc-50 text-zinc-900 shadow-sm w-full border-[1px] border-transparent transition-all active:border-zinc-600 focus-within:shadow-md focus-within:border-zinc-600 rounded-lg">
      {icon &&
        <div className="flex items-center pl-3 text-zinc-900 text-xl">
          <IoLockClosedOutline />
        </div>
      }
      <input type={show ? "password" : "text"} className={`${width} bg-transparent w-full  p-3 rounded-lg text-base: sm:text-sm`} {...props} />
      <button type="button" onClick={() => setShow(!show)} className="text-xl pr-3 transition-all text-zinc-900 hover:text-zinc-600">
        {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
      </button>
    </div>
  )
}