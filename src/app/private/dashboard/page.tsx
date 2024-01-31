import { IoIosCalculator, IoIosCopy, IoIosDocument } from "react-icons/io"
import { PiUsersThreeFill } from "react-icons/pi"
import { ButtonNavigation } from "./components/ButtonNavigation"

const icons = [<IoIosCalculator />, <IoIosCopy />, <IoIosDocument />, <PiUsersThreeFill />]

const items = [
  { icon: icons[0], url: "http://localhost:3000/private/calculadora-adm", title: "Calculadora" },
  { icon: icons[1], url: "http://localhost:3000/private/gerador-de-contrato", title: "Criar Contrato" },
  { icon: icons[2], url: "http://localhost:3000/private/gerador-de-nota-primissoria", title: "Criar Nota Promissória" },
  { icon: icons[3], url: "http://localhost:3000/private/lista-de-clientes", title: "Lista de Clientes" }
]

export default function Dashboard() {
  return (
    <main className="p-[40px] sm-[20px] w-full">
      <h1 className="text-2xl">Bem-vindo(a)</h1>
      <p className="mt-8">Acesso rápido: </p>

      <div className="flex sm:flex-col gap-4 sm:flex-wrap mt-3">


        {items.map(item => {
          return (
            <ButtonNavigation key={item.url} list={item} />
          )
        })}

      </div>
    </main>
  )
}