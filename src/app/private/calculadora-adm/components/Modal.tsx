import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';
import { Button } from '@/components/Button';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  resultFull: string[];
  resultSimple: string;

  selectedDate: string;
  interestValue: number;
  quantityInstallment: number;

  schedule: any;

  selectedPaymentName: string;
  valueForReview: number;
}

export function Modal({
  isOpen,
  setIsOpen,

  resultSimple,
  schedule,

  selectedPaymentName,
  valueForReview
}: ModalProps) {
  const [copyCheck, setCopyCheck] = useState(false);
  const [copyCheck2, setCopyCheck2] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function currencyBRL(value: number) {
    return value.toLocaleString('pt-BR', {
      style: "currency",
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  function copyContent(option: number) {
    if (option === 1) {
      const content = document.getElementById('contentToCopy');

      if (content) {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = content.innerText;

        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);

        toast.success("Cronograma completo copiado com sucesso!");

        setCopyCheck(true);
        setCopyCheck2(false);
      };
    };

    if (option === 2) {
      const content = document.getElementById('contentToCopy2');

      if (content) {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = content.innerText;

        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);

        toast.success("Cronograma resumido copiado com sucesso!");

        setCopyCheck(false);
        setCopyCheck2(true);
      };
    };
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl flex flex-col items-start bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between w-full items-center mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold  text-gray-900"
                    >
                      Cronograma de Pagamentos
                    </Dialog.Title>
                    <button onClick={closeModal} className="cursor-pointer text-xl p-2 text-zinc-500">
                      <AiOutlineClose />
                    </button>
                  </div>
                  <div className="mt-2 w-full">
                    <div className="shadow-inner rounded-lg p-6 text-sm text-gray-500 flex items-start gap-2 justify-between w-full">
                      <div id="contentToCopy" className="flex flex-col justify-center items-center">
                        {selectedPaymentName !== "Mensal 1x" && (
                          <div>
                            {resultSimple}
                            {schedule?.map((item: any, index: any) => {
                              if (typeof item === 'string') {
                                return (
                                  <div className="flex items-center justify-center pb-2" key={`separator-${index}`}>
                                    <span>{item}</span>
                                  </div>
                                );
                              } else {
                                return (
                                  <div className="flex items-center justify-center" key={`scheduleItem-${index}`}>
                                    📆{item.initialDate} 💰{item.interestValue}
                                  </div>
                                );
                              }
                            })}
                          </div>
                        )}
                        {selectedPaymentName === "Mensal 1x" && (
                          <div>
                            <strong>Para quitar: </strong>
                            {schedule?.map((item: any, index: any) => {

                              return (
                                <div className="flex items-center justify-center" key={`scheduleItem-${index}`}>
                                  📆{item.initialDate} 💰{item.interestValue}
                                </div>
                              );

                            })}
                            <br />
                            <strong>Para renovar:</strong>
                            {schedule?.map((item: any, index: any) => {
                              return (
                                <div className="flex items-center justify-center" key={`scheduleItem-${index}`}>
                                  📆{item.initialDate} 💰{currencyBRL(valueForReview)}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <button id="copyButton" className="text-xl" onClick={() => copyContent(1)}>
                        {copyCheck ? <LuCopyCheck /> : <LuCopy />}
                      </button>
                    </div>
                    <p className='text-zinc-400 text-base text-center py-4'>OU</p>
                    <div className="items-start gap-2 justify-between shadow-inner rounded-lg p-6 text-sm text-gray-500 flex w-full">
                      <div id="contentToCopy2">
                        <p className="text-sm text-gray-500">
                          {resultSimple}
                        </p>
                      </div>
                      <button id="copyButton" className="text-xl" onClick={() => copyContent(2)}>
                        {copyCheck2 ? <LuCopyCheck /> : <LuCopy />}
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      title="Fechar"
                      type="button"
                      onClick={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}