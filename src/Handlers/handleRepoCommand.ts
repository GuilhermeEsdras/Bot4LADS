import ExtendedClient from '~/Client';
import { Comando, Handler } from '~/Interfaces';

import { criaLogger, Logger } from '../Logs';
import ValidateAndRun from './Functions/validateAndRun';

export const handler: Handler = {
  nome: 'repo',
  handle: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger('Repo Handler');
    const comandoInformado = args.shift().toLocaleLowerCase();
    const comandoFinal: Comando = client.repoCommands.get(comandoInformado);
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
