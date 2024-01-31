import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState
} from "react";

import { Button } from "../../../../components/Button";

import { Dialog, Transition } from "@headlessui/react";

import { BsFilePdf } from "react-icons/bs";
import { IoIosAlert } from "react-icons/io";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDF } from "../../gerador-de-contrato/components/PDF";
import { ClientData } from "@/@types/clients";
import { maskCEP, maskCPF } from "@/Masks/masks";
import { dateFormat } from "@/utils/dateFormart";

interface ModalDeleteProps {
  client: ClientData;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ModalNewContract({ isOpen, setIsOpen, client }: ModalDeleteProps) {
  const [inspectDataIsComplete, setInspectDataIdComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    function inspectDataIdComplete() {
      if (
        client.rg === ""
        || client?.phone === ""
        || client?.nationality === ""
        || client?.profession === ""
        || client?.maritalState.name === ""
        || client?.maritalState.name === "Selecionar estado civil"
        || client?.valueScheduleContract === ""
        || client?.dateFinalScheduleContract === ""
      ) {
        setInspectDataIdComplete(true)
      } else {
        setInspectDataIdComplete(false);
      }
    }
    inspectDataIdComplete()
  }, [isOpen, client.uid])

  useEffect(() => {
    setIsClient(true)
  }, []);

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
              <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Criar contrato
                </Dialog.Title>
                <div>
                  <p className="text-base text-gray-500 mb-2">
                    Você está criando um contrato para o cliente <strong>{client.name}</strong>.
                  </p>
                  {inspectDataIsComplete &&
                    <div className="bg-orange-50 flex gap-2 p-3 rounded-md mb-4">
                      <p className="text-orange-400 text-xl mt-1">
                        <IoIosAlert />
                      </p>
                      <p className="text-orange-400 text-sm text-justify">
                        Esse cliente possui dados incompletos, por isso, algumas informações podem faltar no contrato. Acesse a edição do cliente para adicionar todos os dados.
                      </p>
                    </div>
                  }
                  <p className="text-base font-medium text-gray-500 mb-3 mt-6">
                    Informações atuais do cliente:
                  </p>
                  <div className="text-sm flex gap-3 flex-col mb-8">
                    <p className="flex gap-2">
                      <strong>
                        Nome completo:
                      </strong>
                      {client.name};
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        CPF/ CNPJ:
                      </strong>
                      {maskCPF(client.cpf)}
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        Endereço:
                      </strong>
                      {client.address},
                      {client.complement},
                      {maskCEP(client.cep)},
                      {client.city},
                      {client.state}
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        RG:
                      </strong>
                      {
                        client.rg === ""
                          ? <p className="text-orange-400 text-sm">Nenhum dado cadastrado</p>
                          : client.rg
                      }
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        Telefone:
                      </strong>
                      {
                        client.phone === ""
                          ? <p className="text-orange-400 text-sm">Nenhum dado cadastrado</p>
                          : client.phone
                      }
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        Nacionalidade:
                      </strong>
                      {
                        client.nationality === ""
                          ? <p className="text-orange-400 text-sm">Nenhum dado cadastrado</p>
                          : client.nationality
                      }
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        Profissão:
                      </strong>
                      {
                        client.profession === ""
                          ? <p className="text-orange-400 text-sm">Nenhum dado cadastrado</p>
                          : client.profession
                      }
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        Estado Civil:
                      </strong>
                      {
                        client.maritalState.name === "" || client.maritalState.name === "Selecionar estado civil"
                          ? <p className="text-orange-400 text-sm">Nenhum dado cadastrado</p>
                          : client.maritalState.name
                      }
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        Valor do empréstimo:
                      </strong>
                      {
                        client.valueScheduleContract === ""
                          ? <p className="text-orange-400 text-sm">Nenhum dado cadastrado</p>
                          : client.valueScheduleContract
                      }
                    </p>
                    <p className="flex gap-2">
                      <strong>
                        Data final do empréstimo:
                      </strong>
                      {client.dateFinalScheduleContract === "dd/mm/aaaa" || client.dateFinalScheduleContract === ""
                        ? <p className="text-orange-400 text-sm">Nenhum dado cadastrado</p>
                        : dateFormat(client.dateFinalScheduleContract)
                      }
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {client
                    ? <PDFDownloadLink
                      className="w-full"
                      fileName={`Contrato.pdf`}
                      document={
                        <PDF
                          dataModal={client}
                        />
                      }
                    >
                      {({ url }) => (
                        <div className="w-full max-w-[300px] sm:max-w-full">
                          <a
                            href={String(url)}
                            target="_blank"
                            data-aos="zoom-out"
                            className='bg-red-600 flex gap-3 items-center justify-center py-3 sm:text-sm px-8 rounded-lg w-full transition-all text-white hover:bg-red-700'
                            type='button'
                          >
                            <BsFilePdf />
                            Criar documento
                          </a>
                        </div>
                      )}
                    </PDFDownloadLink>
                    : null
                  }
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