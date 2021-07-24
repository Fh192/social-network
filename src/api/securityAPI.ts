import instance from './instance';

const securityAPI = {
  captcha: async () => {
    const response = await instance.get<{ url: string }>(
      'security/get-captcha-url'
    );

    return response.data.url;
  },
};

export default securityAPI;
