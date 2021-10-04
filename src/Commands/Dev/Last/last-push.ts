import { MessageEmbed } from 'discord.js';

import { userActivitiesServices } from '../../../Services/GitLab/User/activities';

export default async function lastPush(email: string) {
  return await userActivitiesServices(email)
    .getLastPushs(2)
    .then((push) => {
      console.log(push);
      const embededResponse: MessageEmbed = new MessageEmbed().setDescription(
        'Commit: ' + `${push[0].push_data.commit_title}`
      );
      return embededResponse;
    });
}
