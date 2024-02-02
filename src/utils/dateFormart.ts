export function dateFormat(value: any) {
  if (value === "dd/mm/aaaa") {
    return "dd/mm/aaaa"
  }

  const formattedDate = new Date(value).toLocaleDateString('pt-BR');
  return formattedDate;
}