import { Message } from 'discord.js';

import ExtendedClient from '~/Client';

import { Comando } from '.';

interface RunDev {
  (
    client: ExtendedClient,
    msg: Message,
    devData: Record<string, unknown>,
    args: string[]
  );
}

export interface ComandoDev extends Comando {
  runDev: RunDev;
}
