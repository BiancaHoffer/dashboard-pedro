"use client"

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function RecorverPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");

  const router = useRouter();

  function handleRecoverPassword(event: FormEvent) {
    event.preventDefault();
    resetPassword(email);
  }

  return (
    <main className="flex flex-col items-center justify-between bg-zinc-100 w-full h-screen p-[20px]">
      <div />
      <form data-aos="zoom-in" onSubmit={handleRecoverPassword} className="w-full max-w-[520px] flex flex-col gap-4 bg-white shadow-md rounded-md px-[80px] sm:px-[32px] py-[40px] sm:py-[32px]">
        <h1 className="text-center text-zinc-900 text-xl font-medium">
          Recuperar senha
        </h1>
        <p className="mb-8 text-zinc-400 text-center w-full">
          Você receberá um e-mail para recuperar sua senha. Verifique a caixa de entrada ou spam.
        </p>
        <Input
          placeholder="E-mail"
          type="email"
          icon={true}
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <Button
          title="Enviar"
          type="submit"
          variant="blue"
        />
        <button
          onClick={() => router.push("/")}
          type="button"
          className="flex  items-center  justify-center gap-1 text-zinc-600 mt-2 p-1  hover:text-zinc-500 transition-all text-sm"
        >
          <strong className="font-medium flex items-center">
            <IoArrowBack />
          </strong>
          Voltar para página de Login
        </button>
      </form>
      <a className="p-2 text-[#00000037] sm:text-sm text-center" href="https://www.linkedin.com/in/bianca-macedo-hoffer/" target="_blank">
        Desenvolvido por | Bianca Macedo Hoffer Madruga
      </a>
    </main>
  )
}