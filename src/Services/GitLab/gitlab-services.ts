import request from './gitlab-request';

const getUserAvatar = async (email: string) => {
  request.get(`/avatar?email=${email}`).then((resp) => {
    console.log(resp.data);
    return resp.data;
  });
};

export { getUserAvatar };
