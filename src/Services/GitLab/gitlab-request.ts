import axios from 'axios';

import { settings } from '../../Settings/APIs/GitLab/gitlab-api-settings';

const request = axios.create({
  baseURL: settings.baseURL,
  timeout: settings.timeout,
  headers: {
    Authorization: settings.headers_authorization,
  },
});

export default request;
