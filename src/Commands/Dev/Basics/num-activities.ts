import ExtendedClient from '~/Client';
import { Comando } from '~/Interfaces';

import { criaLogger, Logger } from '../../../Logs';
import {
  ActivityTypes,
  userActivitiesServices,
} from '../../../Services/GitLab/User/activities';

export const comando: Comando = {
  nome: 'nactivities',
  siglas: ['nactivities'],
  argsMin: 2,
  run: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger(
      `Comando "${comando.nome}" (por ${msg.member.user.tag})`
    );
    const nick = args[0];
    const activity = args[1];
    const quantActivities = await userActivitiesServices(nick)
      .getNumberOfActivities(activity.toUpperCase() as ActivityTypes)
      .then((resp) => {
        return resp;
      })
      .catch((err) => logger.error(err));
    console.log(quantActivities);

    msg.reply(quantActivities || 'nada');

    logger.success('Comando finalizado com sucesso.');
  },
};
