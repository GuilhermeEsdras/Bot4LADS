import { config } from 'dotenv';

import ConfigJson from '../../../Data/config.json';
import { APISettings } from '../../../Interfaces';

config();

export const settings: APISettings = {
  baseURL: ConfigJson.gitlab.API_URL,
  timeout: ConfigJson.gitlab.default_timeout,
  headers_authorization: `Bearer ${process.env['LAB']}`,
};
