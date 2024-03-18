"use client"

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputPass } from "@/components/InputPass";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, user, loading } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  function handleSignIn(event: FormEvent) {
    event.preventDefault();
    signIn(email, password);

  }

  function AccessDashboard() {
    router.push("/private/dashboard")
  }

  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <main className="flex items-center flex-col justify-between bg-zinc-100 w-full h-screen p-[20px]">
      <div />
      <form data-aos="zoom-in" onSubmit={handleSignIn} className="w-full max-w-[520px] flex flex-col gap-4 bg-white shadow-md rounded-md px-[80px] sm:px-[32px] py-[40px] sm:py-[32px]">
        {user ?
          <h1 data-aos="zoom-in" className="text-center text-zinc-900 text-xl font-medium">
            Acessar dashboard
          </h1>
          :
          <h1 className="text-center text-zinc-900 text-xl font-medium">
            Bem-vindo(a)!
          </h1>
        }
        <p data-aos="zoom-in" className="mb-8 text-zinc-400 text-center w-full">
          {user !== null ? "Login efetuado com sucesso. Acesse sua dashboard" : "Efetue o login para acessar a dashboard"}
        </p>
        {user == null &&
          <>
            <Input
              placeholder="E-mail"
              type="email"
              icon={true}
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <InputPass
              placeholder="Senha"
              icon={true}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              title={loading ? <Loading /> : "Acessar"}
              type="submit"
              variant="blue"
            />
          </>
        }
        {user !== null &&
          <Button
            title="Acessar dashboard"
            type="submit"
            variant="blue"
            onClick={AccessDashboard}
            data-aos="zoom-in"
          />
        }
        {user == null &&
          <button
            onClick={() => router.push("/recuperar-senha")}
            type="button"
            className="flex  items-center  justify-center gap-1 text-zinc-600 mt-2 p-1  hover:text-zinc-500 transition-all text-sm"
          >
            Esqueceu a senha?
            <strong className="font-medium flex items-center">
              Recuperar <IoArrowForwardOutline />
            </strong>
          </button>
        }
      </form>
      <a className="p-2 text-sm text-[#00000037] sm:text-xs text-center" href="https://biancahoffer.vercel.app/" target="_blank">
        Desenvolvido por | Bianca Hoffer
      </a>
    </main>
  )
}
