import ExtendedClient from '~/Client';
import { Comando, Handler } from '~/Interfaces';

import handleCommand from '../Functions/Utils/handleCommand';
import { criaLogger, Logger } from '../Logs';

export const handler: Handler = {
  nome: 'dev',
  handle: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger('Dev Handler');

    const cmd = args.shift().toLocaleLowerCase();

    logger.info(args.toString());
    logger.info(cmd);

    const comando: Comando = client.devCommands.get(cmd);
    if (!handleCommand(client, msg, args, comando)) return;

    logger.success('Handler executado e comando validado com sucesso');

    await comando.run(client, msg, args);

    console.log(`|------------------------------------------------|`);
  },
};
