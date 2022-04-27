import ExtendedClient from '~/Client';
import { Comando } from '~/Interfaces';

import { criaLogger, Logger } from '../../../Logs';
import { gitLabService } from '../../../Services/GitLab/gitlab-services';

export const comando: Comando = {
  nome: 'activities',
  siglas: ['activities'],
  argsMin: 1,
  run: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger(
      `Comando "${comando.nome}" (por ${msg.member.user.tag})`
    );
    const nick = args[0];
    const user = await gitLabService().searchUser(nick);
    const userId = user.id;
    const quantActivities = await gitLabService()
      .getQuantOfUserContributionEvents(userId)
      .then((resp) => {
        return resp;
      })
      .catch((err) => logger.error(err));
    console.log(quantActivities);

    msg.reply(quantActivities || 'nada');

    logger.success('Comando finalizado com sucesso.');
  },
};
