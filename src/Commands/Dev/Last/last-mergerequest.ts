import { MessageEmbed } from 'discord.js';

import { userActivitiesServices } from '../../../Services/GitLab/User/activities';

export default async function lastMergeRequest(email: string) {
  return await userActivitiesServices(email)
    .getLastMergeRequests(2)
    .then((mr) => {
      console.log(mr);
      const embededResponse: MessageEmbed = new MessageEmbed().setDescription(
        'MergeRequest title: ' + `${mr[0].target_title}`
      );
      return embededResponse;
    });
}
