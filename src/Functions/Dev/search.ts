import { AxiosInstance } from 'axios';

import criaInstancia from '../API/criaInstancia';

export default async function searchDev(nomeOuLogin: string) {
  const instancia: AxiosInstance = criaInstancia();
  const data = await instancia
    .get(`/search?scope=users&search=${nomeOuLogin}`)
    .then((resp) => {
      console.log(resp);
      return resp.data;
    });
  return data;
}
