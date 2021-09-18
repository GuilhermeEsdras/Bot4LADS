import { Comando } from '~/Interfaces';

export const comando: Comando = {
  nome: 'ping',
  descricao: 'Comando basico de teste do BOT',
  siglas: ['p', 'testing'],
  permissoes: ['ADMINISTRATOR'],
  run: async (client, msg) => {
    msg.channel.send(`${client.ws.ping} ping!`);
  },
};
