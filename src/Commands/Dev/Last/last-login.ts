import { MessageEmbed } from 'discord.js';

export default function lastLogin(email: string) {
  console.log('Testando Login ' + email);
  const embedTest: MessageEmbed = new MessageEmbed();
  embedTest.setAuthor(email);
  embedTest.setDescription('Login');
  return embedTest;
}
