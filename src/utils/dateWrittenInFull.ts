export function dateWrittenInFull(value: any) {
  const converteNumeroParaExtenso = (day: any) => {
    const days = [
      'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE',
      'DEZ', 'ONZE', 'DOZE', 'TREZE', 'QUATORZE', 'QUINZE', 'DEZESSEIS', 'DEZESSETE', 'DEZOITO', 'DEZENOVE',
      'VINTE', 'VINTE E UM', 'VINTE E DOIS', 'VINTE E TRÊS', 'VINTE E QUATRO', 'VINTE E CINCO', 'VINTE E SEIS',
      'VINTE E SETE', 'VINTE E OITO', 'VINTE E NOVE', 'TRINTA', 'TRINTA E UM'
    ];

    return days[day - 1];
  };

  const converteMesParaExtenso = (month: any) => {
    const months = [
      '', 'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
      'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
    ];

    return months[month];
  };

  const converteAnoParaExtenso = (year: any) => {
    if (year < 1000 || year > 9999) {
      return '';
    }

    const milhar = Math.floor(year / 1000);
    const centena = Math.floor((year % 1000) / 100);
    const dezena = Math.floor((year % 100) / 10);
    const unidade = year % 10;

    let result = '';
    if (milhar > 0) {
      result += `${converteNumeroParaExtenso(milhar)} MIL`;
    }
    if (centena > 0) {
      result += `${result.length > 0 ? ' E ' : ''}${converteNumeroParaExtenso(centena)} CENTO`;
    }
    if (dezena > 0 || unidade > 0) {
      result += `${result.length > 0 ? ' E ' : ''}${converteNumeroParaExtenso(dezena * 10 + unidade)}`;
    }

    return result;
  };

  const date = new Date(value);
  const day = converteNumeroParaExtenso(date.getDate());
  const month = converteMesParaExtenso(date.getMonth() + 1);
  const year = converteAnoParaExtenso(date.getFullYear());

  const result = day + " DE " + month + " DE " + year;
  return result;
}