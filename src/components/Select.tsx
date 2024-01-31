import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';


import { IoCheckmarkDoneOutline, IoChevronDown } from 'react-icons/io5';


interface SelectProps {
  selected: any;
  setSelected: any;
  list: any;
  defaultValue?: any;
}

export function Select({
  selected,
  setSelected,
  list,
}: SelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 w-full">
        <Listbox.Button className="relative cursor-pointer p-3 w-full flex border-zinc-200 bg-zinc-50 text-zinc-900 shadow-sm border-[1px] border-transparent transition-all active:border-zinc-600 active:border-[1px] hover:border-[1px] hover:border-zinc-900  focus:border-[1px] focus-within:shadow-md focus:border-zinc-900 rounded-lg">
          <span className="block truncate text-zinc-400 text-base sm:text-sm">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IoChevronDown />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-1 max-h-[170px] w-full opacity-100 overflow-auto rounded-md bg-zinc-50 py-1 text-base sm:text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
            {list.map((method: any, index: any) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg- text-primary' : 'text-gray-900'
                  }`
                }
                value={method}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                      {method.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <IoCheckmarkDoneOutline />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}