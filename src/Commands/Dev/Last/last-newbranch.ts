import { MessageEmbed } from 'discord.js';

import { userActivitiesServices } from '../../../Services/GitLab/User/activities';

export default async function lastNewBranch(email: string) {
  return await userActivitiesServices(email)
    .getLastNewBranches(2)
    .then((newBranch) => {
      console.log(newBranch);
      const embededResponse: MessageEmbed = new MessageEmbed().setDescription(
        'New branch: ' + `${newBranch[0].push_data.commit_title}`
      );
      return embededResponse;
    });
}
