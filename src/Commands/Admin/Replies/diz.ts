import { Comando } from '~/Interfaces';

export const comando: Comando = {
  nome: 'diz',
  descricao: 'Faz o BOT dizer alguma coisa',
  argsEsperados: '<texto>',
  argsMin: 1,
  tipo: 'admin',
  permissoes: 'ADMINISTRATOR',
  run: (client, msg, args) => {
    const algumaMsg = args.join(' ');
    msg.channel.send(algumaMsg);
  },
};
