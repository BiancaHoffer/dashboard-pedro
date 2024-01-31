export function dateFormat2(value: any) {
  if (!value) {
    return "dd/mm/aaaa"
  }

  const formattedDate = new Date(value).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return formattedDate;
}