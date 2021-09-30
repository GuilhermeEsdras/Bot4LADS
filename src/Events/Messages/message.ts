import { Message } from 'discord.js';

import ExtendedClient from '~/Client';
import { Evento, Handler } from '~/Interfaces';

export const evento: Evento = {
  nome: 'message',
  descricao: 'Evento chamado toda vez que uma mensagem eh enviada',
  run: (client: ExtendedClient, msg: Message) => {
    const comandoValido = () => {
      return (
        !msg.author.bot &&
        msg.content.toLocaleLowerCase().startsWith(client.config.prefix)
      );
    };

    if (!comandoValido()) return;

    const args = msg.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const handlerName = args.shift().toLocaleLowerCase();
    if (!handlerName) return;

    // const commandHandler: CommandHandler = new CommandHandler(handlerName);
    // commandHandler.handle(client, msg, args);

    const handler: Handler = client.handlers.get(handlerName);
    handler.handle(client, msg, args);
  },
};
