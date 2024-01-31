import { Dispatch, Fragment, SetStateAction, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { Button } from "../../../../components/Button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Loading } from "../../../../components/Loading";
import { toast } from "react-toastify";

interface ModalDeleteProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  client: any;
}

export function ModalDelete({ isOpen, setIsOpen, client }: ModalDeleteProps) {
  const [loading, setLoading] = useState(false);

  async function handleDeleteClient() {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "listClients", client.uid));

      toast.success("Dados excluídos com sucesso!");

      setIsOpen(false);

      setTimeout(() => { window.location.reload(); }, 1200);
    } catch {
      alert("Erro ao deletar produto. Entre em contato com o administrador.");
      setLoading(false);
    } finally {
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Excluir dados
                </Dialog.Title>
                <div>
                  <p className="text-base text-gray-500 mb-8">
                    Tem certeza que deseja apagar os dados do cliente: <strong>{client.name}</strong>?
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    title={loading ? <Loading /> : "Excluir"}
                    onClick={handleDeleteClient}
                    variant="red"
                  />
                  <Button
                    title="Cancelar"
                    type="button"
                    variant="gray400"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}