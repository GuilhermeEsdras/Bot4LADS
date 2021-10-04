import { MessageEmbed } from 'discord.js';

import { userActivitiesServices } from '../../../Services/GitLab/User/activities';

export default async function lastCommit(email: string) {
  return await userActivitiesServices(email)
    .getLastCommits(2)
    .then((commit) => {
      console.log(commit);
      const embededResponse: MessageEmbed = new MessageEmbed().setDescription(
        'Commit: ' + `${commit[0].push_data.commit_title}`
      );
      return embededResponse;
    });
}
