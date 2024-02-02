export function dateFormat2(value: any) {
  const formattedDate = new Date(value).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return formattedDate;
}