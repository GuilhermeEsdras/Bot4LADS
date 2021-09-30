import { APISettings } from '../../Interfaces';

export const settings: APISettings = {
  baseURL: 'https://git.synchro.com.br/api/v4',
  timeout: 1000,
  headers_authorization: `Bearer ${process.env['LAB']}`,
};
