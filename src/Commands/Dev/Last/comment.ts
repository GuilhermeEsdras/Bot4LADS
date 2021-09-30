import { MessageEmbed } from 'discord.js';

export default function comment(email: string) {
  console.log('Testando Comment ' + email);
  const embedTest: MessageEmbed = new MessageEmbed();
  embedTest.setAuthor(email);
  embedTest.setDescription('Comment');
  return embedTest;
}
