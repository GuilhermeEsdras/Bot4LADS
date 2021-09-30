import ExtendedClient from '~/Client';
import { Comando, Handler } from '~/Interfaces';

import handleCommand from '../Functions/Utils/handleCommand';
import { criaLogger, Logger } from '../Logs';

export const handler: Handler = {
  nome: 'adm',
  handle: (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger('Admin Handler');

    const cmd = args.shift().toLocaleLowerCase();

    logger.info(args.toString());
    logger.info(cmd);

    const comando: Comando = client.admCommands.get(cmd);
    if (!handleCommand(client, msg, args, comando)) return;

    logger.success('Handler executado e comando validado com sucesso');

    comando.run(client, msg, args);
  },
};
