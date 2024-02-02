import extenso from 'extenso';

export function brlExtenso(value: string) {
  const number = extenso(value, { mode: 'currency', currency: { type: 'BRL' } })
  return number;
}