import api from '.';

const securityAPI = {
  captcha: async (): Promise<string> => {
    const {
      data: { url },
    } = await api.get<{ url: string }>('security/get-captcha-url');

    return url;
  },
};

export default securityAPI;
