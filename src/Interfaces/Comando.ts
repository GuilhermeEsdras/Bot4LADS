import { Message, PermissionResolvable } from 'discord.js';

import Client from '~/Client';

interface Run {
  (client: Client, msg: Message, args: string[]);
}

export interface Comando {
  nome: string;
  descricao?: string;
  siglas?: string[];
  tipo?: string;
  argsEsperados?: string;
  argsMin?: number;
  argsMax?: number;
  permissoes?: PermissionResolvable;
  cargosRequeridos?: string[];
  erroDePermissao?: string;
  run: Run;
}
