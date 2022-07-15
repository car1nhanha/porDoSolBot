import { Telegraf } from 'telegraf';
import { formatadores, getMes, sendMessage } from './formatadores';
require('dotenv').config();

export const bot = new Telegraf(process.env.TOKEN_TELEGRAM);

// regex para pegar texto de 3 letras
const regex = /^[a-zA-Z]{3}$/m;

bot.command('/start', (ctx) => {
  ctx.reply(
    `
🌇🌇🌇🌇

Escolha o mês
`,
    {
      // botoes de opções
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Jan', callback_data: 'Jan' },
            { text: 'Fev', callback_data: 'Fev' },
            { text: 'Mar', callback_data: 'Mar' },
          ],
          [
            { text: 'Abr', callback_data: 'Abr' },
            { text: 'Mai', callback_data: 'Mai' },
            { text: 'Jun', callback_data: 'Jun' },
          ],
          [
            { text: 'Jul', callback_data: 'Jul' },
            { text: 'Ago', callback_data: 'Ago' },
            { text: 'Set', callback_data: 'Set' },
          ],
          [
            { text: 'Out', callback_data: 'Out' },
            { text: 'Nov', callback_data: 'Nov' },
            { text: 'Dez', callback_data: 'Dez' },
          ],
        ],
      },
    },
  );
});

bot.action(regex, (ctx) => {
  ctx.reply(`Escolha o dia de ${formatadores.mes(ctx.callbackQuery.data)}`, {
    reply_markup: {
      inline_keyboard: [...getMes(ctx.callbackQuery.data)],
    },
  });
});

// regex para o padrão Jan-01
const regexDia = /^[a-zA-Z]{3}-\d{2}$/m;

bot.action(regexDia, (ctx) => {
  const [mes, dia] = ctx.callbackQuery.data.split('-');

  const response = sendMessage(mes, dia);

  ctx.reply(`
${response.title}\n
${response.dia}\n
${response.versiiculo}\n
  ${response.messages}\n
  `);
});
