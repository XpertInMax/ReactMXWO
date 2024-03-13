import http from './http';

async function refreshToken() {
  const value = Number(localStorage.getItem('expired'));
  if (value && new Date(value) < new Date()) {
    const result = await http.get('/refresh');
    localStorage.setItem('token', result.data.token);
    localStorage.setItem(
      'expired',
      String(new Date().setSeconds(result.data.expired))
    );
  }
}

export default {
  async get(url: string) {
    try {
     // await refreshToken();
      const response = await http.get(url);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async post(url: string, payload: object) {
    try {
    //  await refreshToken();
      const response = await http.post(url, payload);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async put(url: string, payload: object) {
    try {
    //  await refreshToken();
      const response = await http.put(url, payload);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async delete(url: string) {
    try {
    //  await refreshToken();
      await http.delete(url);
      return true;
    } catch (err: any) {
      return false;
    }
  },
};