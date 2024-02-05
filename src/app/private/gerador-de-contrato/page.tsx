"use client"

import { useEffect, useState } from 'react';

import { PDFDownloadLink, } from '@react-pdf/renderer';

import axios from 'axios';

import { toast } from 'react-toastify';

import { PDF } from './components/PDF';
import { Calender } from '../../../components/Calender';
import { Loading } from '@/components/Loading';
import { Button } from '@/components/Button';
import { Input } from './components/Input';
import { InputMoney } from '../../../components/InputMoney';
import { Select } from '../../../components/Select';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { db } from '@/services/firebase';

import { BsFilePdf } from 'react-icons/bs';
import { maskCurrency, maskPhone } from '@/Masks/masks';

const maritalStateList = [
  { name: 'Selecionar estado civil' },
  { name: 'Solteiro(a)' },
  { name: 'Casado(a)' },
  { name: 'Viúvo(a)' },
  { name: 'Divorciado(a)' },
]

const createNoteForm = z.object({
  rg: z.string(),
  phone: z.string(),
  name: z.string(),
  cpf: z.string(),
  valueScheduleContract: z.string(),
  nationality: z.string(),
  profession: z.string(),
})

export type CreateNoteForm = z.infer<typeof createNoteForm>

export default function GeradorContrato() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<CreateNoteForm>({
    resolver: zodResolver(createNoteForm),
    defaultValues: {
      rg: "",
      phone: "",
      name: "",
      cpf: "",
      valueScheduleContract: "",
      nationality: "",
      profession: "",
    }
  });

  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [complement, setComplement] = useState("");

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const [date, setDate] = useState();

  const [isClient, setIsClient] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [loadingCPF, setLoadingCPF] = useState(false);
  const [loadingSaveData, setLoadingSaveData] = useState(false);

  const [data, setData] = useState() as any;

  const [selected, setSelected] = useState(maritalStateList[0]);

  async function onSubmit(dataEvent: CreateNoteForm) {
    const UIDClientGenerate = Math.floor(Date.now() * Math.random()).toString(32);

    const dataForm = {
      uid: UIDClientGenerate,
      name,
      cpf,
      rg: dataEvent?.rg,
      cep,
      address,
      city,
      state,
      complement,
      phone: dataEvent?.phone,
      nationality: dataEvent?.nationality,
      profession: dataEvent?.profession,
      maritalState: selected,
      valueScheduleContract: dataEvent?.valueScheduleContract,
      dateFinalScheduleContract: date,
      contactEmengency: "",
      dueDateNote: "",
      valueParcelNote: "",
      localPaymentNote: "",
    }

    setData(dataForm);

    try {
      setLoadingSaveData(true);

      const collectionRef = collection(db, "listClients");

      const q = query(collectionRef, where('cpf', '==', cpf));

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        toast.warning("Já existe um cliente cadastrado com este CPF/CNPJ.");
        return;
      }

      await setDoc(doc(db, "listClients", UIDClientGenerate), dataForm);

      toast.success("Dados salvos com sucesso!");

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

  function handleResetForm() {
    reset();
    setName("");
    setCpf("");
    setCep("");
    setAddress("");
    setState("");
    setSelected(maritalStateList[0])
    setComplement("");
    //@ts-ignore
    window.location.reload();
  }

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
          toast.warn("CNPJ inválido");
          return;
        }

        toast.success("CNPJ válido");
      }

      if (cpf.length === 11) {
        const response = await axios.get("https://cpf-validator.p.rapidapi.com/validate/cpf", {
          params: { n: cpf },
          headers: {
            'X-RapidAPI-Key': 'e2358519c9msh4bfdacc81c71aa9p1d3d46jsn66515b8d4b52',
            'X-RapidAPI-Host': 'cpf-validator.p.rapidapi.com'
          }
        })

        toast.success("CPF válido");
      }
    } catch (error) {
      //@ts-ignore
      if (error.message === "Request failed with status code 429") {
        toast.warn("Requisições excedidas");
        return;
      }

      //@ts-ignore
      if (error.message === "Request failed with status code 406") {
        toast.warn("CPF inválido");
        return;
      }

    } finally {
      setLoadingCPF(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const watchValueParcel = watch("valueScheduleContract");
  const watchPhone = watch("phone");

  useEffect(() => {
    setValue("valueScheduleContract", maskCurrency(watchValueParcel))
  }, [watchValueParcel])

  useEffect(() => {
    setValue("phone", maskPhone(watchPhone))
  }, [watchPhone])

  return (
    <main className='bg-zinc-100 w-full flex justify-center items-center flex-col gap-5 p-[20px] sm:p-[8px]'>
      <h1 className='flex items-center gap-3 text-2xl self-center text-center pb-[4px] font-medium text-zinc-600'>
        Criar Contrato
      </h1>
      <div data-aos="zoom-in" className='w-full bg-white rounded-lg shadow-lg p-8 sm:p-6  flex flex-col justify-between items-center'>
        <form className='w-full max-w-[1040px]' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col w-full mt-8'>
            <p className='text-base text-zinc-400 mb-4 font-bold '>
              Dados do devedor
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
                      title={
                        loadingCPF
                          ? <Loading />
                          : "Consultar CPF/CNPJ"
                      }
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
                  {...register("rg")}
                  placeholder="RG "
                />
              </fieldset>
              <fieldset className='w-full'>
                <label className='text-zinc-400 text-[12px]'>
                  Telefone:
                </label>
                <Input
                  {...register("phone")}
                  placeholder="Telefone "
                />
              </fieldset>
              <fieldset className='w-full'>
                <label className='text-zinc-400 text-[12px]'>
                  Nacionalidade:
                </label>
                <Input
                  {...register("nationality")}
                  placeholder="Nacionalidade"
                />
              </fieldset>
            </div>

            <div className='flex gap-4 sm:flex-col'>
              <fieldset className='w-full'>
                <label className='text-zinc-400 text-[12px]'>
                  Estado civil:
                </label>
                <Select
                  list={maritalStateList}
                  selected={selected}
                  setSelected={setSelected}
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
            </div>
          </div>
          <div className='flex flex-col w-full mt-8'>
            <p className='text-base text-zinc-400 mb-4 font-bold '>
              Endereço do devedor
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
          <div className='flex flex-col w-full mt-8'>
            <p className='text-base text-zinc-400 mb-4 font-bold '>
              Informações do empréstimo
            </p>

            <div className='flex gap-4 w-full sm:flex-col'>
              <fieldset className='w-full self-end sm:text-sm text-zinc-500'>
                <label className='text-zinc-400 text-[12px]'>
                  Valor do empréstimo:
                </label>
                <InputMoney
                  placeholder="0,00"
                  required
                  icon
                  {...register("valueScheduleContract")}
                />
              </fieldset>
              <fieldset className='w-full sm:w-full sm:text-sm text-zinc-500'>
                <label className='text-zinc-400 text-[12px]'>
                  Data final do empréstimo:
                </label>
                <Calender
                  value={date}
                  required
                  //@ts-ignore
                  onChange={e => setDate(e.target.value)} />
              </fieldset>
            </div>
          </div>
          <div className="flex gap-4  mt-11 sm:flex-col sm:gap-4">
            <div className="w-full max-w-[300px] sm:max-w-full">
              <Button
                title={loadingSaveData ? <Loading /> : "Salvar dados"}
                type='submit'
              />
            </div>
            <div className="w-full max-w-[300px] sm:max-w-full">
              <Button
                onClick={handleResetForm}
                title={"Limpar formulário"}
                type="button"
              />
            </div>
          </div>
        </form>
        {
          isClient && data && !loadingSaveData ?
            <div className="flex w-full max-w-[1040px] gap-6 sm:flex-col sm:gap-3">
              <PDFDownloadLink
                className="w-full"
                fileName={`Nota promissória.pdf`}
                document={
                  <PDF
                    dataForm={data}
                    isModal={false}
                  />}
              >
                {({ url }) => (
                  <div className="w-full  flex mt-4">
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
                  </div>
                )}
              </PDFDownloadLink>
            </div>
            : null
        }
      </div>
    </main>
  )
}
