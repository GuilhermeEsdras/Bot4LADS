import { MessageEmbed } from 'discord.js';

import { userActivitiesServices } from '../../../Services/GitLab/User/activities';

export default async function lastComment(email: string) {
  return await userActivitiesServices(email)
    .getLastComments(1)
    .then((comment) => {
      console.log(comment);
      const embededResponse: MessageEmbed = new MessageEmbed().setDescription(
        'asldlasd'
      );
      return embededResponse;
    });
}
