import ExtendedClient from '~/Client';
import { Comando, Handler } from '~/Interfaces';

import { criaLogger, Logger } from '../Logs';
import ValidateAndRun from './Functions/validateAndRun';

export const handler: Handler = {
  nome: 'issue',
  handle: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger('Issue Handler');
    const comandoInformado = args.shift().toLocaleLowerCase();
    const comandoFinal: Comando = client.issueCommands.get(comandoInformado);
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
