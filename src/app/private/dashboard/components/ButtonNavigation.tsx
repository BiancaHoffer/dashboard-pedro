import { ReactNode } from "react";

interface Item {
  url: string;
  title: string;
  icon: JSX.Element;
}

interface ButtonNavigationProps {
  list: Item;
}

export function ButtonNavigation({ list }: ButtonNavigationProps) {
  return (
    <a href={list.url} className="flex items-center gap-2 rounded-lg shadow-inner p-4 bg-zinc-50 transition-all hover:bg-zinc-100 w-full">
      <div>
        {list.icon}
      </div>
      <p>{list.title}</p>
    </a>
  )
}