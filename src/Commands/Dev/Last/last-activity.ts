import { MessageEmbed } from 'discord.js';

import { userActivitiesServices } from '../../../Services/GitLab/User/activities';

export default async function lastActivity(
  email: string
): Promise<MessageEmbed> {
  return await userActivitiesServices(email)
    .getLastActivities(1)
    .then((activies) => {
      console.log(activies[0]);
      const embededResponse = new MessageEmbed().setDescription('blabla');
      return embededResponse;
    });
}
