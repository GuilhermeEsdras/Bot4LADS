import { Message } from 'discord.js';

import ExtendedClient from '~/Client';

interface Handle {
  (client: ExtendedClient, msg: Message, args: string[]);
}

export interface Handler {
  nome: string;
  handle: Handle;
}
