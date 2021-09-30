import { Comando } from '~/Interfaces';

export const comando: Comando = {
  nome: 'add',
  descricao: 'Soma dois numeros passados como argumento',
  argsEsperados: '<num1> <num2>',
  argsMin: 2,
  argsMax: 2,
  run: (client, msg, args) => {
    const num1 = +args[0];
    const num2 = +args[1];

    msg.reply(`A soma destes dois números é **${num1 + num2}**`);
  },
};
