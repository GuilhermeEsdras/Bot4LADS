import { MessageEmbed } from 'discord.js';

export default function activity(email: string) {
  console.log('Testando Activity ' + email);
  const embedTest: MessageEmbed = new MessageEmbed();
  embedTest.setAuthor(email);
  embedTest.setDescription('Activity');
  return embedTest;
}
