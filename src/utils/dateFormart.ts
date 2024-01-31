export function dateFormat(value: any) {
  if (!value) {
    return "dd/mm/aaaa"
  }

  const formattedDate = new Date(value).toLocaleDateString('pt-BR');
  return formattedDate;
}