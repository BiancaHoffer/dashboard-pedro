import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState
} from "react";

import { Dialog, Transition } from "@headlessui/react";

import { Button } from "../../../../components/Button";
import { Loading } from "../../../../components/Loading";
import { Input } from "../../gerador-de-contrato/components/Input";
import { Calender } from "@/components/Calender";
import { InputMoney } from "@/components/InputMoney";
import { Select } from "@/components/Select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import axios from "axios";

import { toast } from "react-toastify";

import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { ClientData } from "@/@types/clients";
import { maskCurrency, maskPhone } from "@/Masks/masks";

interface ModalDeleteProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  client: ClientData;
}

const maritalStateList = [
  { name: 'Selecionar estado civil' },
  { name: 'Solteiro(a)' },
  { name: 'Casado(a)' },
  { name: 'Viúvo(a)' },
  { name: 'Divorciado(a)' },
]

const createEditForm = z.object({
  rg: z.string(),
  phone: z.string(),
  valueSchedule: z.string(),
  nationality: z.string(),
  profession: z.string(),
  valueParcel: z.string(),
  localPayment: z.string(),
  contactEmengency: z.string(),
})

export type CreateEditForm = z.infer<typeof createEditForm>

export function ModalEdit({ isOpen, setIsOpen, client }: ModalDeleteProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<CreateEditForm>({
    resolver: zodResolver(createEditForm),
    defaultValues: {
      rg: client?.rg || "",
      phone: client?.phone || "",
      valueSchedule: client?.valueScheduleContract || "",
      nationality: client?.nationality || "",
      profession: client?.profession || "",
      valueParcel: client?.valueParcelNote || "",
      localPayment: client?.localPaymentNote || "",
      contactEmengency: client?.contactEmengency || ""
    }
  });

  const [address, setAddress] = useState(client?.address || "");
  const [cep, setCep] = useState(client?.cep || "");
  const [city, setCity] = useState(client?.city || "");
  const [state, setState] = useState(client?.state || "");
  const [complement, setComplement] = useState(client?.complement || "");

  const [name, setName] = useState(client?.name || "");
  const [cpf, setCpf] = useState(client?.cpf || "");

  const [dateContract, setDateContract] = useState(client?.dateFinalScheduleContract || "dd/mm/aaaa");
  const [dateNote, setDateNote] = useState(client?.dueDateNote || "dd/mm/aaaa");

  const [loadingCEP, setLoadingCEP] = useState(false);
  const [loadingCPF, setLoadingCPF] = useState(false);
  const [loadingSaveData, setLoadingSaveData] = useState(false);

  const [data, setData] = useState<CreateEditForm>();

  const [indexMaritalState, setIndexMaritalState] = useState(0);

  const [selected, setSelected] = useState(maritalStateList[indexMaritalState]);

  async function onSubmit(dataEvent: CreateEditForm) {
    const dataForm = {
      name,
      cpf,
      rg: dataEvent?.rg,
      cep,
      address,
      city,
      state,
      complement,
      phone: dataEvent?.phone,
      nacionality: dataEvent?.nationality,
      profession: dataEvent.profession,
      maritalState: selected,
      valueScheduleContract: dataEvent?.valueSchedule,
      dateFinalScheduleContract: dateContract,
      contactEmengency: dataEvent?.contactEmengency,
      dueDateNote: dateNote,
      valueParcelNote: dataEvent?.valueParcel,
      localPaymentNote: dataEvent?.localPayment,
    }

    try {
      setData(data);

      setLoadingSaveData(true);

      const collectionRef = doc(db, "listClients", client?.uid);

      await updateDoc(collectionRef, dataForm);

      toast.success("Dados atualizados com sucesso!");

      setIsOpen(false);

      setTimeout(() => { window.location.reload(); }, 1200);

    } catch (error) {
      toast.error("Houve um erro ao salvar os dados. Entre em contato com o administrador do site.");

    } finally {
      setLoadingSaveData(false);
    }
  };

  async function consultingCEP() {
    try {
      setLoadingCEP(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      setAddress(`${data.logradouro}, ${data.bairro}`);
      setCity(data.localidade);
      setState(data.uf);

      if (data.erro) {
        toast.warn("CEP inválido");
      }

    } catch (error) {
      toast.warn("Preencha o campo CEP para consultar");
    } finally {
      setLoadingCEP(false);
    }
  };


  async function consultingCPFandCNPJ() {
    if (cpf.length === 0) {
      toast.warn("Preencha o campo CPF/CNPJ para consultar");
      return;
    }

    try {
      setLoadingCPF(true);

      if (cpf.length === 14) {
        const response = await axios.get(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cpf}`)
        const data = response.data;

        if (data.error) {
          toast.warn("CNPJ inválido ou não existe.");
          return;
        }

        toast.success("CNPJ válido");
      }

      if (cpf.length === 11) {
        const response = await axios.get(`https://consulta-de-cpf-cadastro-de-pessoas-fisicas.p.rapidapi.com/api/v1/cpf/${cpf}`, {
          headers: {
            'X-RapidAPI-Key': 'e2358519c9msh4bfdacc81c71aa9p1d3d46jsn66515b8d4b52',
            'X-RapidAPI-Host': 'consulta-de-cpf-cadastro-de-pessoas-fisicas.p.rapidapi.com'
          }
        });

        const data = response.data;

        if (!data.success) {
          toast.warn("CPF inválido ou não encontrado");
          return;
        } else {
          toast.success("CPF válido");
        }

        setName(data.data.nome);
      }
    } catch (error) {
      toast.warn("CPF inválido ou não encontrado");
    } finally {
      setLoadingCPF(false);
    }
  };


  function cancelEdit() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (client?.maritalState.name === "") {
      setSelected(maritalStateList[0]);
    } else if (client?.maritalState.name === "Solteiro(a)") {
      setIndexMaritalState(1);
    } else if (client?.maritalState.name === "Casado(a)") {
      setIndexMaritalState(2);
    } else if (client?.maritalState.name === "Viúvo(a)") {
      setIndexMaritalState(3);
    } else {
      setIndexMaritalState(4);
    }
  }, [client?.maritalState.name]);

  useEffect(() => {
    setSelected(maritalStateList[indexMaritalState]);
  }, [indexMaritalState]);

  const watchValueParcel = watch("valueParcel");
  const watchValueSchedule = watch("valueSchedule");
  const watchPhone = watch("phone");

  useEffect(() => {
    setValue("valueSchedule", maskCurrency(watchValueSchedule))
  }, [watchValueSchedule])

  useEffect(() => {
    setValue("valueParcel", maskCurrency(watchValueParcel))
  }, [watchValueParcel])

  useEffect(() => {
    setValue("phone", maskPhone(watchPhone))
  }, [watchPhone])

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
              <Dialog.Panel className="w-full max-w-[1040px] transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Atualizar dados do cliente
                </Dialog.Title>
                <div>
                  <p className="text-base text-gray-500 mb-8">
                    Você está editando os dados do cliente: <strong>{client.name}</strong>.<br />
                  </p>
                </div>
                <form className='w-full max-w-[1040px]' onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col w-full mt-4 mb-4'>
                    <p className='text-base text-zinc-400 mb-4 font-bold '>
                      Dados principais
                    </p>
                    <div className='flex gap-4 w-full mb-4 sm:flex-col'>
                      <fieldset className='w-full sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Nome do completo:
                        </label>
                        <Input
                          placeholder="Nome completo"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                      </fieldset>
                      <fieldset className='w-full sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          CPF/CNPJ:
                        </label>
                        <div className="flex flex-row gap-4 sm:gap-2 sm:flex-col">
                          <Input
                            placeholder="CPF/CNPJ"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            required
                          />
                          <div className="w-[380px] sm:w-full">
                            <Button
                              onClick={consultingCPFandCNPJ}
                              type="button"
                              title={loadingCPF ? <Loading /> : "Consultar CPF/CNPJ"}
                            />
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className='flex gap-4 sm:flex-col'>
                      <fieldset className='w-full'>
                        <label className='text-zinc-400 text-[12px]'>
                          RG:
                        </label>
                        <Input
                          required
                          {...register("rg")}
                          placeholder="RG"
                        />
                      </fieldset>
                      <fieldset className='w-full'>
                        <label className='text-zinc-400 text-[12px]'>
                          Telefone:
                        </label>
                        <Input
                          required
                          {...register("phone")}
                          placeholder="Telefone"
                        />
                      </fieldset>
                    </div>
                    <p className='text-base text-zinc-400 mb-4 mt-8 font-bold '>
                      Endereço
                    </p>
                    <div className='flex gap-4 w-[50%] sm:w-full mb-4'>
                      <fieldset className='w-full sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          CEP do devedor:
                        </label>
                        <div className="flex flex-row gap-4 sm:gap-2 sm:flex-col">
                          <Input
                            placeholder="CEP do devedor"
                            value={cep}
                            required
                            onChange={e => setCep(e.target.value)}
                          />
                          <div className="w-[380px] sm:w-full">
                            <Button
                              onClick={consultingCEP}
                              type="button"
                              title={loadingCEP ? <Loading /> : "Consultar CEP"}
                            />
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className='flex gap-4 w-full sm:flex-col'>
                      <fieldset className='w-[40%] sm:w-[50%] sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Estado:
                        </label>
                        <Input
                          placeholder="Estado"
                          value={state}
                          required
                          onChange={e => setState(e.target.value)}
                        />
                      </fieldset>
                      <fieldset className='w-full sm:text-sm text-zinc-00 text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Cidade:
                        </label>
                        <Input
                          value={city}
                          required
                          onChange={e => setCity(e.target.value)}
                          placeholder="Cidade"
                        />
                      </fieldset>
                      <fieldset className='w-full sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Endereço:
                        </label>
                        <Input
                          value={address}
                          required
                          onChange={e => setAddress(e.target.value)}
                          placeholder="Endereço"
                        />
                      </fieldset>
                      <fieldset className='w-full'>
                        <label className='text-zinc-400 text-[12px]'>
                          Complemento / Número:
                        </label>
                        <Input
                          value={complement}
                          required
                          onChange={e => setComplement(e.target.value)}
                          placeholder="Complemento / Número"
                        />
                      </fieldset>
                    </div>
                  </div>
                  <div className='flex flex-col w-full mt-6'>
                    <p className='text-base text-zinc-400 mb-4 font-bold '>
                      Dados de contrato
                    </p>
                    <div className='flex gap-4 sm:flex-col mb-4'>
                      <fieldset className='w-full'>
                        <label className='text-zinc-400 text-[12px]'>
                          Nacionalidade:
                        </label>
                        <Input
                          {...register("nationality")}
                          placeholder="Nacionalidade"
                        />
                      </fieldset>
                      <fieldset className='w-full'>
                        <label className='text-zinc-400 text-[12px]'>
                          Profissão:
                        </label>
                        <Input
                          {...register("profession")}
                          placeholder="Profissão"
                        />
                      </fieldset>
                      <fieldset className='w-full mt-[-4px]'>
                        <label className='text-zinc-400 text-[12px]'>
                          Estado civil:
                        </label>
                        <Select
                          list={maritalStateList}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </fieldset>
                    </div>
                    <div className='flex gap-4 w-full sm:flex-col'>
                      <fieldset className='w-full self-end sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Valor do empréstimo:
                        </label>
                        <InputMoney
                          placeholder="0,00"
                          icon
                          {...register("valueSchedule")}
                        />
                      </fieldset>
                      <fieldset className='w-full sm:w-full sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Data final do empréstimo:
                        </label>
                        <Calender
                          value={dateContract}
                          //@ts-ignore
                          onChange={e => setDateContract(e.target.value)} />
                      </fieldset>
                    </div>
                  </div>
                  <div className='flex flex-col w-full mt-8'>
                    <p className='text-base text-zinc-400 mb-4 font-bold '>
                      Dados de nota promissória
                    </p>
                    <div className='flex gap-4 mb-4 sm:flex-col'>
                      <fieldset className='w-full'>
                        <label className='text-zinc-400 text-[12px]'>
                          Data de vencimento:
                        </label>
                        <Calender
                          value={dateNote}
                          //@ts-ignore
                          onChange={e => setDateNote(e.target.value)} />
                      </fieldset>
                      <fieldset className='w-full self-end sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Valor da parcela:
                        </label>
                        <InputMoney
                          placeholder="0,00"
                          icon
                          {...register("valueParcel")}
                        />
                      </fieldset>
                    </div>
                    <div className='flex gap-4 w-full sm:flex-col'>
                      <fieldset className='w-full sm:w-full sm:text-sm text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Local de pagamento (Cidade/Estado):
                        </label>
                        <Input
                          placeholder="Local de pagamento (Cidade/Estado)"
                          {...register("localPayment")}
                        />
                      </fieldset>
                      <fieldset className='w-full sm:text-sm text-zinc-00 text-zinc-500'>
                        <label className='text-zinc-400 text-[12px]'>
                          Contato de emergência:
                        </label>
                        <Input
                          {...register("contactEmengency")}
                          placeholder="Contato de emergência"
                        />
                      </fieldset>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center mt-8 sm:flex-col sm:gap-4">
                    <div className="w-full max-w-[300px] sm:max-w-full">
                      <Button
                        title={loadingSaveData ? <Loading /> : "Atualizar dados"}
                        type="submit"
                      />
                    </div>
                    <div className="w-full max-w-[300px] sm:max-w-full">
                      <Button
                        title="Cancelar"
                        type="button"
                        variant="gray400"
                        onClick={cancelEdit}
                      />
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}