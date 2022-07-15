import data from './dados.json';

export const formatadores = {
  mes: (mes: string) => {
    switch (mes) {
      case 'Jan':
        return 'Janeiro';
      case 'Fev':
        return 'Fevereiro';
      case 'Mar':
        return 'Março';
      case 'Abr':
        return 'Abril';
      case 'Mai':
        return 'Maio';
      case 'Jun':
        return 'Junho';
      case 'Jul':
        return 'Julho';
      case 'Ago':
        return 'Agosto';
      case 'Set':
        return 'Setembro';
      case 'Out':
        return 'Outubro';
      case 'Nov':
        return 'Novembro';
      case 'Dez':
        return 'Dezembro';
      default:
        return 'Mês inválido';
    }
  },

  mesNumero: (mes: string) => {
    switch (mes) {
      case 'Jan':
        return 1;
      case 'Fev':
        return 2;
      case 'Mar':
        return 3;
      case 'Abr':
        return 4;
      case 'Mai':
        return 5;
      case 'Jun':
        return 6;
      case 'Jul':
        return 7;
      case 'Ago':
        return 8;
      case 'Set':
        return 9;
      case 'Out':
        return 10;
      case 'Nov':
        return 11;
      case 'Dez':
        return 12;
      default:
        return 'Mês inválido';
    }
  },

  mesString: (mes: number) => {
    // meses abreviados
    switch (mes) {
      case 1:
        return 'Jan';
      case 2:
        return 'Fev';
      case 3:
        return 'Mar';
      case 4:
        return 'Abr';
      case 5:
        return 'Mai';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Ago';
      case 9:
        return 'Set';
      case 10:
        return 'Out';
      case 11:
        return 'Nov';
      case 12:
        return 'Dez';
    }
  },

  addNumber: (numero: number) => {
    // se o número for menor que 10, adicionar um 0 antes
    if (numero < 10) {
      return `0${numero}`;
    }
  },

  fotmatarMensagem: (mensagem: string[]) => {
    // pega um array de mensagens, concatena e quebra por linha
    return mensagem.join('\n\n');
  },
};

// função para retornar todos os objetos referentes aquele mês
export const getMes = (mes: string) => {
  // retorna os titulos dos objetos do mes
  const abstraction = data.filter((item) => {
    if (item.mes === formatadores.mesNumero(mes)) {
      return item.title;
    }
  });
  const titles = abstraction.map((item, i) => [
    {
      text: item.title,
      callback_data: `${formatadores.mesString(
        item.mes,
      )}-${formatadores.addNumber(i + 1)}`,
    },
  ]);

  return titles;
};

export const sendMessage = (mes: string, position: string) => {
  const mesAdaptado = formatadores.mesNumero(mes);
  const positionAdaptado = Number(position) - 1;

  const abstraction = data.filter((item) => {
    if (item.mes === mesAdaptado) {
      return item;
    }
  });

  const diaDoMes = abstraction[positionAdaptado].data;
  const messages = abstraction[positionAdaptado].body;
  const versiiculo = abstraction[positionAdaptado].versiculo;

  const send = {
    title: abstraction[positionAdaptado].title,
    dia: diaDoMes,
    versiiculo,
    messages: formatadores.fotmatarMensagem(messages),
  };

  return send;
};
