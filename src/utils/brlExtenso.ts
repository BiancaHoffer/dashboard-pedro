import extenso from 'extenso';

export function brlExtenso(value: string) {
  let valueBrl = value;

  if (!value) {
    valueBrl = "0,00";
  } else {
    valueBrl = value;
  }

  const number = extenso(valueBrl, { mode: 'currency', currency: { type: 'BRL' } })
  return number;
}