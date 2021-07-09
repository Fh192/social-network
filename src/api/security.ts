import instance from './instance';

const security = {
  captcha: async () => {
    const response = await instance.get<{ url: string }>(
      'security/get-captcha-url'
    );

    return response.data.url;
  },
};

export default security;
