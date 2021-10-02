import ExtendedClient from '~/Client';
import { Comando, Handler } from '~/Interfaces';

import { criaLogger, Logger } from '../Logs';
import handleCommand from './Functions/handleCommand';
import ValidateAndRun from './Functions/validateAndRun';

export const handler: Handler = {
  nome: 'adm',
  handle: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger('Admin Handler');
    const comandoInformado = args.shift().toLocaleLowerCase();
    const comandoFinal: Comando = client.admCommands.get(comandoInformado);
    ValidateAndRun(
      client,
      msg,
      args,
      logger,
      handler,
      comandoInformado,
      comandoFinal
    );
  },
};
