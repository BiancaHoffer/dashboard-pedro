"use client"

import { ModalSignOut } from "@/components/ModalSignOut";
import { useAuth } from "@/hooks/useAuth";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { IoIosCalculator, IoIosCopy, IoIosDocument } from "react-icons/io";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";

interface privateLayoutProps {
  children: ReactNode;
}

interface SidebarItem {
  expanded: boolean;
}

const icons = [
  <MdSpaceDashboard />,
  <IoIosCalculator />,
  <IoIosCopy />,
  <IoIosDocument />,
  <PiUsersThreeFill />
]

const items = [
  {
    icon: icons[0],
    url: "/private/dashboard",
    title: "Dashboard"
  },
  {
    icon: icons[1],
    url: "/private/calculadora-adm",
    title: "Calculadora"
  },
  {
    icon: icons[2],
    url: "/private/gerador-de-contrato",
    title: "Contrato"
  },
  {
    icon: icons[3],
    url: "/private/gerador-de-nota-primissoria",
    title: "Nota Promissória"
  },
  {
    icon: icons[4],
    url: "/private/lista-de-clientes",
    title: "Lista de clientes"
  }
]

export default function privateLayout({ children }: privateLayoutProps) {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="border-b-[1px] h-[7vh] bg-white w-full flex items-center p-[16px]">
        <button
          onClick={() => setExpanded(!expanded)}
          className=" bg-zinc-100 transition-all rounded-[4px] text-2xl p-2 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 "
        >
          {expanded ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
      </div>
      <div className="flex flex-row h-[93vh]">
        <aside className={`overflow-hidden transition-all shadow-xl z-10 ${expanded ? "w-[300px] sm:w-full" : "w-[79px]"}`}>
          <nav className={`h-full flex flex-col justify-between shadow-slate-300 border-r-[1px] bg-zinc-50
            }`}>
            <div className="flex flex-col justify-between p-3 sm:px-2 h-full w-full">
              <SidebarItem expanded={expanded} />
              <button onClick={() => setOpenModal(true)} className="w-full text-zinc-700 h-[60px] font-medium transition-all hover:shadow-sm hover:bg-zinc-200 hover:text-zinc-900 hover:font-bold rounded-[4px] px-2 py-6 cursor-pointer flex items-center gap-2 text-xl">
                <span className={`overflow-hidden transition-all ${!expanded && 'pl-2'}`}>
                  <IoLogOut />
                </span>
                <div className={` ${expanded ? '' : 'w-[0px] text-transparent'}`}>
                  <p className={`overflow-hidden transition-all duration-[1.2s] text-sm `}>
                    Sair
                  </p>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2 px-3 py-5 border-t-[1px] h-[120px]">
              <img
                className="w-12"
                src="/avatar.png"
                alt="Avatar Pedro Junior"
              />
              <div className={`${expanded ? 'w-[100%]' : 'w-0'}`}>
                <p className={`text-zinc-900 overflow-hidden transition-all flex flex-col font-bold  text-[12px]`}>
                  Predro Júnior
                  <strong className="text-[10px] w-full sm:text-[8px] text-zinc-400 font-medium transition-all duration-[1.2s]">
                    pedrodeoliveirajr@live.com
                  </strong>
                </p>
              </div>
            </div>
          </nav>
        </aside >
        <main className={`h-[93vh] overflow-auto w-full ${expanded ? "sm:w-0" : "sm:w-full"}`}>
          {children}
        </main>
      </div>

      <ModalSignOut
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
    </div>
  )
}

export function SidebarItem({ expanded }: SidebarItem) {
  return (
    <div className="flex flex-col transition-all">
      {items.map(item => {
        return (
          <a key={item.url} href={item.url} className={` text-zinc-700 h-[60px] font-medium transition-all hover:shadow-sm hover:bg-zinc-200 hover:text-zinc-900 hover:font-bold rounded-[4px] px-2 py-6 cursor-pointer flex items-center gap-2 text-xl`}>
            <span className={`${!expanded && 'pl-2'}`}>
              {item.icon}
            </span>

            <div className={` ${expanded ? 'w-[100%] ' : 'w-[0px] text-transparent'}`}>
              <p className={`overflow-hidden transition-all duration-[1.2s] text-sm `}>
                {item.title}
              </p>
            </div>
          </a>
        )
      })}

      <span
        className={`overflow-hidden transition-all duration-1000  ${expanded ? "w-[300px]" : "w-0"
          }`}
      />
    </div>
  )
}
