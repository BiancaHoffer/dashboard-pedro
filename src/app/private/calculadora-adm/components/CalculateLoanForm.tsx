import { Dispatch, SetStateAction } from "react";
import { Modal } from "./Modal";
import { Select } from "./Select";
import { Calender } from "../../../../components/Calender";

interface SelectedData {
  name: string;
}

interface CalculateLoanProps {
  selectedPayment: SelectedData;
  setSelectedPayment: any;
  selectedPercentage: SelectedData;
  setSelectedPercentage: any;
  listPaymentMthods: any;
  listPercentage: any;
  handleDateChange?: any
  resultFull: string[];
  resultSimple: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  selectedDate: string;
  interestValue: number;
  quantityInstallment: number;

  schedule: any;

  selectedPaymentName: string;
  valueForReview: number;
}

export function CalculateLoan({
  selectedPayment,
  setSelectedPayment,
  selectedPercentage,
  setSelectedPercentage,
  handleDateChange,
  listPaymentMthods,
  listPercentage,

  resultFull,
  resultSimple,

  isOpen,
  setIsOpen,

  selectedDate,
  interestValue,
  quantityInstallment,

  schedule,

  selectedPaymentName,
  valueForReview
}: CalculateLoanProps) {
  return (
    <>
      <div
        data-aos="zoom-in"
        className="  w-full max-w-[400px] my-4 "
      >
        <fieldset className="disabled:opacity-20 flex flex-col gap-1 w-full mb-6">
          <label className="text-zinc-400 text-[12px]">
            Selecione a data de início para o pagamento do empréstimo:
          </label>
          <Calender
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="dd/mm/aaaa"
          />
        </fieldset >
        <fieldset className="flex flex-col gap-1 w-full mb-6">
          <label className="text-zinc-400 text-[12px]">
            Selecione a porcentagem de juros:
          </label>
          <Select
            selected={selectedPercentage}
            setSelected={setSelectedPercentage}
            list={listPercentage}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 w-full mb-2">
          <label className="text-zinc-400 text-[12px]">
            Selecione uma forma de pagamento:
          </label>
          <Select
            selected={selectedPayment}
            setSelected={setSelectedPayment}
            list={listPaymentMthods}
          />
        </fieldset>
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}

        resultFull={resultFull}
        resultSimple={resultSimple}

        interestValue={interestValue}
        quantityInstallment={quantityInstallment}
        selectedDate={selectedDate}

        schedule={schedule}

        selectedPaymentName={selectedPaymentName}
        valueForReview={valueForReview}
      />
    </>
  )
}