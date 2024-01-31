"use client"

import { ItemListClients } from "./ItemListClients";
import { ClientData } from "@/@types/clients";

interface ListClientsProps {
  list: any;
  loadingFilter: boolean;
}

export function ListClients({ list, loadingFilter }: ListClientsProps) {
  return (
    <div className="w-full rounded-md border-2 border-b-0 border-zinc-100 overflow-auto shadow-inner">
      <table className="w-full rounded-2xl ">
        <thead className="bg-zinc-50 text-zinc-500">
          <tr className="text-xs">
            <th className="p-5">Cliente</th>
            <th className="p-5">CPF/CNPJ</th>
            <th></th>
            <th className="p-5" >Ações</th>
          </tr>
        </thead>
        {loadingFilter ?
          <tbody>
            <tr className=" transition-colors border-b-2 border-zinc-100">
              <td className="px-4 py-8 text-zinc-600">
                Buscando clientes...
              </td>
            </tr>
          </tbody>
          : list?.length !== 0 ?
            <tbody className="w-full">
              {list?.map((item: ClientData) => {
                return (
                  <ItemListClients item={item} key={item.uid} />
                )
              })}
            </tbody>
            :
            <tbody>
              <tr className=" transition-colors border-b-2 border-zinc-100">
                <td className="px-4 py-8 text-zinc-600">
                  Nenhum cliente encontrado
                </td>
              </tr>
            </tbody>
        }
      </table>
    </div>
  )
}