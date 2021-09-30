import { config } from 'dotenv';

import request from './request';

config();

const getVideoInfo = (id: string) =>
  request.get(`/videos?part=statistics&id=${id}&key=${process.env['YTPASS']}`);

export { getVideoInfo };
