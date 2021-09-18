import { ClientEvents } from 'discord.js';

import Client from '~/Client';

interface Run {
  (client: Client, ...args: any[]);
}

export interface Evento {
  nome: keyof ClientEvents;
  descricao?: string;
  run: Run;
}
