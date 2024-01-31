"use client"

import { useEffect, useState } from "react";

import { ListClients } from "./components/ListClients";
import { Loading } from "@/components/Loading";
import { ButtonPagination } from "./components/ButtonPagination";

import { db } from "@/services/firebase"
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  startAfter,
  endBefore,
} from "firebase/firestore"

import {
  IoChevronBackOutline,
  IoChevronForwardOutline
} from "react-icons/io5";
import { ClientData } from "@/@types/clients";

export default function Clients() {
  const [data, setData] = useState<ClientData[]>([]);
  const [page, setPage] = useState(1);

  const [loadingData, setLoadingData] = useState(true);

  async function getClients() {
    try {
      const first = query(collection(db, "listClients"), orderBy("name", "asc"), limit(12));

      const firstDocumentSnapshots = await getDocs(first);

      const data = firstDocumentSnapshots.docs;
      setData(data.map(doc => doc.data() as ClientData));
    } finally {
      setLoadingData(false)
    }
  }

  async function showNext({ item }: any) {
    try {
      setLoadingData(true);

      const next = query(collection(db, "listClients"), orderBy("name", "asc"), limit(12), startAfter(item.name));

      const nextDocumentSnapshots = await getDocs(next);

      const data = nextDocumentSnapshots.docs;
      setData(data.map(doc => doc.data() as ClientData));
      setPage(page + 1)

      if (data.length === 0) {
        getClients()
      }
    } finally {
      setLoadingData(false)
    }
  };

  async function showPrevious({ item }: any) {
    try {
      setLoadingData(true);

      const next = query(collection(db, "listClients"), orderBy("name", "asc"), limit(12), endBefore(item.name));

      const nextDocumentSnapshots = await getDocs(next);

      const data = nextDocumentSnapshots.docs;
      setData(data.map(doc => doc.data() as ClientData));
      setPage(page - 1)

      if (data.length === 0) {
        getClients()
      }
    } finally {
      setLoadingData(false)
    }
  };

  useEffect(() => {
    getClients();
  }, [])

  return (
    <main className='bg-zinc-100 w-full min-h-full flex  flex-col gap-5 p-[20px] sm:p-[8px]'>
      <h1 className='flex items-center gap-3 text-2xl self-center text-center pb-[4px] font-medium text-zinc-600'>
        Lista de clientes
      </h1>
      <div
        data-aos="zoom-in"
        className='w-full bg-white rounded-lg shadow-lg p-8 sm:p-4 flex flex-col justify-between items-center'
      >
        {
          loadingData
            ? <Loading
              color="black"
              sizee="base"
            />
            : <ListClients
              loadingFilter={loadingData}
              list={data}
            />
        }
      </div>
      <div className="flex gap-4 justify-end">
        {
          page === 1 ? '' :
            <ButtonPagination
              icon={<IoChevronBackOutline />}
              title="Voltar"
              reverse={false}
              onClick={() => showPrevious({ item: data[0] })}
            />
        }
        {
          data.length < 12 ? '' :
            <ButtonPagination
              icon={<IoChevronForwardOutline />}
              title="Próximo"
              onClick={() => showNext({ item: data[data.length - 1] })}
            />
        }
      </div>
    </main>
  )
}