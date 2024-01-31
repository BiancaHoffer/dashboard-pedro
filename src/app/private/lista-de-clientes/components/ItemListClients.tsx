import { maskCPF } from "@/Masks/masks";
import { useState } from "react";
import { ModalDelete } from "./ModalDelete";
import { ModalNewContract } from "./ModalNewContract";
import { ModalNewNote } from "./ModalNewNote";
import { ModalEdit } from "./ModalEdit";
import { ClientData } from "@/@types/clients";

interface ItemListProps {
  item: ClientData;
}

export function ItemListClients({ item }: ItemListProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalContract, setOpenModalContract] = useState(false);
  const [openModalNote, setOpenModalNote] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  return (
    <>
      <tr className="transition-all hover:bg-zinc-100">
        <td className="p-4 sm:py-1 sm:px-4 sm:text-sm min-w-[280px]">
          {item?.name}
        </td>
        <td className="flex w-full justify-center gap-8 p-6 sm:py-2 sm:px-4 sm:text-sm  min-w-[200px]">
          {item.cpf !== null && maskCPF(item?.cpf)}
        </td>
        <td />
        <td className="flex w-full justify-center gap-2 p-6 sm:py-2 sm:px-4 sm:text-sm ">
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-sm border-[1px] border-zinc-900 rounded-md p-1 transition-all hover:bg-zinc-900 hover:text-white"
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => setOpenModalEdit(true)}
            className="text-sm border-[1px] border-zinc-900 rounded-md p-1 transition-all hover:bg-zinc-900 hover:text-white"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => setOpenModalContract(true)}
            className="text-sm border-[1px] border-zinc-900 rounded-md p-1 transition-all hover:bg-zinc-900 hover:text-white"
          >
            Criar contrato
          </button>
          <button
            type="button"
            onClick={() => setOpenModalNote(true)}
            className="text-sm border-[1px] border-zinc-900 rounded-md p-1 transition-all hover:bg-zinc-900 hover:text-white"
          >
            Criar nota promissória
          </button>
        </td>
      </tr>
      <ModalDelete
        client={item}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
      <ModalNewContract
        client={item}
        isOpen={openModalContract}
        setIsOpen={setOpenModalContract}
      />
      <ModalNewNote
        client={item}
        isOpen={openModalNote}
        setIsOpen={setOpenModalNote}
      />
      <ModalEdit
        client={item}
        isOpen={openModalEdit}
        setIsOpen={setOpenModalEdit}
      />
    </>
  )
}