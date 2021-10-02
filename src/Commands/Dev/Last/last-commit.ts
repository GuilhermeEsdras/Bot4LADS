import { MessageEmbed } from 'discord.js';

export default function lastCommit(email: string) {
  console.log('Testando Commit ' + email);
  const embedTest: MessageEmbed = new MessageEmbed();
  embedTest.setAuthor(email);
  embedTest.setDescription('Commit');
  return embedTest;
}
