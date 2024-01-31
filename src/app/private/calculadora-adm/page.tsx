"use client"

import { FormEvent, useEffect, useState } from "react";
import { addDays, format } from 'date-fns';
import { CalculateLoan } from "./components/CalculateLoanForm";
import { PriceForm } from "./components/PriceForm";
import { useForm } from "@/hooks/useForm";
import { Button } from "../../../components/Button";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface UseFormProps {
  steps: JSX.Element[];
}

const paymentMethods = [
  { name: 'Selecionar forma de pagamento' },
  { name: 'Diário 26x (Segunda a Sábado)' },
  { name: 'Diário 24x (Segunda a Sábado)' },
  { name: 'Diário 20x (Segunda a Sexta)' },
  { name: 'Semanal 4x' },
  { name: 'Quinzenal 2x' },
  { name: 'Mensal 1x' },
]

const interestPercentage = [
  { name: 'Selecionar porcentagem' },
  { name: '20%' },
  { name: '30%' },
]

export default function CalculadoraAdm() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("5000");

  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [selectedPercentage, setSelectedPercentage] = useState(interestPercentage[0]);

  const [resultFull, setResultFull] = useState<string[]>([]);
  const [resultSimple, setResultSimple] = useState("");
  const [forRenew, setForRenew] = useState(0);

  const [copyCheck, setCopyCheck] = useState(false);
  const [copyCheck2, setCopyCheck2] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [quantityInstallment, setQuantityInstallment] = useState(0);
  const [interestValue, setInterestValue] = useState(0);

  const [schedule, setSchedule] = useState<any[]>([]);

  function currencyBRL(value: number) {
    return value.toLocaleString('pt-BR', {
      style: "currency",
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }

  //logica cronograma
  //função para 26 parcelas
  function generateSchedule26() {
    let scheduleList = [];
    let date = new Date(selectedDate);
    let currentWeek = -1;

    for (let i = 0; i < quantityInstallment; i++) {
      date = addDays(date, 1);


      while (date.getDay() === 0) {
        // Se for sábado (6) ou domingo (0), adicione um dia até encontrar um dia útil
        date = addDays(date, 1);
      };

      const week = getWeekNumber(date); // Função para obter o número da semana

      if (week !== currentWeek) {
        // Se for uma nova semana, adicione a linha de separação
        scheduleList.push('________________');
        currentWeek = week; // Atualize o número da semana
      }

      scheduleList.push({
        initialDate: format(date, 'dd/MM'),
        interestValue: currencyBRL(interestValue)
      })
    }

    setSchedule(scheduleList);
  };

  //função para 24 parcelas
  function generateSchedule24() {
    let scheduleList = [];
    let date = new Date(selectedDate);
    let currentWeek = -1;

    for (let i = 0; i < quantityInstallment; i++) {
      date = addDays(date, 1);


      while (date.getDay() === 0) {
        // Se for sábado (6) ou domingo (0), adicione um dia até encontrar um dia útil
        date = addDays(date, 1);
      };

      const week = getWeekNumber(date); // Função para obter o número da semana

      if (week !== currentWeek) {
        // Se for uma nova semana, adicione a linha de separação
        scheduleList.push('________________');
        currentWeek = week; // Atualize o número da semana
      }

      scheduleList.push({
        initialDate: format(date, 'dd/MM'),
        interestValue: currencyBRL(interestValue)
      })
    }

    setSchedule(scheduleList);
  };

  //função para 20 parcelas
  function generateSchedule20() {
    let scheduleList = [];
    let date = new Date(selectedDate);
    let currentWeek = -1;

    for (let i = 0; i < quantityInstallment; i++) {
      date = addDays(date, 1);

      while (date.getDay() === 6 || date.getDay() === 0) {
        // Se for sábado (6) ou domingo (0), adicione um dia até encontrar um dia útil
        date = addDays(date, 1);
      };

      const week = getWeekNumber(date); // Função para obter o número da semana

      if (week !== currentWeek) {
        // Se for uma nova semana, adicione a linha de separação
        scheduleList.push('________________');
        currentWeek = week; // Atualize o número da semana
      }

      scheduleList.push({
        initialDate: format(date, 'dd/MM'),
        interestValue: currencyBRL(interestValue)
      })
    }

    setSchedule(scheduleList);
  };

  //função semanal 4 parcelas
  function generateSchedule4() {
    let scheduleList = [];
    let date = new Date(selectedDate);

    for (let i = 0; i < quantityInstallment; i++) {
      if (i !== 7) {
        date = addDays(date, 7);
      };

      while (date.getDay() === 6 || date.getDay() === 0) {
        // Se for sábado (6) ou domingo (0), adicione um dia até encontrar um dia útil
        date = addDays(date, 1);
      };

      scheduleList.push({
        initialDate: format(date, 'dd/MM'),
        interestValue: currencyBRL(interestValue)
      })
    }

    setSchedule(scheduleList);
  };

  function generateSchedule2() {
    let scheduleList = [];
    let date = new Date(selectedDate);

    for (let i = 0; i < quantityInstallment; i++) {
      if (i !== 15) {
        date = addDays(date, 15);
      };

      scheduleList.push({
        initialDate: format(date, 'dd/MM'),
        interestValue: currencyBRL(interestValue)
      })
    }

    setSchedule(scheduleList);
  };

  function generateSchedule1() {
    let scheduleList = [];

    let date = new Date(selectedDate);

    for (let i = 0; i < quantityInstallment; i++) {
      date.setMonth(date.getMonth() + 1);

      scheduleList.push({
        initialDate: format(date, 'dd/MM'),
        interestValue: `${currencyBRL(interestValue)}`
      })
    }

    setSchedule(scheduleList);
  };

  function getWeekNumber(date: any) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    //@ts-ignore
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  // logica cronograma
  function handleCalculateLoan() {
    let total = parseFloat(value);

    switch (selectedPayment.name) {
      case 'Diário 26x (Segunda a Sábado)':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 26;
        setQuantityInstallment(26);
        setInterestValue(total);
        generateSchedule26();
        setResultSimple(`Diário 26x de ${currencyBRL(total)} (Pagamento de segunda a sábado)`);
        break;
      case 'Diário 24x (Segunda a Sábado)':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 24;
        setQuantityInstallment(24);
        setInterestValue(total);
        generateSchedule24();
        setResultSimple(`Diário 24x de ${currencyBRL(total)} (Pagamento de segunda a sábado)`);
        break;
      case 'Diário 20x (Segunda a Sexta)':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 20;
        setQuantityInstallment(20);
        setInterestValue(total);
        generateSchedule20();
        setResultSimple(`Diário 20x de ${currencyBRL(total)} (Pagamento de segunda a sexta)`);
        break;
      case 'Semanal 4x':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 4;
        setQuantityInstallment(4);
        setInterestValue(total);
        generateSchedule4();
        setResultSimple(`Semanal 4x de ${currencyBRL(total)}`);
        break;
      case 'Quinzenal 2x':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 2;
        setQuantityInstallment(2);
        setInterestValue(total);
        generateSchedule2();
        setResultSimple(`Quinzenal 2x de ${currencyBRL(total)}`);
        break;
      case 'Mensal 1x':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 1;

        //@ts-ignore
        setForRenew(total - value)
        setQuantityInstallment(1);
        setInterestValue(total);
        generateSchedule1();
        setResultSimple(`Mensal 1x de ${currencyBRL(total)}`);
        break;
      default:
        setResultFull([]);
        setResultSimple("");
        break;
    }
  };

  function gerenateListPayments() {
    setIsOpen(true);
    handleCalculateLoan();
  }

  // input date
  function handleDateChange(event: any) {
    setSelectedDate(event.target.value);
  };

  // form step
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    changeStep(currentStep + 1, event);
  }

  const formComponents = [
    <PriceForm
      value={value}
      setValue={setValue}
    />,
    <CalculateLoan
      selectedPayment={selectedPayment}
      setSelectedPayment={setSelectedPayment}
      selectedPercentage={selectedPercentage}
      setSelectedPercentage={setSelectedPercentage}

      listPaymentMthods={paymentMethods}
      listPercentage={interestPercentage}
      handleDateChange={handleDateChange}
      resultFull={resultFull}
      resultSimple={resultSimple}
      isOpen={isOpen}
      setIsOpen={setIsOpen}

      selectedDate={selectedDate}
      interestValue={interestValue}
      quantityInstallment={quantityInstallment}

      schedule={schedule}
      selectedPaymentName={selectedPayment.name}
      valueForReview={forRenew}
    />,
  ];

  const formProps: UseFormProps = {
    steps: formComponents
  };

  const {
    currentComponent,
    currentStep,
    changeStep,
    isFirstStep,
    isSecondStep,
    isLastStep
  } = useForm(formProps);
  // form step

  useEffect(() => {
    setResultFull([]);
    setCopyCheck(false);
    setCopyCheck2(false);
    handleCalculateLoan()
  }, [
    value,
    selectedPayment,
    selectedPercentage,
    selectedDate
  ]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className='bg-zinc-100 w-full min-h-full flex justify-center items-center flex-col gap-5 p-[20px] sm:p-[8px]'>
      <h1 className='flex items-center gap-3 text-2xl self-center text-center pb-[4px] font-medium text-zinc-600'>
        Calculadora de Empréstimos
      </h1>

      <div className='w-full h-[79vh] bg-white rounded-lg shadow-lg p-8 sm:p-6  flex flex-col justify-between'>
        <div className="w-full">
          {isFirstStep && (
            <p
              data-aos="zoom-in"
              className='text-zinc-950 text-lg  font-semibold self-start md:text-center sm:text-center md:self-center sm:self-center'
            >
              Informe o valor do empréstimo
            </p>
          )}
          {isSecondStep && (
            <p
              data-aos="zoom-in"
              className='text-zinc-950 text-lg sm:text-center font-semibold self-start md:self-center sm:self-center'
            >
              Valor do empréstimo: {currencyBRL(Number(value))} <br />
            </p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className='h-full flex flex-col items-center justify-between '
        >
          <div />
          <div className='w-full flex items-center justify-center flex-col'>
            {currentComponent}
          </div>
          <div className="w-full max-w-[400px]">
            {isSecondStep || isLastStep && (
              <Button
                type="button"
                title="Voltar"
                variant="gray"
                onClick={() => changeStep(currentStep - 1)}
              />
            )}
            {isFirstStep && (
              <div className="w-full">
                <Button type="submit" title="Continuar" />
              </div>
            )}
            {isSecondStep && (
              <div className='flex flex-col gap-3'>
                <div className="flex flex-col gap-1 items-center">
                  {
                    <Button
                      title="Criar cronograma"
                      type="button"
                      disabled={selectedPayment.name == "Selecionar forma de pagamento"
                        || selectedPercentage.name == "Selecionar porcentagem"
                        || selectedDate == ""
                        ? true : false}
                      onClick={gerenateListPayments}
                    />}
                </div>
                <Button
                  type="button"
                  title="Voltar"
                  variant="gray"
                  onClick={() => changeStep(currentStep - 1)}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}